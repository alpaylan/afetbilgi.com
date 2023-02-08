require("dotenv").config()
const express = require("express")
const app = express()
const pdfOp = require("./pdfOperations")

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    pdfOp.createPDF();
    res.json({status: 200})
}) 

app.listen(PORT)