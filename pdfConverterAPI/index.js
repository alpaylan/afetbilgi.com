require("dotenv").config();
const {
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
} = require("./allDataToPDF");

createLeafTemporaryAccomodationPDF();
createLeafSafeGatheringPlacesPDF();
createLeafMealPDF();
createPhoneNumbersPDF();
createWebSitesPDF();
createArticlePDF();
createVpnPDF();
createVeterinerPlacesPDF();
createHelpCentersPDF();
createBloodDonationPDF();
createStemCellsPDF();
createMainPagePDF();
