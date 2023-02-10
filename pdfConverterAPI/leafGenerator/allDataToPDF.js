const fs = require("fs");
const { default: axios } = require("axios");
const { jsPDF } = require("jspdf");
const {
  writeTemporaryAccomodationPDF,
  getTemporaryAccomodationData,
} = require("./leafs/extractBarinma");
const {
  writeSafeGatheringPlacesPDF,
  getSafeGatheringPlace,
} = require("./leafs/safeGatheringPlaces");
const { writePhoneNumbersToPdf } = require("./leafs/telefonNumaralari");
const { setFont, registerFont } = require("./docFunctions");
const { writeMealPDF, getMealData } = require("./leafs/yemek");
const constantData = require("./constants");
const { getWebSitesData, writeWebsitesPDF } = require("./leafs/webSites");
const { writeArticlesPDF } = require("./leafs/articles");
const { writeVpnPDF } = require("./leafs/vpn");
const {
  writeVeterinerPlacesPDF,
  getVeterinerPlaces,
} = require("./leafs/veteriner");

const { writeHelpCentersPDF, getHelpCenters } = require("./leafs/helpCenters");
const {
  writeBloodDonationsPDF,
  getBloodDonations,
} = require("./leafs/bloodDonation");

const { writeStemCellsPDF } = require("./leafs/stemCells");
const { writePharmacyData } = require("./leafs/pharmacy");

const DATA_URL = "https://cdn.afetbilgi.com/latest.json";
// TODO: BUNNU SIL
// const DATA_URL = "/data.json";

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

const createLeafTemporaryAccomodationPDF = async () => {
  const data = await fetchData();

  const temporaryAccomodationData = getTemporaryAccomodationData(data);
  const path = `../outputs/${temporaryAccomodationData[0].name_tr}/`;
  fs.mkdirSync(path, { recursive: true });

  temporaryAccomodationData[0].value.options.forEach((option) => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "px",
      format: "a4",
    });

    registerFont(doc);
    writeTemporaryAccomodationPDF(doc, option);
    doc.save(path + option.name_tr + ".pdf");
  });
};

const createLeafSafeGatheringPlacesPDF = async () => {
  const data = await fetchData();

  const safe_gathering_places = getSafeGatheringPlace(data);

  const path = `../outputs/${safe_gathering_places.name_tr}/`;
  fs.mkdirSync(path, { recursive: true });

  safe_gathering_places.value.options.forEach((option) => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "px",
      format: "a4",
    });

    registerFont(doc);
    writeSafeGatheringPlacesPDF(doc, option);
    doc.save(path + option.name_tr + ".pdf");
  });
};

const createLeafMealPDF = async () => {
  const data = await fetchData();

  const mealData = getMealData(data);
  const path = `../outputs/${
    mealData.name_tr ? mealData.name_tr : mealData.name
  }/`;
  fs.mkdirSync(path, { recursive: true });

  mealData.value.options.forEach((option) => {
    writeMealPDF(option);
  });
};

const createVeterinerPlacesPDF = async () => {
  const data = await fetchData();

  const veterinerPlaces = getVeterinerPlaces(data);

  const path = `../outputs/${veterinerPlaces[0].name_tr}/`;
  fs.mkdirSync(path, { recursive: true });

  veterinerPlaces[0].value.options.forEach((option) => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "px",
      format: "a4",
    });
    registerFont(doc);
    writeVeterinerPlacesPDF(doc, option.value.data);
    doc.save(path + option.name_tr + ".pdf");
  });
};

const createHelpCentersPDF = async () => {
  const data = await fetchData();

  const helpCenters = getHelpCenters(data);

  const path = `../outputs/${helpCenters[0].name_tr}/`;
  fs.mkdirSync(path, { recursive: true });

  helpCenters[0].value.options.forEach((option) => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "px",
      format: "a4",
    });
    registerFont(doc);
    writeHelpCentersPDF(doc, option.value.data);
    doc.save(path + option.name_tr + ".pdf");
  });
};

const createBloodDonationPDF = async () => {
  const data = await fetchData();
  const bloodDonation = getBloodDonations(data);

  const path = `../outputs/${bloodDonation[0].name_tr}/`;
  fs.mkdirSync(path, { recursive: true });

  bloodDonation[0].value.options.forEach((option) => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "px",
      format: "a4",
    });
    registerFont(doc);

    writeBloodDonationsPDF(doc, option.value.data.items);

    doc.save(path + option.name_tr + ".pdf");
  });
};

const createPhoneNumbersPDF = async () => {
  const data = await fetchData();

  const path = `../outputs/${"Önemli Telefon Numaraları"}`;
  const doc = new jsPDF({
    orientation: "p",
    unit: "px",
    format: "a4",
  });

  registerFont(doc);
  writePhoneNumbersToPdf(doc, data);
  doc.save(path + ".pdf");
};

const createWebSitesPDF = async () => {
  const data = await fetchData();
  const path = `../outputs/${"Önemli Web Siteleri"}`;
  const doc = new jsPDF({
    orientation: "p",
    unit: "px",
    format: "a4",
  });

  registerFont(doc);
  writeWebsitesPDF(doc, data);
  doc.save(path + ".pdf");
};

const createArticlePDF = async () => {
  const data = await fetchData();
  const path = `../outputs/${"Faydalı Yazılar"}`;
  const doc = new jsPDF({
    orientation: "p",
    unit: "px",
    format: "a4",
  });

  registerFont(doc);
  writeArticlesPDF(doc, data);
  doc.save(path + ".pdf");
};

// const createVpnPDF = async () => {
//   const data = await fetchData();

//   const doc = new jsPDF({
//     orientation: "p",
//     unit: "px",
//     format: "a4",
//   });

//   registerFont(doc);
//   writeVpnPDF(doc, data);
//   doc.save("../outputs/" + "VPN" + ".pdf");
// };

const createStemCellsPDF = async () => {
  const data = await fetchData();

  const path = `../outputs/${"Kök Hücre Bağış Noktaları"}`;

  const doc = new jsPDF({
    orientation: "p",
    unit: "px",
    format: "a4",
  });

  registerFont(doc);
  writeStemCellsPDF(doc, data);
  doc.save(path + ".pdf");
};

const createPharmacyPDF = async () => {
  const data = await fetchData();

  const path = `../outputs/${"Konteyner Eczaneler"}`;

  const doc = new jsPDF({
    orientation: "p",
    unit: "px",
    format: "a4",
  });

  registerFont(doc);
  writePharmacyData(doc, data);
  doc.save(path + ".pdf");
};

const fetchData = async () => {
  const dataAll = await axios.get(DATA_URL);

  const data = dataAll.data;
  return data;
};

module.exports = {
  createLeafTemporaryAccomodationPDF,
  createLeafSafeGatheringPlacesPDF,
  createLeafMealPDF,
  createPhoneNumbersPDF,
  createWebSitesPDF,
  createArticlePDF,
  // createVpnPDF,
  createVeterinerPlacesPDF,
  createHelpCentersPDF,
  createBloodDonationPDF,
  createStemCellsPDF,
  createPharmacyPDF,
};
