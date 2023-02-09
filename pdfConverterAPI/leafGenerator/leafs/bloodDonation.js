const { setFont, getDateAndTime } = require("../docFunctions");
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
const getBloodDonations = (data, cityx) => {
  const helpCenters = data.options.filter(
    (op) => op.name_tr == "Kızılay Kan Bağış Noktaları"
  );

  return helpCenters;
};

const writeBloodDonationsPDF = (doc, data) => {
  const pageHeight = doc.internal.pageSize.height;

  let x = xStart;
  let y = yStart;

  setFont(doc, "bold");
  doc.setFontSize(titleFontSize);
  doc.text(`${data.city} - Kızılay Kan Bağış Noktaları`, x, yRange * 2);

  setFont(doc, "regular");
  doc.setFontSize(textFontSize);
  doc.text(
    `Dosyanın oluşturulma tarihi: ${getDateAndTime()}` + pageStartText,
    x,
    yRange * 3
  );
  y = yStart;

  doc.setFontSize(textFontSize);
  doc.text("\u2022 " + `${data.name}` + " - " + data.phone_number, x, y);
  y += yRange;

  doc.setFontSize(smallTextSize);

  doc.text("Sorumlu: " + data.head, x, y);
  y += yRange;

  doc.text("Adres: " + data.address, x, y);
  y += yRange;

  doc.text("Cep Telefonu: " + data.cell_phone_number, x, y);
  y += yRange;

  doc.text("Fax: " + data.fax, x, y);
  y += yRange;
};

module.exports = {
  getBloodDonations,
  writeBloodDonationsPDF,
};
