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
} = require("../constants");

// gets safe gathering place data of given city
const getSafeGatheringPlace = (data, city) => {
  const safeGatheringPlaceData = data.options.filter(
    (op) => op.name_tr == "Güvenli Toplanma Alanları"
  );
  const cityData = safeGatheringPlaceData[0].value.options.filter(
    (op) => slug(op.name_tr) == slug(city)
  );

  if (cityData[0]?.value.data) {
    return cityData[0];
  }
};

const createSafeGatheringPlacePDF = (doc, data, city) => {
  const pageHeight = doc.internal.pageSize.height;

  let x = xStart;
  let y = yStart;

  const cityObj = getSafeGatheringPlace(data, city);

  if (!cityObj) {
    return;
  }

  const cityName = cityObj?.name_tr;

  let isNewPage = true;
  doc.setFontSize(textFontSize);
  cityObj.value.data?.items.forEach((el, index) => {
    if (y >= pageHeight) {
      doc.addPage();
      isNewPage = true;
    }
    if (isNewPage) {
      setFont(doc, "bold");
      doc.setFontSize(titleFontSize);
      doc.text(`${cityName} - Güvenli Toplanma Alanları`, x, yRange * 2);

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

    doc.text(`\u2022 ${el.name}`, x, y);
    y += yRange;
    if (el.url) {
      doc.textWithLink("Google Maps: " + el.url, x, y, { url: el.url });
      y += yRange;
    }
    if (el.source) {
      doc.textWithLink("Kaynak: " + el.source, x, y, { url: el.source });
      y += yRange;
    }
  });
};
//getSafeGatheringPlace("Malatya")

module.exports = {
  createSafeGatheringPlacePDF,
};
