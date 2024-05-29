

const data = [
    {
        "value": "LT-1A",
        "label": "LT-1A",
        "disabled": false
    },
    {
        "value": "LT-2B",
        "label": "LT-2B",
        "disabled": true
    },
    {
        "value": "LT-3C",
        "label": "LT-3C",
        "disabled": true
    },
    {
        "value": "LT-4D",
        "label": "LT-4D",
        "disabled": true
    }
]

const getTarif = (req,res) => {
    try {
        res.status(200).json({ success: true, result: data })
    } catch (error) {
        res.status(error.code || 500).json({ msg: error.msg || "Something went wrong" })
    }
}

const calculate = (req, res) => {
    try {
        const unitsUsed = req.body.units
        const calculateKSEBBill = (consumedUnits) => {
            const fixedCharge = 35;

            const telescopicRates = [
                { max: 50, rate: 3.50 },
                { max: 100, rate: 4.20 },
                { max: 150, rate: 5.20 },
                { max: 200, rate: 5.80 },
                { max: 250, rate: 6.50 }
            ];

            const nonTelescopicRates = [
                { max: 300, rate: 5.95 },
                { max: 350, rate: 6.30 },
                { max: 400, rate: 6.45 },
                { max: 500, rate: 6.65 },
                { max: Infinity, rate: 6.90 }
            ];

            let totalBill = fixedCharge;

            if (consumedUnits <= 250) {
                // Telescopic billing
                let remainingUnits = consumedUnits;
                for (let slab of telescopicRates) {
                    const unitsInSlab = Math.min(slab.max, remainingUnits);
                    totalBill += unitsInSlab * slab.rate;
                    remainingUnits -= unitsInSlab;
                    if (remainingUnits <= 0) break;
                }
            } else {
                // Non-telescopic billing
                for (let slab of nonTelescopicRates) {
                    if (consumedUnits <= slab.max) {
                        totalBill += consumedUnits * slab.rate;
                        break;
                    }
                }
            }

            return totalBill;
        }
        const result = calculateKSEBBill(unitsUsed)
        res.status(200).json({ success: true, result })

    } catch (error) {
        res.status(error.code || 500).json({ msg: error.msg || "Something went wrong" })
    }
}




module.exports = {
    calculate, getTarif
}