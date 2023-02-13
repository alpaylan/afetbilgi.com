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
  [StatusLevel.NO_NEED_REQUIRED]: "Yeterli",
  [StatusLevel.NEED_REQUIRED]: "Gerekli",
  [StatusLevel.URGENT_NEED_REQUIRED]: "Acil Gerekli",
};

export const statusLevelToColor: { [k: string]: string } = {
  [StatusLevel.UNKNOWN_LEVEL]: "#000000",
  [StatusLevel.NO_NEED_REQUIRED]: "#26CF0B",
  [StatusLevel.NEED_REQUIRED]: "#f58216",
  [StatusLevel.URGENT_NEED_REQUIRED]: "#CB3838",
}
  
export const statusTypeToString: { [k: string]: string } =
{
  [StatusType.HUMAN_HELP]: "İnsan Gücü",
  [StatusType.PACKAGE_STATUS]: "Paketleme Kolisi İhtiyacı",
  [StatusType.MATERIAL]: "Malzeme Yardımı",
  [StatusType.FOOD]: "Yiyecek Yardımı",
};