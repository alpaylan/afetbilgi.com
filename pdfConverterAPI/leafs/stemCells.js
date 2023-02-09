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

const STEM_CELLS_DATA_TITLE = "Kök Hücre Bağış Noktaları";

const getStemCells = (data) => {
  const options = data.options;
  for (let i = 0; i < options.length; i++) {
    value = options[i];
    if (value.name) {
      if (value.name == STEM_CELLS_DATA_TITLE) {
        return value.value.data.items;
      }
    }
    if (value.name_tr) {
      if (value.name_tr == STEM_CELLS_DATA_TITLE) {
        return value.value.data.items;
      }
    }
  }
};

const writeStemCellsPDF = (doc, allData) => {
  //const doc = new jsPDF();
  const data = getStemCells(allData);
  console.log(data);
  let x = xStart;
  let y = yStart;
  let isNewPage = true;
  //tempData.options[4].value.data.phones.forEach
  data.forEach((value, index) => {
    console.log(value);
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
      doc.text(`Kök Hücre Bağış Noktaları`, x, yRange * 2);

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

    doc.text("\u2022 " + value.city + " - " + value.area, x, y);
    y += yRange;
    if (value.address) {
      doc.setFontSize(smallTextSize);
      doc.textWithLink("URL: " + value.address, x, y, { url: value.address });
      y += yRange;
    }

    doc.text("Telefon Numarasi: " + value.phone, x, y);
    y += yRange;
  });
};

module.exports = {
  getStemCells,
  writeStemCellsPDF,
};
