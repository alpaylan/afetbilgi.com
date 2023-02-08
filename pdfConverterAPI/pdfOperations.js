const { jsPDF } = require("jspdf")

const createPDF = () => {
    const doc = new jsPDF()
    doc.text("Deneme", 10, 10)
    doc.save("b.pdf")
}

module.exports = {
    createPDF
}