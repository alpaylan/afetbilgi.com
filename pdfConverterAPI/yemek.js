const { setFont, getDateAndTime } = require("./docFunctions");
const tempData = require("./data.json");
const { smallTextSize, textFontSize, titleFontSize } = require("./constants");

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
        if(value.name == "Hatay") {
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
    let y = 60
    doc.setFontSize(8)

    cityData.forEach( (value, index) => {



        if (y >= pageHeight) {
            doc.addPage();
            isNewPage = true
        }
        if (isNewPage) {
            setFont(doc, "bold")
            doc.setFontSize(18)
            doc.text(`${city} - Yemek Sağlanan Yerler`, 16, 24)

            setFont(doc, "regular")
            doc.setFontSize(8)
            doc.text(`Dosyanın oluşturulma tarihi: ${getDateAndTime()}`, 16, 36)
            y = 60
            isNewPage = false
        }

        setFont(doc, "bold")
        doc.setFontSize(titleFontSize)
        doc.text(value.name, 16, y)
        y += 18
console.log(value)
        value.value.data.items.forEach((el, index) => {
            if (y >= pageHeight) {
                doc.addPage();
                isNewPage = true
            }
            if (isNewPage) {
                setFont(doc, "bold")
                doc.setFontSize(18)
                doc.text(`${city} - Yemek Sağlanan Yerler`, 16, 24)
    
                setFont(doc, "regular")
                doc.setFontSize(8)
                doc.text(`Dosyanın oluşturulma tarihi: ${getDateAndTime()}`, 16, 36)
                y = 60
                isNewPage = false
            }


            setFont(doc, "regular")
            doc.setFontSize(textFontSize)
            doc.text(`\u2022 ${el.name}`, 16, y)  
            doc.setFontSize(smallTextSize)
            y += 4;
            //doc.text(`Geçerli olduğu tarih: ${convertToDate(el)}`, x + 7, y);
            y += 12
        });

    } ) 


}

const convertToDate = (el) => {
//TO-DO
}

//getSafeGatheringPlace("Malatya")

module.exports = {
    createMealPdf
}