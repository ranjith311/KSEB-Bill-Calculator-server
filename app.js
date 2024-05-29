require("dotenv").config()
const express = require('express');
const app = express()
const PORT = process.env.PORT || 4000
const cors = require("cors")

app.use(express.json())
app.use(cors({
    origin:["http://localhost:3000","https://kseb-bill.netlify.app"],
    credentials:true
}))

app.use("/api",require("./routes/calculateRoute"))



app.listen(PORT,()=>console.log(`Server is running at port ${PORT}`))


