const {
  setFont,
  getDateAndTime,
  slug,
  registerFont,
} = require("../docFunctions");
const tempData = require("../data.json");
const fs = require("fs");
const { jsPDF } = require("jspdf");
const {
  smallTextSize,
  textFontSize,
  titleFontSize,
  xStart,
  yStart,
  yRange,
  smallTitleFontSize,
  pageStartText,
} = require("../constants");

const MEAL_DATA_TITLE = "Yemek Dağıtım Yerleri";

// gets meal data
const getMealData = (data) => {
  const options = data.options;
  for (let i = 0; i < options.length; i++) {
    value = options[i];
    if (value.name) {
      if (value.name == MEAL_DATA_TITLE) {
        return value;
      }
    }
    if (value.name_tr) {
      if (value.name_tr == MEAL_DATA_TITLE) {
        return value;
      }
    }
  }
};

const getCityData = (data, city) => {
  let output;

  if (data) {
    data.value.options.forEach((value) => {
      if (slug(value.name) == slug(city)) {
        output = value.value.options;
      }
    });
  }

  return output;
};

const writeMealPDF = (option) => {
  option.value.options.forEach((value, index) => {
    let x = xStart;
    let y = yStart;
    let isNewPage = true;

    const path = `../outputs/${encodeURIComponent("Yemek Dağıtım Yerleri")}/${
      value.value.data.city
    }`;
    fs.mkdirSync(path, { recursive: true });

    // create a pdf file
    const doc = new jsPDF({
      orientation: "p",
      unit: "px",
      format: "a4",
    });
    const pageHeight = doc.internal.pageSize.height;

    registerFont(doc);

    if (y >= pageHeight) {
      doc.addPage();
      isNewPage = true;
    }

    if (isNewPage) {
      setFont(doc, "bold");
      doc.setFontSize(titleFontSize);
      doc.text(`${value.name} - Yemek Dağıtım Yerleri`, x, yRange * 2);
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

    value.value.data.items.forEach((el, index) => {
      doc.text("\u2022 " + `${el.name}` + " -- " + el.phone_number, x, y);
      y += yRange;

      if (el.maps_url) {
        doc.textWithLink("Adres: " + el.maps_url, x, y, {
          url: el.maps_url,
        });
        y += yRange;
      }
      if (el.url) {
        doc.textWithLink("Url: " + el.url, x, y, {
          url: el.url,
        });
        y += yRange;
      }
    });

    doc.save(`${path}/${value.name}.pdf`);
  });
};

const convertToDate = (el) => {
  let time = (el.updated_at_time + "").split(".");

  time[0] = parseInt(time[0]);
  time[1] = time[1] ? parseInt(time[1]) : 0;

  if (time[0] < 10) time[0] = "0" + time[0];
  if (time[1] < 10) time[1] = "0" + time[1];

  return el.updated_at_date.split("/").join(".") + " - " + time.join(":");
};

//getSafeGatheringPlace("Malatya")

module.exports = {
  getMealData,
  writeMealPDF,
};
