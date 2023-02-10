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
  doc.text(`${data[0].city} - Kızılay Kan Bağış Noktaları`, x, yRange * 2);

  setFont(doc, "regular");
  doc.setFontSize(textFontSize);
  doc.text(
    `Dosyanın oluşturulma tarihi: ${getDateAndTime()}` + pageStartText,
    x,
    yRange * 3
  );
  y = yStart;
  let isNewPage = false;
  data.forEach((element) => {
    if (y >= pageHeight) {
      doc.addPage();
      y = yStart;
    }

    if (isNewPage) {
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
      isNewPage = false;
    }

    doc.setFontSize(textFontSize);
    doc.text("\u2022 " + `${element.name ?? '(Kurum adı belli değil)'}`, x, y);
    y += yRange;

    doc.setFontSize(smallTextSize);

    if (element.phone_number) {
      doc.text("Telefon: " + element.phone_number, x, y);
      y += yRange;
    }

    if (element.head) {
      doc.text("Sorumlu: " + element.head, x, y);
      y += yRange;
    }

    if (element.address) {
      doc.text("Adres: " + element.address, x, y);
      y += yRange;
    }

    if (element.cell_phone_number) {
      doc.text("Cep Telefonu: " + element.cell_phone_number, x, y);
      y += yRange;
    }

    if (element.fax) {
      doc.text("Fax: " + element.fax, x, y);
      y += yRange;
    }
  });
};

module.exports = {
  getBloodDonations,
  writeBloodDonationsPDF,
};
