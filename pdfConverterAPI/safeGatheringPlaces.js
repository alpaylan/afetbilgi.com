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
    const cityName = cityObj.name_tr

    let isNewPage = true

    doc.setFontSize(textFontSize)
    cityObj.value.data.items.forEach((el, index) => {
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