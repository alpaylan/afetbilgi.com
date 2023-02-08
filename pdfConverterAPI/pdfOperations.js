const { default: axios } = require("axios");
const { jsPDF } = require("jspdf")
const SGP = require("./safeGatheringPlaces")
const accomodation = require('./extractBarinma')
const { createSafeGatheringPlacePDF } = require("./safeGatheringPlaces")
const boldFont = require("./fonts/Roboto-Black-normal");
const regularFont = require("./fonts/Roboto-Regular-normal")
const { getPhoneNumberData, writePhoneNumbersToPdf } = require("./telefonNumaralari");
const { setFont, registerFont } = require("./docFunctions");

const DATA_URL = "https://cdn.afetbilgi.com/latest.json";
const myFont = require("./fonts/Roboto-Black-normal");
const { createMealPdf } = require("./yemek");

const createPDF = async () => {

    const doc = new jsPDF({
        orientation: "p",
        unit: "px",
        format: "a4"
    })
    registerFont(doc)

    const data = await fetchData()
    //createSafeGatheringPlacePDF(doc, data, "Malatya")

    setFont(doc, "regular")

    //accomodation.createAccomodationPDF(data, doc, 'Malatya');

    createMealPdf(doc, data, "Malatya")

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
