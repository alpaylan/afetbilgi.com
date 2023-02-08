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

 
    createSafeGatheringPlacePDF(doc, data, "Malatya")


    createAccomodationPDF(data, doc, 'Malatya');

    //accomodation.createAccomodationPDF(data, doc, 'Malatya');

    createMealPdf(doc, data, "Malatya")

    writePhoneNumbersToPdf(doc, data)

    doc.deletePage(1)
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
