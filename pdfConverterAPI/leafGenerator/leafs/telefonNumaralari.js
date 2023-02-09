const { jsPDF } = require("jspdf");
const tempData = require("../data.json");
const { getDateAndTime } = require("../docFunctions");
const {
  titleFontSize,
  textFontSize,
  xStart,
  yStart,
  yRange,
  pageStartText,
} = require("../constants");

const PHONE_DATA_TITLE = "Önemli Telefon Numaraları";

const getPhoneNumberData = (data) => {
  const options = data.options;
  for (let i = 0; i < options.length; i++) {
    value = options[i];
    if (value.name) {
      if (value.name == PHONE_DATA_TITLE) {
        return value.value.data.phones;
      }
    }
    if (value.name_tr) {
      if (value.name_tr == PHONE_DATA_TITLE) {
        return value.value.data.phones;
      }
    }
  }
};

const writePhoneNumbersToPdf = (doc, allData) => {
  //const doc = new jsPDF();
  const data = getPhoneNumberData(allData);

  let x = xStart;
  let y = yStart;
  let isNewPage = true;
  //tempData.options[4].value.data.phones.forEach
  data.forEach((value, index) => {
    y += yRange;

    const pageHeight = doc.internal.pageSize.height;

    doc.setFontSize(textFontSize);
    if (y >= pageHeight) {
      doc.addPage();
      isNewPage = true;
    }

    if (isNewPage) {
      doc.setFont("Roboto-Black", "normal");
      doc.setFontSize(titleFontSize);
      doc.text(`Önemli Telefon Numaraları`, x, yRange * 2);

      doc.setFont("Roboto-Regular", "normal");
      doc.setFontSize(textFontSize);
      doc.text(
        `Dosyanın oluşturulma tarihi: ${getDateAndTime()}` + pageStartText,
        x,
        yRange * 3
      );
      y = yStart;
      isNewPage = false;
    }

    doc.text("\u2022 " + value.name + " - " + value.phone_number, x, y);
    y += yRange;
    //let phone = doc.getTextDimensions(value.phone_number);
    //let finalXP = x - phone.w/2
    //doc.text(value.phone_number, finalXP, y + phoneRangeY);
  });
};

module.exports = {
  getPhoneNumberData,
  writePhoneNumbersToPdf,
};
