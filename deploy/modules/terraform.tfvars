versioned_data_types = {
  transportations = [
    "name",
    "url",
    "validationSource",
    "validationDate",
    "description",
    "validUntil",
  ],
  help-item-list = [
    "name",
    "city",
    "url",
    "phone",
  ],
  services = [
    "category",
    "city",
    "county",
    "location",
    "mapURL",
    "subCategory",
    "source",
  ],
  city-accommodation = [
    "name",
    "city",
    "url",
    "mapURL",
    "address",
  ],
  beneficial-articles = [
    "name",
    "author",
    "category",
    "url",
  ],
  container-pharmacy = [
    "name",
    "city",
    "district",
    "mapURL",
  ],
  useful-links = [
    "name",
    "url",
  ],
}

external_data_fetchers = {
  help-item-list = {
    sourceURL = "https://example.org",
    sourceType = "google-sheets",
    fieldMappings = {
      "name" = "$0",
      "city" = "$1",
      "url" = "$3",
      "phone" = "$2",
    },
  },
  transportations = {
    sourceURL = "https://example.org",
    sourceType = "html-xpath",
    xpathRowIterator = "//table[@id='table1']/tbody/tr",
    fieldMappings = {
      "name" = "./td[1]/text()",
      "url" = "./td[2]/a/@href",
      "validationSource" = "./td[3]/text()",
      "validationDate" = "./td[4]/text()",
      "description" = "./td[5]/text()",
      "validUntil" = "./td[6]/text()",
    },
  },
}