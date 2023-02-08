const { jsPDF } = require("jspdf")
const tempData = require("./data.json");
const { getTime } = require("./docFunctions");



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
    const xStart = 16;
    const xEnd = 160;
    const yStart = 10;
    const xRange = 50;
    const yRange = 12;

    const phoneRangeY = 10;
    let x = xStart;
    let y = yStart;
    let isNewPage = true
    //tempData.options[4].value.data.phones.forEach
    data.forEach
    ( (value, index) => {

      
        y += yRange 

        const pageHeight = doc.internal.pageSize.height

        doc.setFontSize(8)
        console.log(pageHeight)
            if (y >= pageHeight) {
                
                doc.addPage();
                isNewPage = true
            }
            if (isNewPage) {
                doc.setFont('Roboto-Black', 'normal');
                doc.setFontSize(18)
                doc.text(`Önemli Telefon Numaraları`, 16, 24)
    
                doc.setFont('Roboto-Regular', 'normal');
                doc.setFontSize(8)
                doc.text(`Dosyanın oluşturulma tarihi: ${ getTime() }`, 16, 36)
                y = 60
                isNewPage = false
              
            }

            console.log(y)
    
            doc.setFontSize(8)
            doc.text("\u2022 " + value.name + " - " + value.phone_number, x, y);
      



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