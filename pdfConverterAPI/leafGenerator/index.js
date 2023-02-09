require("dotenv").config();
const {
  createLeafTemporaryAccomodationPDF,
  createLeafSafeGatheringPlacesPDF,
  // createLeafMealPDF,
  createPhoneNumbersPDF,
  createWebSitesPDF,
  createArticlePDF,
  createVpnPDF,
  createVeterinerPlacesPDF,
  createHelpCentersPDF,
  createBloodDonationPDF,
  createStemCellsPDF,
} = require("./allDataToPDF");

createLeafTemporaryAccomodationPDF();
createLeafSafeGatheringPlacesPDF();
// createLeafMealPDF();
createPhoneNumbersPDF();
createWebSitesPDF();
createArticlePDF();
createVpnPDF();
createVeterinerPlacesPDF();
createHelpCentersPDF();
createBloodDonationPDF();
createStemCellsPDF();
