require("dotenv").config()
const { createAllInOnePDF, createForEachCityPDF } = require("./allDataToPDF");
const express = require("express")
const cors = require("cors")
const app = express()


const PORT = process.env.PORT || 3000;

app.use(cors())

app.get("/pdf-uret", (req, res) => {
    try {
        createAllInOnePDF()
        createForEachCityPDF()
        res.status(200).json({message:"Başarılı"})

    } catch(e) {
        res.status(500).json({message:"Hata"})
    }

})




app.listen(PORT);