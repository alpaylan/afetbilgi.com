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
const getTemporaryAccomodationData = (data) => {
  const helpCenters = data.options.filter(
    (op) => op.name_tr == "Geçici Barınma Alanları"
  );

  return helpCenters;
};

const writeTemporaryAccomodationPDF = (doc, data) => {
  const pageHeight = doc.internal.pageSize.height;

  let x = xStart;
  let y = yStart;
  let isNewPage = true;
  data.value.data.items.forEach((el, index) => {
    if (y >= pageHeight) {
      doc.addPage();
      isNewPage = true;
    }

    if (isNewPage) {
      setFont(doc, "bold");
      doc.setFontSize(titleFontSize);
      doc.text(`${el.city} - Geçici Barınma Alanları`, x, yRange * 2);

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
    doc.textWithLink("Url: " + el.url, x, y, {
      url: el.url,
    });
    y += yRange;
    doc.textWithLink("Adres: " + el.address, x, y, {
      url: el.url,
    });
    y += yRange;
    if (el.validation_date && el.is_validated) {
      doc.text(
        "Dogrulanma Durumu: " +
          (el.is_validated ? "Dogrulandi" : "Dogrulanmadi") +
          " --- " +
          el.validation_date,
        x,
        y
      );
      y += yRange;
    }
  });
};

module.exports = {
  getTemporaryAccomodationData,
  writeTemporaryAccomodationPDF,
};
