export enum DataType {
  CITY_ACCOMMODATION = 'map-city-accommodation',
  FOOD_ITEMS = 'map-food-items',
  HOSPITALS = 'map-hospital-list',
  CONTAINER_PHARMACY = 'map-container-pharmacy',
  EVACUATION_POINTS = 'map-evacuation-points',
  NEW_GATHERING_LIST = 'map-gathering-list',
  DATA_VET = 'map-data-vet',
  EXTERNAL_HELP_ITEM = 'map-external-help-item',
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
    [DataType.EXTERNAL_HELP_ITEM]: '#fb0',
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
    [DataType.EXTERNAL_HELP_ITEM]:{ 'name_ar': 'فرص التبرع بالعناصر', 'name_tr': 'Yardım Toplama Merkezleri','name_en': 'Other Donation', 'name_ku': 'Bexşkirina Tiştan' },
    // [DataType.HELP_ITEM_LIST]:{ 'name_ar': 'فرص التبرع بالعناصر', 'name_tr': 'Yardım Toplama Merkezleri','name_en': 'Other Donation', 'name_ku': 'Bexşkirina Tiştan' },
    // [DataType.STEM_CELL_DONATION]:{ 'name_ar': 'نقاط التبرع بالخلايا الجذعية', 'name_tr': 'Kök Hücre Bağış Noktaları', 'name_en': 'Stem Cell Donation Points', 'name_ku': 'Cihên bo bexşîna xaneyî bineretiyê' },
    // [DataType.EVACUATION_POINTS]:{ 'name_ar': 'نقاط الإخلاء', 'name_tr': 'Tahliye Noktaları', 'name_en': 'Evacuation Points', 'name_ku': 'Xalên valakirinê' },
    // EVACUATION_POINTS TO BE ADDED SINCE DATA IS AVAILABLE IN SHEET
  };

export const MARKER_SVG = `<svg width="100%" height="100%" viewBox="-64 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"/></svg>`;

export const dataTypeToSVG: { [k: string]: string } =
{
  [DataType.CITY_ACCOMMODATION]: '<svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 48 48"><path d="M8 42V18L24 6l16 12v24H28V28h-8v14Z"/></svg>',
  [DataType.FOOD_ITEMS]: '<svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 48 48"><path d="M14.25 44V25.6q-2.6-.55-4.425-2.625Q8 20.9 8 18V4h3v14h3.25V4h3v14h3.25V4h3v14q0 2.9-1.825 4.975Q19.85 25.05 17.25 25.6V44ZM35 44V28h-5.75V12.75q0-3.95 2.4-6.35Q34.05 4 38 4v40Z"/></svg>',
  [DataType.HOSPITALS]: '<svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 48 48"><g id="Layer_2" data-name="Layer 2"><g id="invisible_box" data-name="invisible box"><rect width="48" height="48" fill="none"/></g><g id="Medical"><g><path d="M24,2A22,22,0,1,0,46,24,22.1,22.1,0,0,0,24,2Zm0,40A18,18,0,1,1,42,24,18.1,18.1,0,0,1,24,42Z"/><path d="M31,13a2,2,0,0,0-2,2v7H19V15a2,2,0,0,0-4,0V33a2,2,0,0,0,4,0V26H29v7a2,2,0,0,0,4,0V15A2,2,0,0,0,31,13Z"/></g></g></g></svg>',
  [DataType.CONTAINER_PHARMACY]: '<svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 48 48"><path d="M17.25 42q-4.7 0-7.975-3.275Q6 35.45 6 30.75q0-2.25.85-4.3T9.3 22.8L22.8 9.3q1.6-1.6 3.65-2.45Q28.5 6 30.75 6q4.7 0 7.975 3.275Q42 12.55 42 17.25q0 2.25-.85 4.3T38.7 25.2L25.2 38.7q-1.6 1.6-3.65 2.45-2.05.85-4.3.85ZM30.9 28.75l5.7-5.65q1.15-1.15 1.775-2.675T39 17.25q0-3.45-2.4-5.85Q34.2 9 30.75 9q-1.65 0-3.175.625T24.9 11.4l-5.65 5.7ZM17.25 39q1.6 0 3.15-.625 1.55-.625 2.7-1.775l5.65-5.7L17.1 19.25l-5.7 5.65q-1.15 1.15-1.775 2.675T9 30.75q0 3.45 2.4 5.85 2.4 2.4 5.85 2.4Z"/></svg>',
  [DataType.EVACUATION_POINTS]: '<svg fill="#ffffff" height="95%" width="95%" version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"viewBox="-1077 923 256 256" xml:space="preserve"><g><path d="M-934.7,1039.4c-0.2,0-0.3,0-0.5,0.1c-0.1,0-0.1,0-0.2-0.1l-23.4,3.5l-13.3-29.3c-1.8-3.6-4-6.6-6.7-8.9c-1.1-1.1-2.5-2.1-3.9-3c-1.5-0.8-3-1.4-4.7-1.7c-4.3-1-8.2-0.4-11.8,1.7l-29.3,13.7c-2,1.3-3.9,1.8-4.4,2.1c-3,2.1-3.5,3.2-3.9,3.9l-14.8,28.3c-0.1,0.3-0.2,0.6-0.3,0.8c-0.5,1.1-0.9,2.3-0.9,3.6c0,1.3,0.4,2.6,0.9,3.7c0.7,1.8,2,3,3.7,3.5c1,0.5,2.2,0.8,3.4,0.8c3.2,0,5.9-1.9,7.2-4.5c0.1-0.2,0.2-0.3,0.3-0.5c9.2-17.2,13.8-25.9,13.8-26.1l15.7-3.7l-18.8,79.1l-35.9-0.3c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0c-4.7,0-8.6,3.8-8.6,8.6c0,4.4,3.3,7.9,7.5,8.5v0.1l10,0c7.8,0.4,30.7,1.4,37.7,0.6c0.2,0,0.4,0.1,0.7,0.1c3.9,0,7.1-2.8,7.8-6.4l5.4-15.8l0,0c3.6-10.3,6-20.4,6-20.4c9.4,9.9,16.4,16.3,22.8,23l11,36.1l2.3,8.7l0.1,0c1.2,3.8,4.7,6.6,8.9,6.6c5.2,0,9.4-4.2,9.4-9.4c0-0.7-0.1-1.5-0.3-2.2l-0.7-2.7c0,0,0-0.1,0-0.1l-2-7.5l-2-7.4l0,0l-8.1-30c-1.1-2.8-2.1-5.5-4.4-8.1c0,0-22.5-25-23.1-25.3l5.1-24.2l7.1,15.1c0.1,0.1,0.2,0.3,0.3,0.4c0.5,0.7,0.9,1.3,1.3,1.7c1.4,1.4,3.3,2.2,5.3,2.2c0.1,0,0.1,0,0.2,0c0.6,0,1.2-0.1,1.8-0.2l26.3-2.9c0.1,0,0.2,0,0.2,0c0.7,0,1.3-0.1,1.9-0.3l0.4,0c0.1,0,0.1-0.1,0.2-0.1c3.1-1.1,5.4-4,5.4-7.4C-926.8,1043-930.3,1039.4-934.7,1039.4z"/><path d="M-984.2,995.1c4.4,0,8.2-1.6,11.3-4.7c3.1-3.1,4.7-6.8,4.7-11.1c0-4.4-1.6-8.2-4.7-11.3c-3.1-3.1-6.9-4.7-11.3-4.7c-4.3,0-8,1.6-11.1,4.7c-3.1,3.1-4.7,6.9-4.7,11.3c0,4.3,1.6,8,4.7,11.1C-992.2,993.6-988.5,995.1-984.2,995.1z"/><path d="M-897.2,948.6V1145l72.6,31.8V925.2L-897.2,948.6z M-886.1,1055.8c-1.4,0-2.6-4.4-2.6-9.8s1.2-9.8,2.6-9.8c1.4,0,2.6,4.4,2.6,9.8S-884.6,1055.8-886.1,1055.8z"/></g></svg>',
  [DataType.NEW_GATHERING_LIST]: '<svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 48 48"><path d="M2 40v-8q0-1.45 1.025-2.475Q4.05 28.5 5.5 28.5h7.05q.85 0 1.625.425T15.5 30.1q1.45 2.1 3.7 3.25T24 34.5q2.55 0 4.8-1.15t3.75-3.25q.55-.75 1.3-1.175.75-.425 1.6-.425h7.05q1.45 0 2.475 1.025Q46 30.55 46 32v8H33v-5.95q-1.8 1.65-4.125 2.55-2.325.9-4.875.9t-4.85-.9q-2.3-.9-4.15-2.55V40Zm22-8.5q-1.75 0-3.375-.825T18 28.4q-.8-1.15-1.925-1.85-1.125-.7-2.425-.95 1.45-1.5 4.55-2.3 3.1-.8 5.8-.8 2.7 0 5.825.8t4.575 2.3q-1.3.25-2.425.95-1.125.7-1.925 1.85-1 1.45-2.625 2.275T24 31.5ZM8 25q-2.25 0-3.875-1.625T2.5 19.5q0-2.3 1.625-3.9T8 14q2.3 0 3.9 1.6t1.6 3.9q0 2.25-1.6 3.875T8 25Zm32 0q-2.25 0-3.875-1.625T34.5 19.5q0-2.3 1.625-3.9T40 14q2.3 0 3.9 1.6t1.6 3.9q0 2.25-1.6 3.875T40 25Zm-16-6q-2.25 0-3.875-1.625T18.5 13.5q0-2.3 1.625-3.9T24 8q2.3 0 3.9 1.6t1.6 3.9q0 2.25-1.6 3.875T24 19Z"/></svg>',
  [DataType.DATA_VET]: '<svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 48 48"><path d="M8.5 23.75q-1.9 0-3.2-1.3-1.3-1.3-1.3-3.2 0-1.9 1.3-3.2 1.3-1.3 3.2-1.3 1.9 0 3.2 1.3 1.3 1.3 1.3 3.2 0 1.9-1.3 3.2-1.3 1.3-3.2 1.3Zm9.25-8.5q-1.9 0-3.2-1.3-1.3-1.3-1.3-3.2 0-1.9 1.3-3.2 1.3-1.3 3.2-1.3 1.9 0 3.2 1.3 1.3 1.3 1.3 3.2 0 1.9-1.3 3.2-1.3 1.3-3.2 1.3Zm12.5 0q-1.9 0-3.2-1.3-1.3-1.3-1.3-3.2 0-1.9 1.3-3.2 1.3-1.3 3.2-1.3 1.9 0 3.2 1.3 1.3 1.3 1.3 3.2 0 1.9-1.3 3.2-1.3 1.3-3.2 1.3Zm9.25 8.5q-1.9 0-3.2-1.3-1.3-1.3-1.3-3.2 0-1.9 1.3-3.2 1.3-1.3 3.2-1.3 1.9 0 3.2 1.3 1.3 1.3 1.3 3.2 0 1.9-1.3 3.2-1.3 1.3-3.2 1.3Zm-26.2 20.5q-2.1 0-3.45-1.575T8.5 38.95q0-2.1 1.275-3.725T12.5 32.1q1.1-1.1 2.05-2.325.95-1.225 1.8-2.525 1.45-2.2 3.25-4.1 1.8-1.9 4.4-1.9 2.6 0 4.425 1.9 1.825 1.9 3.275 4.15.85 1.3 1.775 2.5.925 1.2 2.025 2.3 1.45 1.5 2.725 3.125Q39.5 36.85 39.5 38.95q0 2.15-1.35 3.725-1.35 1.575-3.45 1.575-2.7 0-5.35-.45-2.65-.45-5.35-.45-2.7 0-5.35.45-2.65.45-5.35.45Z"/></svg>',
  [DataType.EXTERNAL_HELP_ITEM]: '<svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 48 48"><path d="M32.3 25.1Q29.95 23 27.825 21 25.7 19 24.1 17.1t-2.55-3.675Q20.6 11.65 20.6 10q0-2.6 1.75-4.35Q24.1 3.9 26.7 3.9q1.5 0 2.975.825T32.3 6.95q1.15-1.4 2.625-2.225Q36.4 3.9 37.9 3.9q2.6 0 4.35 1.75Q44 7.4 44 10q0 1.65-.95 3.425T40.5 17.1Q38.9 19 36.775 21T32.3 25.1Zm0-4.15q3.3-3 6-5.95t2.7-5q0-1.35-.875-2.225T37.9 6.9q-.85 0-1.675.4-.825.4-1.675 1.5l-2.25 2.75-2.25-2.75q-.85-1.1-1.675-1.5-.825-.4-1.675-.4-1.35 0-2.225.875T23.6 10q0 2.05 2.7 5t6 5.95Zm-4 23.95-15.55-4.45v2.85H2V23.6h15.45l12.75 4.8q1.35.5 2.275 1.625.925 1.125.925 3.225h5.7q2.1 0 3.5 1.5T44 38.8v1.3ZM5 40.3h4.7V26.6H5Zm23.1 1.5 12.8-3.9q-.3-.95-.75-1.3-.45-.35-1.05-.35H28.75q-1.5 0-2.775-.2t-2.425-.55l-4.05-1.25 1.1-2.9 3.65 1.2q1.25.4 2.375.55 1.125.15 3.575.15 0-.6-.225-1.175-.225-.575-.775-.825L16.95 26.6h-4.2v10.7ZM9.7 33.45Zm20.5-.2Zm-20.5.2Zm3.05 0ZM32.3 13.9Z"/></svg>',
};
