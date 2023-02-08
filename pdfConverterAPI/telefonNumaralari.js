const { jsPDF } = require("jspdf")
const tempData = require("./data.json")

const PHONE_DATA_TITLE = "Önemli Telefon Numaraları";

const getPhoneNumberData = (data) => {
    const options = data.options;
    for(let i = 0; i < options.length; i++) {
        value = options[i];
        if(value.name) {
            console.log(value.name)
            if(value.name == PHONE_DATA_TITLE) {
                return value.value.data.phones;
            }
        }
        if(value.name_tr) {
            if(value.name_tr == PHONE_DATA_TITLE) {
                return value.value.data.phones;
            }
        }
    }

}

const writePhoneNumbersToPdf = (doc, data) => {
    //const doc = new jsPDF();
    doc.addPage()
    const xStart = 10;
    const xEnd = 160;
    const yStart = 10;
    const xRange = 50;
    const yRange = 10;

    const phoneRangeY = 10;

    //tempData.options[4].value.data.phones.forEach
    data.forEach
    ( (value, index) => {
        let x = xStart;
        let y = yStart;
        y += yRange * index

        doc.setFontSize(16);
        doc.text(value.name + " - " + value.phone_number, x, y);

        //let phone = doc.getTextDimensions(value.phone_number);
        
        //let finalXP = x - phone.w/2


        //doc.text(value.phone_number, finalXP, y + phoneRangeY);

    } );
    
    return doc;
}

module.exports = {
getPhoneNumberData,
writePhoneNumbersToPdf,
}