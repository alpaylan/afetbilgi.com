export enum TreeNodeType {
  NODE_TYPE_QUESTION = 'question',
  NODE_TYPE_DATA = 'data',
}

export enum Category {
  VICTIM = 'victim',
  HELPER = 'helper',
  RESOURCES = 'resources',
  HEALTH = 'health',
  OTHER = 'other',
}

export enum DataType {
  BANK_ACCOUNT_DONATION = 'bank-account-donation',
  BENEFICIAL_ARTICLES = 'beneficial-articles',
  BLOOD_DONATION_LIST = 'blood-donationlist',
  CITY_ACCOMMODATION = 'city-accommodation',
  CREDIT_CARD_DONATION = 'credit-card-donation',
  INTERNATIONAL_BANK_ACCOUNT_DONATION = 'international-bank-account-donation',
  INTERNATIONAL_URL_DONATION = 'international-url-donation',
  NEW_GATHERING_LIST = 'new-gathering-list',
  HELP_ITEM_LIST = 'help-item-list',
  PHONE_NUMBER_LIST = 'phone-number-list',
  SMS_DONATION = 'sms-donation',
  URL_DONATION = 'url-donation',
  USEFUL_LINKS = 'useful-links',
  STEM_CELL_DONATION = 'stem-cell-donation',
  DATA_VET = 'data-vet',
  FOOD_ITEMS = 'food-items',
  VPN = 'vpn',
  GAS_STATION = 'gas_stations',
  CONTAINER_PHARMACY = 'container-pharmacy',
  EVACUATION_POINTS = 'evacuation-points',
  DONATION_LINKS = 'donation-links',
  TRANSPORTATIONS = 'transportations',
  HEALTHCARE_SERVICES = 'healthcare-services',
  MOBILE_TOILETS = 'mobile-toilets',
  PHARMACY = 'local-pharmacy-list',
  DIGITAL_PLATFORMS = 'digital-platforms',
  SERVICES = 'services',
}

export const dataTypeToCategoryMap: { [key in DataType as string]: Category } =
  {
    [DataType.CITY_ACCOMMODATION]: Category.VICTIM,
    [DataType.NEW_GATHERING_LIST]: Category.VICTIM,
    [DataType.FOOD_ITEMS]: Category.VICTIM,
    [DataType.EVACUATION_POINTS]: Category.VICTIM,
    [DataType.TRANSPORTATIONS]: Category.VICTIM,
    [DataType.GAS_STATION]: Category.VICTIM,
    [DataType.MOBILE_TOILETS]: Category.VICTIM,
    [DataType.SERVICES]: Category.VICTIM,
    [DataType.HEALTHCARE_SERVICES]: Category.HEALTH,
    [DataType.CONTAINER_PHARMACY]: Category.HEALTH,
    [DataType.DATA_VET]: Category.HEALTH,
    [DataType.PHARMACY]: Category.HEALTH,
    [DataType.DIGITAL_PLATFORMS]: Category.HELPER,
    [DataType.BANK_ACCOUNT_DONATION]: Category.HELPER,
    [DataType.DONATION_LINKS]: Category.HELPER,
    [DataType.BLOOD_DONATION_LIST]: Category.HELPER,
    [DataType.CREDIT_CARD_DONATION]: Category.HELPER,
    [DataType.INTERNATIONAL_BANK_ACCOUNT_DONATION]: Category.HELPER,
    [DataType.INTERNATIONAL_URL_DONATION]: Category.HELPER,
    [DataType.HELP_ITEM_LIST]: Category.HELPER,
    [DataType.SMS_DONATION]: Category.HELPER,
    [DataType.URL_DONATION]: Category.HELPER,
    [DataType.STEM_CELL_DONATION]: Category.HELPER,
    [DataType.BENEFICIAL_ARTICLES]: Category.RESOURCES,
    [DataType.PHONE_NUMBER_LIST]: Category.RESOURCES,
    [DataType.USEFUL_LINKS]: Category.RESOURCES,
    [DataType.VPN]: Category.RESOURCES,
  };
