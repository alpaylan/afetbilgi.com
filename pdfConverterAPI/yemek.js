const { setFont, getDateAndTime } = require("./docFunctions");
const tempData = require("./data.json");
const { smallTextSize, textFontSize, titleFontSize, xStart, yStart, yRange, smallTitleFontSize } = require("./constants");

const MEAL_DATA_TITLE = "Yemek"

// gets meal data
const getMealData = (data) => {
    const options = data.options
    for(let i = 0; i < options.length; i++) {
        value = options[i];
        if(value.name) {
            if(value.name == MEAL_DATA_TITLE) {
                return  value;
            }
        }
        if(value.name_tr) {
            if(value.name_tr == MEAL_DATA_TITLE) {
                return value;
            }
        }
    }
}

const getCityData = (data, city) => {
    let output;
    data.value.options.forEach( value => {
        if(value.name == city) {
            output = value.value.options;
        }
    } )

    return output;
}



const createMealPdf = (doc, allData, city) => {
    const data = getMealData(allData)

    const pageHeight = doc.internal.pageSize.height

    const cityData = getCityData(data, city)
    console.log("test")
    console.log(cityData);

    doc.addPage();
    let isNewPage = true

    let x = xStart
    let y = yStart

    doc.setFontSize(textFontSize)
    cityData.forEach( (value, index) => {
        if (y >= pageHeight) {
            doc.addPage();
            isNewPage = true
        }
        if (isNewPage) {
            setFont(doc, "bold")
            doc.setFontSize(titleFontSize)
            doc.text(`${city} - Yemek Sağlanan Yerler`, x, yRange * 2)

            setFont(doc, "regular")
            doc.setFontSize(textFontSize)
            doc.text(`Dosyanın oluşturulma tarihi: ${getDateAndTime()}`, x, yRange * 3)
            y = yStart
            isNewPage = false
        }

        setFont(doc, "bold")
        doc.setFontSize(smallTitleFontSize)
        doc.text(value.name, x, y)
        y += yRange
        console.log(value)
        value.value.data.items.forEach((el, index) => {
            if (y >= pageHeight) {
                doc.addPage();
                isNewPage = true
            }
            if (isNewPage) {
                setFont(doc, "bold")
                doc.setFontSize(titleFontSize)
                doc.text(`${city} - Yemek Sağlanan Yerler`, x, yRange * 2)
    
                setFont(doc, "regular")
                doc.setFontSize(textFontSize)
                doc.text(`Dosyanın oluşturulma tarihi: ${getDateAndTime()}`, x, yRange * 3)
                y = yStart
                isNewPage = false
            }

            setFont(doc, "regular")
            doc.setFontSize(textFontSize)
            if(el.phone_number) {
                doc.text(`\u2022 ${el.name} -- Telefon No: ${el.phone_number}`, 16, y)  
            } else {
                doc.text(`\u2022 ${el.name}`, 16, y)  
            }
            
            doc.setFontSize(smallTextSize)
            y += yRange;
            doc.text(`Geçerli olduğu tarih: ${convertToDate(el)}`, x + 7, y);
            y += yRange
        });
        y += yRange * 2
    } ) 


}

const convertToDate = (el) => {
    let time = (el.updated_at_time + '').split('.');

    console.log(time[1])

    time[0] = parseInt(time[0])
    time[1] = time[1] ? parseInt(time[1]) : 0

    console.log(time[1])

    if (time[0] < 10) time[0] = '0' + time[0] 
    if (time[1] < 10) time[1] = '0' + time[1] 

    return el.updated_at_date.split('/').join('.') + ' - ' + time.join('.');
}

//getSafeGatheringPlace("Malatya")

module.exports = {
    createMealPdf
}