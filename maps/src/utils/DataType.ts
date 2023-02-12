export enum DataType {
  CITY_ACCOMMODATION = 'map-city-accommodation',
  FOOD_ITEMS = 'map-food-items',
  HOSPITALS = 'map-hospital-list',
  CONTAINER_PHARMACY = 'map-container-pharmacy',
  EVACUATION_POINTS = 'map-evacuation-points',
  NEW_GATHERING_LIST = 'map-gathering-list',
  DATA_VET = 'map-data-vet',
  // HELP_ITEM_LIST = 'map-help-item-list',
  // STEM_CELL_DONATION = 'map-stem-cell-donation',
  // EVACUATION_POINTS = 'map-evacuation-points',
}

export const dataTypeToColor: { [k: string]: string } =
  {
    [DataType.CITY_ACCOMMODATION]: '#5185EC',
    [DataType.FOOD_ITEMS]: '#E69C23',
    [DataType.HOSPITALS]: '#DE6F62',
    [DataType.CONTAINER_PHARMACY]: '#D85040',
    [DataType.EVACUATION_POINTS]: '#80e',
    [DataType.NEW_GATHERING_LIST]: '#0b4',
    [DataType.DATA_VET]: '#2be',
    // [DataType.STEM_CELL_DONATION]: '#fb0',
    // [DataType.HELP_ITEM_LIST]: '#0b4',
    // [DataType.EVACUATION_POINTS]: '#80e',
  };

export const dataTypeToLabel: { [k: string]: any } =
  {
    [DataType.CITY_ACCOMMODATION]: { 'name_ar': 'ملاجئ مؤقتة', 'name_tr': 'Geçici Barınma Alanları', 'name_en': 'Temporary Accommodation Places', 'name_ku': 'Bicîhbûna Demkî' },
    [DataType.FOOD_ITEMS]: { 'name_ar': 'مواقع توصيل الطعام', 'name_tr': 'Yemek Dağıtım Yerleri', 'name_en': 'Food Distribution Center', 'name_ku': 'Cihên Belavkirina Xwarinê' },
    [DataType.HOSPITALS]: { 'name_tr': 'Sahra Hastaneleri', 'name_ar': 'مستشفيات الصحراء', 'name_en': 'Field Hospitals', 'name_ku': 'Xanên Sahra' },
    [DataType.CONTAINER_PHARMACY]: { 'name_ar': "صيدليات الحاويات", "name_ku": "Dermanxaneyên Seyare", "name_en": "Container Pharmacies", "name_tr": 'Konteyner Eczaneler' },
    [DataType.EVACUATION_POINTS]: { 'name_ar': 'نقاط الإخلاء', 'name_tr': 'Tahliye Noktaları', 'name_en': 'Evacuation Points', 'name_ku': 'Xalên valakirinê' },
    [DataType.NEW_GATHERING_LIST]: { 'name_ar': 'مناطق تجميع آمنة', 'name_tr': 'Güvenli Toplanma Alanları', 'name_en': 'Safe Gathering Places', 'name_ku': 'Qadên Ewle Bo Kombûnê' },
    [DataType.DATA_VET]: { 'name_ar': 'بَيَاطير', 'name_tr': 'Veterinerler', 'name_en': 'Veterinarians', 'name_ku': 'Veterîner' },
    // [DataType.HELP_ITEM_LIST]:{ 'name_ar': 'فرص التبرع بالعناصر', 'name_tr': 'Yardım Toplama Merkezleri','name_en': 'Other Donation', 'name_ku': 'Bexşkirina Tiştan' },
    // [DataType.STEM_CELL_DONATION]:{ 'name_ar': 'نقاط التبرع بالخلايا الجذعية', 'name_tr': 'Kök Hücre Bağış Noktaları', 'name_en': 'Stem Cell Donation Points', 'name_ku': 'Cihên bo bexşîna xaneyî bineretiyê' },
    // [DataType.EVACUATION_POINTS]:{ 'name_ar': 'نقاط الإخلاء', 'name_tr': 'Tahliye Noktaları', 'name_en': 'Evacuation Points', 'name_ku': 'Xalên valakirinê' },
    // EVACUATION_POINTS TO BE ADDED SINCE DATA IS AVAILABLE IN SHEET
  };
