const fs = require("fs");
const { default: axios } = require("axios");
const { jsPDF } = require("jspdf");
const accomodation = require("./leafs/extractBarinma");
const { createSafeGatheringPlacePDF } = require("./leafs/safeGatheringPlaces");
const { writePhoneNumbersToPdf } = require("./leafs/telefonNumaralari");
const { setFont, registerFont } = require("./docFunctions");
const { createMealPdf, getMealData } = require("./leafs/yemek");
const constantData = require("./constants");
// const { createCoverPage } = require("./coverPage");
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
const { createCoverPage } = require("./coverPage");

const DATA_URL = "https://cdn.afetbilgi.com/latest_translated.json?v=1.5`";
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
    doc.save(
      "output/temporary_accomodations/" +
        city +
        "_temporary_accomodation" +
        ".pdf"
    );
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
    doc.save("output/safe_gathering_places/" + city + ".pdf");
  });
};

const createLeafMealPDF = async () => {
  const data = await fetchData();

  const mealData = getMealData(data);
  console.log(mealData);

  depremBolgeleri.forEach(async (city) => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "px",
      format: "a4",
    });

    registerFont(doc);

    setFont(doc, "regular");
    createMealPdf(doc, data, city);
    doc.save("output/meals/" + city + ".pdf");
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

const createVeterinerPlacesPDF = async () => {
  const data = await fetchData();

  const veterinerPlaces = getVeterinerPlaces(data);

  console.log(veterinerPlaces);

  const path = `output/${encodeURIComponent(veterinerPlaces[0].name_tr)}/`;
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

  const path = `output/${encodeURIComponent(helpCenters[0].name_tr)}/`;
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

  const path = `output/${encodeURIComponent(bloodDonation[0].name_tr)}/`;
  fs.mkdirSync(path, { recursive: true });

  bloodDonation[0].value.options.forEach((option) => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "px",
      format: "a4",
    });
    registerFont(doc);

    writeBloodDonationsPDF(doc, option.value_tr.data);

    doc.save(path + option.name_tr + ".pdf");
  });
};

const createStemCellsPDF = async () => {
  const data = await fetchData();
  const doc = new jsPDF({
    orientation: "p",
    unit: "px",
    format: "a4",
  });

  registerFont(doc);
  writeStemCellsPDF(doc, data);
  doc.save("output/" + "stem_cells" + ".pdf");
};

const createMainPagePDF = async () => {
  const doc = new jsPDF({
    orientation: "p",
    unit: "px",
    format: "a4",
  });

  registerFont(doc);
  createCoverPage(doc, "Afet Bilgi Bilgilendirme Servisi");
  doc.save("output/" + "first_page" + ".pdf");
};

const fetchData = async () => {
  // const dataAll = await axios.get(DATA_URL);
  const dataAll = JSON.parse(fs.readFileSync("data.json", "utf8"));
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
  createVpnPDF,
  createVeterinerPlacesPDF,
  createHelpCentersPDF,
  createBloodDonationPDF,
  createStemCellsPDF,
  createMainPagePDF,
};
