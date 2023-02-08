const { default: axios } = require("axios");
const { jsPDF } = require("jspdf")
const myFont = require("./fonts/Roboto-Black-normal")

const DATA_URL = "https://raw.githubusercontent.com/alpaylan/afetbilgi.com/main/data/all.combined.1.json";

const setFont = (doc) => {
    doc.addFileToVFS("./fonts/Roboto-Black.ttf", myFont.font);
    doc.addFont("./fonts/Roboto-Black.ttf", "Roboto-Black", "normal");
    doc.setFont('Roboto-Black', 'normal');
}

const createPDF = async () => {
    const doc = new jsPDF()
    const data = await fetchData();

    setFont(doc)

    doc.text("bçşğüa", 10, 10)
    doc.save("b.pdf")

}


//fetches data
const fetchData = async () => {
    const dataAll = await axios.get(DATA_URL);
    const data = dataAll.data
    return data;
}
createPDF()


module.exports = {
    createPDF
}
