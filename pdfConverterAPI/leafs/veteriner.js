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
const getVeterinerPlaces = (data, cityx) => {
  const veterinerPlaces = data.options.filter(
    (op) => op.name == "Veterinerler" || op.name_tr == "Veterinerler"
  );

  return veterinerPlaces;
};

const writeVeterinerPlacesPDF = (doc, data) => {
  const pageHeight = doc.internal.pageSize.height;

  let x = xStart;
  let y = yStart;
  let isNewPage = true;
  data.vets.forEach((el, index) => {
    if (y >= pageHeight) {
      doc.addPage();
      isNewPage = true;
    }
    if (isNewPage) {
      setFont(doc, "bold");
      doc.setFontSize(titleFontSize);
      doc.text(`${data.city} - Veterinerler`, x, yRange * 2);

      setFont(doc, "regular");
      doc.setFontSize(textFontSize);
      doc.text(
        `Dosyanın oluşturulma tarihi: ${getDateAndTime()}` + pageStartText,
        x,
        yRange * 3
      );
      y = yStart;
      isNewPage = false;

      doc.text("\u2022 " + `${el.name}` + " - " + el.phone_number, x, y);
      y += yRange;
      doc.setFontSize(smallTextSize);
      doc.text("Adres: " + el.address, x, y);
      y += yRange;
      doc.textWithLink("Maps: " + el.maps_link, x, y, {
        url: el.maps_link,
      });
    }
  });
};
//getSafeGatheringPlace("Malatya")

module.exports = {
  getVeterinerPlaces,
  writeVeterinerPlacesPDF,
};
