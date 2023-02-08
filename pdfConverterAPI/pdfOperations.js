const { default: axios } = require("axios");
const { jsPDF } = require("jspdf")

const DATA_URL = "https://raw.githubusercontent.com/alpaylan/afetbilgi.com/main/data/all.combined.1.json?v=1";

const createPDF = async () => {
    const doc = new jsPDF()
    const data = await fetchData();
    doc.text("Deneme", 10, 10)
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
