
const { getTime } = require("./docFunctions");
const { titleFontSize, textFontSize, xStart, yStart, yRange, smallTextSize} = require("./constants");

const trProvincesForAccommodations = ( data ) => {
    const provinces = {}
    const extractedData = data.options[0].value.options;
    let index = 0;

    extractedData.map(option => {
        if(!(option.name_tr in provinces)) {
            provinces[option.name_tr] = index;
            index += 1;
        }
    })
    return provinces;
}

const enProvincesForAccommodations = ( data ) => {
    const provinces = {}
    const extractedData = data.options[0].value.options;
    let index = 0;

    extractedData.map(option => {
        if(!(option.name_tr in provinces)) {
            provinces[option.name_en] = index;
            index += 1;
        }
    })
    return provinces;
}

const kuProvincesForAccommodations = ( data ) => {
    const provinces = {}
    const extractedData = data.options[0].value.options;
    let index = 0;

    extractedData.map(option => {
        if(!(option.name_tr in provinces)) {
            provinces[option.name_ku] = index;
            index += 1;
        }
    })
    return provinces;
}

const accommodationAcordingToProvince = ( data, provinceIndex) => {
    const accommadations = data.options[0].value.options[provinceIndex].value.data.items;
    accommadations.filter(item => {
        return item.is_validated = true;
    })

    const pureData = []

    for(let i = 0; i < accommadations.length; i += 1) {
        pureData.push({name: accommadations[i].name, phone: accommadations[i].phone_number, date: accommadations[i].validation_date});
    }
    return pureData;
}

const createAccomodationPDF = (data, doc, city) => {
    doc.addPage()

    let x = xStart;
    let y = yStart;
    let isNewPage = true

    const fixedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();


    const provinces = trProvincesForAccommodations(data);
    const places = accommodationAcordingToProvince(data, provinces[fixedCity]);

    places.forEach((place) => {
        y += yRange 

        const pageHeight = doc.internal.pageSize.height

        doc.setFontSize(textFontSize)
        if (y >= pageHeight) {
            doc.addPage();
            isNewPage = true
        }
        if (isNewPage) {
            doc.setFont('Roboto-Black', 'normal');
            doc.setFontSize(titleFontSize)
            doc.text(`${city} - Geçici Konaklama Yerleri`, x, yRange * 2)
            doc.setFont('Roboto-Regular', 'normal');     
            doc.setFontSize(textFontSize)   
            doc.text(`Dosyanın oluşturulma tarihi: ${ getTime() }`, x, yRange * 3)
            isNewPage = false
            y = 60
        }
        doc.setFontSize(textFontSize)

        const name = place.name.split(" ");
        for(let i = 0; i < name.length; i += 1) {
            name[i] = name[i].charAt(0).toUpperCase() + name[i].slice(1);
        }

        doc.text("\u2022 " + `${name.join(' ')}`, x, y);
        if(place.date) {
            y += 8;
            doc.setFontSize(smallTextSize)
            doc.text(`Geçerli olduğu tarih: ${place.date}`, x + 7, y);
        }

    })
}

module.exports = {createAccomodationPDF}
