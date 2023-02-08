require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const pdfOp = require("./pdfOperations")

const PORT = process.env.PORT || 3000;

app.use(cors())

app.get("/", (req, res) => {
    pdfOp.createPDF();
    res.json({status: 200})
}) 

app.listen(PORT)