const { default: axios } = require("axios");
const { jsPDF } = require("jspdf")
const accomodation = require('./extractBarinma')
const { createSafeGatheringPlacePDF } = require("./safeGatheringPlaces")
const { getPhoneNumberData, writePhoneNumbersToPdf } = require("./telefonNumaralari");
const { setFont, registerFont } = require("./docFunctions");
const { createMealPdf } = require("./yemek");
const constantData = require("./constants");
const { createCoverPage } = require("./coverPage");

const DATA_URL = "https://cdn.afetbilgi.com/latest.json";

const CITYS = ["Adana", "Adıyaman", "Afyon", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta", "İçel (Mersin)", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"]
const depremBolgeleri = constantData.affectedCities;

const createAllInOnePDF = async () => {

    const doc = new jsPDF({
        orientation: "p",
        unit: "px",
        format: "a4"
    })
    registerFont(doc)
//
    const data = await fetchData()

    createCoverPage(doc, "Tüm Şehirler")

    CITYS.forEach(city => {
        createSafeGatheringPlacePDF(doc, data, city)
        setFont(doc, "regular")
        accomodation.createAccomodationPDF(data, doc, city);
        createMealPdf(doc, data, city)
    })
    
    writePhoneNumbersToPdf(doc, data)

    doc.save("output/" + "Tüm Şehirler.pdf");

}



const createForEachCityPDF = async () => {
    
    const data = await fetchData()
    depremBolgeleri.forEach(async (city) => {
        const doc = new jsPDF({
            orientation: "p",
            unit: "px",
            format: "a4"
        })


        registerFont(doc)

        createCoverPage(doc, city)

        createSafeGatheringPlacePDF(doc, data, city)
        setFont(doc, "regular")
        accomodation.createAccomodationPDF(data, doc, city);
        createMealPdf(doc, data, city)

        writePhoneNumbersToPdf(doc, data)

        doc.save("output/" + city + ".pdf");

    })

}

//fetches data
const fetchData = async () => {
    const dataAll = await axios.get(DATA_URL);
    const data = dataAll.data
    return data;
}

createAllInOnePDF()
createForEachCityPDF()

module.exports = {
    createAllInOnePDF,
    createForEachCityPDF,
}