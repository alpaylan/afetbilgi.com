const { default: axios } = require("axios");
const { jsPDF } = require("jspdf")
const { createSafeGatheringPlacePDF } = require("./safeGatheringPlaces")
const { getPhoneNumberData, writePhoneNumbersToPdf } = require("./telefonNumaralari");
const { createAccomodationPDF } = require("./extractBarinma");
const { setFont, registerFont } = require("./docFunctions");
const { createMealPdf } = require("./yemek");

const DATA_URL = "https://cdn.afetbilgi.com/latest.json";

const createPDF = async () => {

    const doc = new jsPDF({
        orientation: "p",
        unit: "px",
        format: "a4"
    })
    registerFont(doc)

    const data = await fetchData()

 
    let cityName = "Malatya"
    createSafeGatheringPlacePDF(doc, data, cityName)
    createAccomodationPDF(data, doc, cityName);
    createMealPdf(doc, data, cityName)


    writePhoneNumbersToPdf(doc, data)

    doc.save("out.pdf");
}

//fetches data
const fetchData = async () => {
    const dataAll = await axios.get(DATA_URL);
    const data = dataAll.data
    return data;
}

createPDF()

module.exports = {
    createPDF,
}
