const { default: axios } = require("axios");
const { jsPDF } = require("jspdf");
const accomodation = require("./leafs/extractBarinma");
const { createSafeGatheringPlacePDF } = require("./leafs/safeGatheringPlaces");
const { writePhoneNumbersToPdf } = require("./leafs/telefonNumaralari");
const { setFont, registerFont } = require("./docFunctions");
const { createMealPdf } = require("./leafs/yemek");
const constantData = require("./constants");
// const { createCoverPage } = require("./coverPage");
const { getWebSitesData, writeWebsitesPDF } = require("./leafs/webSites");
const { writeArticlesPDF } = require("./leafs/articles");
const { writeVpnPDF } = require("./leafs/vpn");
const DATA_URL = "https://cdn.afetbilgi.com/latest_translated.json?v=1.5`";

const CITYS = [
  "Adana",
  "Adıyaman",
  "Afyon",
  "Ağrı",
  "Amasya",
  "Ankara",
  "Antalya",
  "Artvin",
  "Aydın",
  "Balıkesir",
  "Bilecik",
  "Bingöl",
  "Bitlis",
  "Bolu",
  "Burdur",
  "Bursa",
  "Çanakkale",
  "Çankırı",
  "Çorum",
  "Denizli",
  "Diyarbakır",
  "Edirne",
  "Elazığ",
  "Erzincan",
  "Erzurum",
  "Eskişehir",
  "Gaziantep",
  "Giresun",
  "Gümüşhane",
  "Hakkari",
  "Hatay",
  "Isparta",
  "İçel (Mersin)",
  "İstanbul",
  "İzmir",
  "Kars",
  "Kastamonu",
  "Kayseri",
  "Kırklareli",
  "Kırşehir",
  "Kocaeli",
  "Konya",
  "Kütahya",
  "Malatya",
  "Manisa",
  "Kahramanmaraş",
  "Mardin",
  "Muğla",
  "Muş",
  "Nevşehir",
  "Niğde",
  "Ordu",
  "Rize",
  "Sakarya",
  "Samsun",
  "Siirt",
  "Sinop",
  "Sivas",
  "Tekirdağ",
  "Tokat",
  "Trabzon",
  "Tunceli",
  "Şanlıurfa",
  "Uşak",
  "Van",
  "Yozgat",
  "Zonguldak",
  "Aksaray",
  "Bayburt",
  "Karaman",
  "Kırıkkale",
  "Batman",
  "Şırnak",
  "Bartın",
  "Ardahan",
  "Iğdır",
  "Yalova",
  "Karabük",
  "Kilis",
  "Osmaniye",
  "Düzce",
];
const depremBolgeleri = constantData.affectedCities;

const createAllInOnePDF = async () => {
  const doc = new jsPDF({
    orientation: "p",
    unit: "px",
    format: "a4",
  });
  registerFont(doc);

  const data = await fetchData();

  CITYS.forEach((city) => {
    createSafeGatheringPlacePDF(doc, data, city);
    setFont(doc, "regular");
    accomodation.createAccomodationPDF(data, doc, city);
    // createMealPdf(doc, data, city);
  });

  writePhoneNumbersToPdf(doc, data);

  doc.save("output/" + "allCities.pdf");
};

const createLeafTemporaryAccomodationPDF = async () => {
  const data = await fetchData();
  depremBolgeleri.forEach(async (city) => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "px",
      format: "a4",
    });

    registerFont(doc);

    // createSafeGatheringPlacePDF(doc, data, city);
    setFont(doc, "regular");
    accomodation.createAccomodationPDF(data, doc, city);
    doc.save("output/" + city + "_temporary_accomodation" + ".pdf");
  });
};

const createLeafSafeGatheringPlacesPDF = async () => {
  const data = await fetchData();
  depremBolgeleri.forEach(async (city) => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "px",
      format: "a4",
    });

    registerFont(doc);

    setFont(doc, "regular");
    createSafeGatheringPlacePDF(doc, data, city);
    doc.save("output/" + city + "_safe_gathering_places" + ".pdf");
  });
};

const createLeafMealPDF = async () => {
  const data = await fetchData();
  depremBolgeleri.forEach(async (city) => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "px",
      format: "a4",
    });

    registerFont(doc);

    setFont(doc, "regular");
    createMealPdf(doc, data, city);
    doc.save("output/" + city + "_meal" + ".pdf");
  });
};

const createPhoneNumbersPDF = async () => {
  const data = await fetchData();
  const doc = new jsPDF({
    orientation: "p",
    unit: "px",
    format: "a4",
  });

  registerFont(doc);
  writePhoneNumbersToPdf(doc, data);
  doc.save("output/" + "phone_numbers" + ".pdf");
};

const createWebSitesPDF = async () => {
  const data = await fetchData();
  const doc = new jsPDF({
    orientation: "p",
    unit: "px",
    format: "a4",
  });

  registerFont(doc);
  writeWebsitesPDF(doc, data);
  doc.save("output/" + "web_sites" + ".pdf");
};

const createArticlePDF = async () => {
  const data = await fetchData();
  const doc = new jsPDF({
    orientation: "p",
    unit: "px",
    format: "a4",
  });

  registerFont(doc);
  writeArticlesPDF(doc, data);
  doc.save("output/" + "articles" + ".pdf");
};

const createVpnPDF = async () => {
  const data = await fetchData();
  const doc = new jsPDF({
    orientation: "p",
    unit: "px",
    format: "a4",
  });

  registerFont(doc);
  writeVpnPDF(doc, data);
  doc.save("output/" + "vpn" + ".pdf");
};

//fetches data
const fetchData = async () => {
  const dataAll = await axios.get(DATA_URL);
  const data = dataAll.data;
  return data;
};

// createAllInOnePDF();
// createLeafTemporaryAccomodationPDF();
// createLeafSafeGatheringPlacesPDF();
// createLeafMealPDF();
// createPhoneNumbersPDF();
// createWebSitesPDF();
// createArticlePDF();
createVpnPDF();

module.exports = {
  createAllInOnePDF,
  createLeafTemporaryAccomodationPDF,
  createLeafSafeGatheringPlacesPDF,
  createLeafMealPDF,
  createPhoneNumbersPDF,
};
