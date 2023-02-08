const boldFont = require("./fonts/Roboto-Black-normal");
const regularFont = require("./fonts/Roboto-Regular-normal")

const getTime = () => {
    const date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes();

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;

    return hours + ":" + minutes;
}

const registerFont = (doc) => {
    doc.addFileToVFS("./fonts/Roboto-Black.ttf", boldFont.font);
    doc.addFileToVFS("./fonts/Roboto-Regular.ttf", regularFont.font);
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

module.exports = {
    setFont,
    registerFont,
    getTime
}
