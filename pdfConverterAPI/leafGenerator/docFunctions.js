const boldFont = require("./fonts/Roboto-Black-normal");
const regularFont = require("./fonts/Roboto-Regular-normal");
const {
  titleFontSize,
  textFontSize,
  xStart,
  yStart,
  yRange,
} = require("./constants");
const moment = require("moment");
const { default: slugify } = require("slugify");
require("moment/locale/fr.js");

const getDateAndTime = () => {
  const date = new Date().toLocaleString("tr-TR", {
    timeZone: "Europe/Moscow",
  });
  console.log(date);
  return date.toString();
};

const registerFont = (doc) => {
  doc.addFileToVFS("./fonts/Roboto-Black.ttf", boldFont.font);
  doc.addFileToVFS("./fonts/Roboto-Regular.ttf", regularFont.font);
  doc.addFont("./fonts/Roboto-Black.ttf", "Roboto-Black", "normal");
  doc.addFont("./fonts/Roboto-Regular.ttf", "Roboto-Regular", "normal");
  doc.setFont("Roboto-Regular", "normal");
};

const setFont = (doc, type) => {
  if (type == "regular") {
    doc.setFont("Roboto-Regular", "normal");
  } else {
    doc.setFont("Roboto-Black", "normal");
  }
};

const slug = (text) => {
  return slugify(text, {
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
};

module.exports = {
  setFont,
  registerFont,
  getDateAndTime,
  slug,
};
