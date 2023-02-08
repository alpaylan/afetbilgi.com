const { default: axios } = require("axios");
const { jsPDF } = require("jspdf")
const myFont = require("./fonts/Roboto-Black-normal");
const { getPhoneNumberData, writePhoneNumbersToPdf } = require("./telefonNumaralari");

const DATA_URL = "https://raw.githubusercontent.com/alpaylan/afetbilgi.com/main/data/all.combined.1.json?v=1";

const createPDF = async () => {
    const doc = new jsPDF()

    const data = await fetchData();
    setFont(doc)
//console.log(data)
doc.text("bçşğüa", 10, 10)
    const phoneData = getPhoneNumberData(data);
    writePhoneNumbersToPdf(doc, phoneData)

    doc.save("b.pdf")
}


//fetches data
const fetchData = async () => {
    const dataAll = await axios.get(DATA_URL);
    const data = dataAll.data
    return data;
}



module.exports = {
    createPDF
}
