export enum StatusLevel {
    UNKNOWN_LEVEL = "UNKNOWN",
    NO_NEED_REQUIRED = "NO_NEED_REQUIRED",
    NEED_REQUIRED = "NEED_REQUIRED",
    URGENT_NEED_REQUIRED = "URGENT_NEED_REQUIRED",
  }
  
  export enum StatusType {
    HUMAN_HELP = "HUMAN_HELP",
    MATERIAL = "MATERIAL",
    FOOD = "FOOD",
    PACKAGE_STATUS = "PACKAGE",
  }
  
  export const statusLevelToString: { [k: string]: string } =
  {
    [StatusLevel.UNKNOWN_LEVEL]: "Bilinmiyor",
    [StatusLevel.NO_NEED_REQUIRED]: "Gerekli Değil",
    [StatusLevel.NEED_REQUIRED]: "Gerekli",
    [StatusLevel.URGENT_NEED_REQUIRED]: "Acil Gerekli",
  };
  
  export const statusTypeToString: { [k: string]: string } =
  {
    [StatusType.HUMAN_HELP]: "İnsan Gücü",
    [StatusType.PACKAGE_STATUS]: "Paketleme Kolisi İhtiyacı",
    [StatusType.MATERIAL]: "Malzeme Yardımı",
    [StatusType.FOOD]: "Yiyecek Yardımı",
  };