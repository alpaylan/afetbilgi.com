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
const getSafeGatheringPlace = (data) => {
  const safeGatheringPlaceData = data.options.filter(
    (op) => op.name_tr == "Güvenli Toplanma Alanları"
  );

  return safeGatheringPlaceData[0];
};

const writeSafeGatheringPlacesPDF = (doc, data, city) => {
  const pageHeight = doc.internal.pageSize.height;

  let x = xStart;
  let y = yStart;
  let isNewPage = true;

  data.value.data.items.forEach((el, index) => {
    if (y + yRange * 3 >= pageHeight) {
      doc.addPage();
      isNewPage = true;
    }
    if (isNewPage) {
      setFont(doc, "bold");
      doc.setFontSize(titleFontSize);
      doc.text(
        `${data.value.data.city} - Güvenli Toplanma Alanları`,
        x,
        yRange * 2
      );

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
    doc.text("\u2022 " + `${el.name}`, x, y);
    y += yRange;
    doc.setFontSize(smallTextSize);
    if (el.url) {
      doc.textWithLink("Adres: " + el.url, x, y, { url: el.url });
      y += yRange;
    }
    if (el.source) {
      doc.text(`Kaynak: ${el.source}`, x, y);
      y += yRange;
    }
  });
};

module.exports = {
  writeSafeGatheringPlacesPDF,
  getSafeGatheringPlace,
};
