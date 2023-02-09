const { coverTitleFontSize, smallTitleFontSize } = require("./constants");
const { setFont, getDateAndTime } = require("./docFunctions");

const createCoverPage = (doc, cityName) => {
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;

  doc.setFontSize(coverTitleFontSize / 1.5);
  setFont(doc, "bold");
  let width = doc.getTextWidth(cityName);
  let height = doc.getLineHeight(cityName);
  let x = (pageWidth - width) / 2;
  let y = (pageHeight - height) / 3;
  doc.text(cityName, x, y - 50);

  doc.setFontSize(coverTitleFontSize / 2);
  setFont(doc, "regular");
  const textImportant = "Deprem İçin Önemli Bilgiler";
  width = doc.getTextWidth(textImportant);
  height = doc.getLineHeight(textImportant);
  x = (pageWidth - width) / 2;
  y = (pageHeight - height) / 2;
  doc.text(textImportant, x, y - 35);

  doc.setFontSize(smallTitleFontSize - 2);
  setFont(doc, "regular");
  const dateAndTime = "Oluşturulma tarihi: " + getDateAndTime();
  width = doc.getTextWidth(dateAndTime);
  height = doc.getLineHeight(dateAndTime);
  x = (pageWidth - width) / 2;
  y = (pageHeight - height) / 2;
  doc.text(dateAndTime, x, y - 23);

  doc.setFontSize(smallTitleFontSize - 2);
  setFont(doc, "regular");
  const description = "(Bilgiler afetbilgi.com websitesinden alınmıştır.)";
  width = doc.getTextWidth(description);
  height = doc.getLineHeight(description);
  x = (pageWidth - width) / 2;
  y = (pageHeight - height) / 2;
  doc.text(description, x, y - 5);

  doc.setFontSize(smallTitleFontSize);
  setFont(doc, "bold");
  const descriptionNext = "Güncel bilgi için link: afetbilgi.com";
  width = doc.getTextWidth(descriptionNext);
  height = doc.getLineHeight(descriptionNext);
  x = (pageWidth - width) / 2;
  y = (pageHeight - height) / 2;
  doc.setTextColor(6, 69, 173);
  doc.textWithLink(descriptionNext, x, y + 40, {
    url: "https://afetbilgi.com",
  });
  doc.setTextColor(0, 0, 0);
};

module.exports = { createCoverPage };
