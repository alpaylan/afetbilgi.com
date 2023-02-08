const { default: axios } = require("axios");
const { jsPDF } = require("jspdf")
const myFont = require("./fonts/Roboto-Regular-normal")
const SGP = require("./safeGatheringPlaces")
const { getPhoneNumberData, writePhoneNumbersToPdf } = require("./telefonNumaralari");

const DATA_URL = "https://raw.githubusercontent.com/alpaylan/afetbilgi.com/main/data/all.combined.1.json";

const registerFont = (doc) => {
    doc.addFileToVFS("./fonts/Roboto-Black.ttf", myFont.font);
    doc.addFont("./fonts/Roboto-Black.ttf", "Roboto-Black", "normal");
    doc.addFont("./fonts/Roboto-Regular.ttf", "Roboto-Regular", "normal");
    doc.setFont('Roboto-Regular', 'normal');

}


const setFont = (doc, type) => {
    if (type == "regular") {
        doc.setFont('Roboto-Regular', 'normal');
    } else {
        doc.setFont('Roboto-Black', 'normal');
    }
}

const createPDF = async () => {
    const doc = new jsPDF()
    const data = await fetchData();
    createSafeGatheringPlacePDF(data, "Malatya")

    const phoneData = getPhoneNumberData(data);
    writePhoneNumbersToPdf(doc, phoneData)

    doc.save("c.pdf");
}

const createSafeGatheringPlacePDF = (data, city) => {
    const doc = new jsPDF({
        orientation: "p",
        unit: "px",
        format: "a4"
    })
    registerFont(doc)
    const pageHeight = doc.internal.pageSize.height

    const cityObj = SGP.getSafeGatheringPlace(data, city)
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
        doc.text(el, 16, y)  
        y += 12
    });

    doc.save(cityName + ".pdf")
}

//fetches data
const fetchData = async () => {
    const dataAll = await axios.get(DATA_URL);
    const data = dataAll.data
    return data;
}
createPDF()

const getTime = () => {
    const date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes();

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;

    return hours + ":" + minutes;
}

module.exports = {
    createPDF,
    fetchData
}
