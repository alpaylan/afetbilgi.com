require("dotenv").config();
const {
  createAllInOnePDF,
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

createAllInOnePDF();
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
