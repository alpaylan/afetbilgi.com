const { getDateAndTime, slug } = require("../docFunctions");
const {
  titleFontSize,
  textFontSize,
  xStart,
  yStart,
  yRange,
  smallTextSize,
  pageStartText,
} = require("../constants");

const trProvincesForAccommodations = (data) => {
  const provinces = {};
  const extractedData = data.options[0].value.options;
  let index = 0;

  extractedData.map((option) => {
    const name = option.name_tr ? option.name_tr : option.name;
    console.log(option);
    console.log(name);
    if (!(name in provinces)) {
      provinces[name] = index;
      index += 1;
    }
  });

  return provinces;
};

const enProvincesForAccommodations = (data) => {
  const provinces = {};
  const extractedData = data.options[0].value.options;
  let index = 0;

  extractedData.map((option) => {
    if (!(option.name_tr in provinces)) {
      provinces[option.name_en] = index;
      index += 1;
    }
  });
  return provinces;
};

const kuProvincesForAccommodations = (data) => {
  const provinces = {};
  const extractedData = data.options[0].value.options;
  let index = 0;

  extractedData.map((option) => {
    if (!(option.name_tr in provinces)) {
      provinces[option.name_ku] = index;
      index += 1;
    }
  });
  return provinces;
};

const accommodationAcordingToProvince = (data, provinceIndex) => {
  const accommadations =
    data.options[0].value.options[provinceIndex]?.value.data.items;
  accommadations?.filter((item) => {
    return (item.is_validated = true);
  });

  const pureData = [];

  for (let i = 0; i < accommadations?.length; i += 1) {
    pureData.push({
      name: accommadations[i].name,
      phone: accommadations[i].phone_number,
      date: accommadations[i].validation_date,
      address: accommadations[i].address,
    });
  }
  return pureData;
};

const createAccomodationPDF = (data, doc, city) => {
  const xStart = 16;
  const yStart = 10;
  const yRange = 12;

  let x = xStart;
  let y = yStart;
  let isNewPage = true;

  const fixedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

  const provinces = trProvincesForAccommodations(data);

  const places = accommodationAcordingToProvince(data, provinces[fixedCity]);

  if (places.length == 0) {
    return;
  }
  console.log(city);
  console.log(places.length);
  // doc.addPage();
  places.forEach((place) => {
    y += yRange;

    const pageHeight = doc.internal.pageSize.height;

    doc.setFontSize(textFontSize);
    if (y >= pageHeight) {
      doc.addPage();
      isNewPage = true;
    }
    if (isNewPage) {
      doc.setFont("Roboto-Black", "normal");
      doc.setFontSize(titleFontSize);
      doc.text(`${city} - Geçici Konaklama Yerleri`, x, yRange * 2);
      doc.setFont("Roboto-Regular", "normal");
      doc.setFontSize(textFontSize);
      doc.text(
        `Dosyanın oluşturulma tarihi: ${getDateAndTime()}` + pageStartText,
        x,
        yRange * 3
      );
      isNewPage = false;
      y = 60;
    }
    doc.setFontSize(textFontSize);

    doc.text("\u2022 " + `${place.name}`, x, y);
    y += yRange;
    doc.setFontSize(smallTextSize);
    if (place.phone) {
      doc.text(`Telefon: ${place.phone}`, x, y);
      y += yRange;
    }
    if (place.address) {
      doc.textWithLink("Maps: " + place.address, x, y, { url: place.address });
      y += yRange;
    }
    doc.text(`Geçerli olduğu tarih: ${place.date}`, x + 7, y);
  });
};

module.exports = { createAccomodationPDF };
