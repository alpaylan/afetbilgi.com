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
  smallTextSize,
} = require("../constants");

const PHARMACY_DATA_TITLE = "Konteyner Eczaneler";

const getPharmacyData = (data) => {
  const options = data.options;
  for (let i = 0; i < options.length; i++) {
    value = options[i];
    if (value.name) {
      if (value.name == PHARMACY_DATA_TITLE) {
        return value.value.data.items;
      }
    }
    if (value.name_tr) {
      if (value.name_tr == PHARMACY_DATA_TITLE) {
        return value.value.data.items;
      }
    }
  }
};

const writePharmacyData = (doc, allData) => {
  //const doc = new jsPDF();
  const data = getPharmacyData(allData);
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
      doc.text(PHARMACY_DATA_TITLE, x, yRange * 2);

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

    doc.text("\u2022 " + value.city + " - " + value.district, x, y);
    y += yRange;
    if (value.location) {
      doc.text("Lokasyon: " + value.location, x, y);
      y += yRange;
    }
    if (value.locationLink) {
      doc.setFontSize(smallTextSize);
      doc.textWithLink("Maps: " + value.locationLink, x, y, {
        url: value.locationLink,
      });
      y += yRange;
    }
  });
};

module.exports = {
  writePharmacyData,
};
