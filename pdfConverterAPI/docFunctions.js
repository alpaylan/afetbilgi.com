const getTime = () => {
    const date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes();

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;

    return hours + ":" + minutes;
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
    getTime
}
