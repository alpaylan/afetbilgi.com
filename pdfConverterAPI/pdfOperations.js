const { default: axios } = require("axios");
const { jsPDF } = require("jspdf")
const SGP = require("./safeGatheringPlaces")
const accomodation = require('./extractBarinma')
const { getSafeGatheringPlace } = require("./safeGatheringPlaces")
const boldFont = require("./fonts/Roboto-Black-normal");
const regularFont = require("./fonts/Roboto-Regular-normal")
const { getPhoneNumberData, writePhoneNumbersToPdf } = require("./telefonNumaralari");
const { setFont, registerFont, getTime } = require("./docFunctions");

const DATA_URL = "https://raw.githubusercontent.com/alpaylan/afetbilgi.com/main/data/all.combined.3.json";
const myFont = require("./fonts/Roboto-Black-normal");

const registerFont = (doc) => {
    doc.addFileToVFS("./fonts/Roboto-Black.ttf", boldFont.font);
    doc.addFileToVFS("./fonts/Roboto-Regular.ttf", regularFont.font);
    doc.addFont("./fonts/Roboto-Black.ttf", "Roboto-Black", "normal");
    doc.addFont("./fonts/Roboto-Regular.ttf", "Roboto-Regular", "normal");
    doc.setFont('Roboto-Regular', 'normal');
}

const createPDF = async () => {

    const doc = new jsPDF({
        orientation: "p",
        unit: "px",
        format: "a4"
    })
    const data = await fetchData();
    createSafeGatheringPlacePDF(doc, data, "Malatya")

    setFont(doc, "regular")

    accomodation.createAccomodationPDF(data, doc, 'Malatya');

    const phoneData = getPhoneNumberData(data);
    writePhoneNumbersToPdf(doc, phoneData)

    doc.save("out.pdf");

}

const createSafeGatheringPlacePDF = (doc, data, city) => {

    registerFont(doc)
    const pageHeight = doc.internal.pageSize.height

    const cityObj = getSafeGatheringPlace(data, city)
    const cityName = cityObj.name_tr

    setFont(doc, "bold")
    doc.setFontSize(18)
    doc.text(`${cityName} - Güvenli Toplanma Alanları`, 16, 24)

    setFont(doc, "regular")
    doc.setFontSize(8)
    doc.text(`Dosyanın oluşturulma tarihi: ${getTime()}`, 16, 36)

    let isNewPage = true
    let y = 60
    doc.setFontSize(8)
    cityObj.value_tr.data.items.forEach((el, index) => {
        if (y >= pageHeight) {
            doc.addPage();
            isNewPage = true
        }
        if (isNewPage) {
            setFont(doc, "bold")
            doc.setFontSize(18)
            doc.text(`${cityName} - Güvenli Toplanma Alanları`, 16, 24)

            setFont(doc, "regular")
            doc.setFontSize(8)
            doc.text(`Dosyanın oluşturulma tarihi: ${getTime()}`, 16, 36)
            y = 60
            isNewPage = false
        }
        doc.text(`\u2022 ${el}`, 16, y)  
        y += 12
    });
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
