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

const WEBSITE_DATA_TITLE = "Önemli Web Siteleri";

const getWebsitesData = (data) => {
  const options = data.options;
  for (let i = 0; i < options.length; i++) {
    value = options[i];
    if (value.name) {
      if (value.name == WEBSITE_DATA_TITLE) {
        return value.value.data.usefulLinks;
      }
    }
    if (value.name_tr) {
      if (value.name_tr == WEBSITE_DATA_TITLE) {
        return value.value.data.usefulLinks;
      }
    }
  }
};

const writeWebsitesPDF = (doc, allData) => {
  //const doc = new jsPDF();
  const data = getWebsitesData(allData);

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
      doc.text(`Önemli Web Siteleri`, x, yRange * 2);

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

    doc.text("\u2022 " + value.name, x, y);
    y += yRange * 1.5;
    if (value.url) {
      doc.setFontSize(smallTextSize);
      doc.textWithLink("URL: " + value.url, x, y, { url: value.url });
      y += yRange;
    }
  });
};

module.exports = {
  getWebsitesData,
  writeWebsitesPDF,
};
