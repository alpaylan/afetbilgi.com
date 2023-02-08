const { setFont, registerFont, getDateAndTime } = require("./docFunctions");
const { titleFontSize, textFontSize, xStart, yStart, yRange} = require("./constants");

// gets safe gathering place data of given city
const getSafeGatheringPlace = (data, city) => {
    const safeGatheringPlaceData = data.options.filter(op => op.name_tr == "Güvenli Toplanma Alanları")
    const cityData = safeGatheringPlaceData[0].value.options.filter(op => op.name_tr == city)
    return cityData[0];
}

const createSafeGatheringPlacePDF = (doc, data, city) => {
    const pageHeight = doc.internal.pageSize.height
    
    let x = xStart
    let y = yStart

    const cityObj = getSafeGatheringPlace(data, city)

    if(!cityObj) {
        return;
    }
    if(city != 'Adana') {
        doc.addPage();
    }

    const cityName = cityObj?.name_tr

    setFont(doc, "bold")
    doc.setFontSize(18)
    doc.text(`${cityName} - Güvenli Toplanma Alanları`, 16, 24)
    setFont(doc, "regular")
    doc.setFontSize(8)
    doc.text(`Dosyanın oluşturulma tarihi: ${getTime()}`, 16, 36)

    let isNewPage = true
    let y = 60
    doc.setFontSize(8)
    cityObj?.value.data.items.forEach((el, index) => {
        if (y >= pageHeight) {
            doc.addPage();
            isNewPage = true
        }
        if (isNewPage) {
            setFont(doc, "bold")
            doc.setFontSize(titleFontSize)
            doc.text(`${cityName} - Güvenli Toplanma Alanları`, x, yRange * 2)

            setFont(doc, "regular")
            doc.setFontSize(textFontSize)
            doc.text(`Dosyanın oluşturulma tarihi: ${getDateAndTime()}`, x, yRange * 3)
            y = yStart
            isNewPage = false
        }

        doc.text(`\u2022 ${el}`, x, y)  
        y += yRange
    });
}
//getSafeGatheringPlace("Malatya")

module.exports = {
    createSafeGatheringPlacePDF
}