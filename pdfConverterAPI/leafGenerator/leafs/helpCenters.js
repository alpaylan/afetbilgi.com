const {
  setFont,
  registerFont,
  getDateAndTime,
  slug,
} = require("../docFunctions");
const {
  titleFontSize,
  textFontSize,
  xStart,
  yStart,
  yRange,
  pageStartText,
  smallTextSize,
} = require("../constants");

// gets safe gathering place data of given city
const getHelpCenters = (data, cityx) => {
  const helpCenters = data.options.filter(
    (op) => op.name_tr == "Yardım Toplama Merkezleri"
  );

  return helpCenters;
};

const writeHelpCentersPDF = (doc, data) => {
  const pageHeight = doc.internal.pageSize.height;

  let x = xStart;
  let y = yStart;
  let isNewPage = true;
  data.items.forEach((el, index) => {
    if (y >= pageHeight) {
      doc.addPage();
      isNewPage = true;
    }
    
    if (isNewPage) {
      setFont(doc, "bold");
      doc.setFontSize(titleFontSize);
      doc.text(`${data.city} - Yardım Toplama Merkezleri`, x, yRange * 2);

      setFont(doc, "regular");
      doc.setFontSize(textFontSize);
      doc.text(
        `Dosyanın oluşturulma tarihi: ${getDateAndTime()}` + pageStartText,
        x,
        yRange * 3
      );
      y = yStart;
      isNewPage = false;
    }

    doc.setFontSize(textFontSize);
    doc.text("\u2022 " + `${el.name}` + " - " + el.phone_number, x, y);
    y += yRange;
    doc.setFontSize(smallTextSize);
    doc.textWithLink("Url: " + el.url, x, y, {
      url: el.url,
    });
    y += yRange;
    if (el.notes) {
      doc.text("Notlar: " + el.notes, x, y);
      y += yRange;
    }
  });
};

module.exports = {
  getHelpCenters,
  writeHelpCentersPDF,
};
