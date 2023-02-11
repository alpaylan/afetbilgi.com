import { DataType } from "./utils/DataType";

export const MARKER_SVG = `<svg width="100%" height="100%" viewBox="-64 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"/></svg>`;

export const dataTypeToSVG: { [k: string]: string } =
{
  [DataType.CITY_ACCOMMODATION]: '<svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 48 48"><path d="M8 42V18L24 6l16 12v24H28V28h-8v14Z"/></svg>',
  [DataType.FOOD_ITEMS]: '<svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 48 48"><path d="M14.25 44V25.6q-2.6-.55-4.425-2.625Q8 20.9 8 18V4h3v14h3.25V4h3v14h3.25V4h3v14q0 2.9-1.825 4.975Q19.85 25.05 17.25 25.6V44ZM35 44V28h-5.75V12.75q0-3.95 2.4-6.35Q34.05 4 38 4v40Z"/></svg>',
  [DataType.HOSPITALS]: '<svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 48 48"><g id="Layer_2" data-name="Layer 2"><g id="invisible_box" data-name="invisible box"><rect width="48" height="48" fill="none"/></g><g id="Medical"><g><path d="M24,2A22,22,0,1,0,46,24,22.1,22.1,0,0,0,24,2Zm0,40A18,18,0,1,1,42,24,18.1,18.1,0,0,1,24,42Z"/><path d="M31,13a2,2,0,0,0-2,2v7H19V15a2,2,0,0,0-4,0V33a2,2,0,0,0,4,0V26H29v7a2,2,0,0,0,4,0V15A2,2,0,0,0,31,13Z"/></g></g></g></svg>',
  [DataType.CONTAINER_PHARMACY]: '<svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 48 48"><path d="M17.25 42q-4.7 0-7.975-3.275Q6 35.45 6 30.75q0-2.25.85-4.3T9.3 22.8L22.8 9.3q1.6-1.6 3.65-2.45Q28.5 6 30.75 6q4.7 0 7.975 3.275Q42 12.55 42 17.25q0 2.25-.85 4.3T38.7 25.2L25.2 38.7q-1.6 1.6-3.65 2.45-2.05.85-4.3.85ZM30.9 28.75l5.7-5.65q1.15-1.15 1.775-2.675T39 17.25q0-3.45-2.4-5.85Q34.2 9 30.75 9q-1.65 0-3.175.625T24.9 11.4l-5.65 5.7ZM17.25 39q1.6 0 3.15-.625 1.55-.625 2.7-1.775l5.65-5.7L17.1 19.25l-5.7 5.65q-1.15 1.15-1.775 2.675T9 30.75q0 3.45 2.4 5.85 2.4 2.4 5.85 2.4Z"/></svg>',
  [DataType.NEW_GATHERING_LIST]: '<svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 48 48"><path d="M2 40v-8q0-1.45 1.025-2.475Q4.05 28.5 5.5 28.5h7.05q.85 0 1.625.425T15.5 30.1q1.45 2.1 3.7 3.25T24 34.5q2.55 0 4.8-1.15t3.75-3.25q.55-.75 1.3-1.175.75-.425 1.6-.425h7.05q1.45 0 2.475 1.025Q46 30.55 46 32v8H33v-5.95q-1.8 1.65-4.125 2.55-2.325.9-4.875.9t-4.85-.9q-2.3-.9-4.15-2.55V40Zm22-8.5q-1.75 0-3.375-.825T18 28.4q-.8-1.15-1.925-1.85-1.125-.7-2.425-.95 1.45-1.5 4.55-2.3 3.1-.8 5.8-.8 2.7 0 5.825.8t4.575 2.3q-1.3.25-2.425.95-1.125.7-1.925 1.85-1 1.45-2.625 2.275T24 31.5ZM8 25q-2.25 0-3.875-1.625T2.5 19.5q0-2.3 1.625-3.9T8 14q2.3 0 3.9 1.6t1.6 3.9q0 2.25-1.6 3.875T8 25Zm32 0q-2.25 0-3.875-1.625T34.5 19.5q0-2.3 1.625-3.9T40 14q2.3 0 3.9 1.6t1.6 3.9q0 2.25-1.6 3.875T40 25Zm-16-6q-2.25 0-3.875-1.625T18.5 13.5q0-2.3 1.625-3.9T24 8q2.3 0 3.9 1.6t1.6 3.9q0 2.25-1.6 3.875T24 19Z"/></svg>',
  [DataType.DATA_VET]: '<svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 48 48"><path d="M8.5 23.75q-1.9 0-3.2-1.3-1.3-1.3-1.3-3.2 0-1.9 1.3-3.2 1.3-1.3 3.2-1.3 1.9 0 3.2 1.3 1.3 1.3 1.3 3.2 0 1.9-1.3 3.2-1.3 1.3-3.2 1.3Zm9.25-8.5q-1.9 0-3.2-1.3-1.3-1.3-1.3-3.2 0-1.9 1.3-3.2 1.3-1.3 3.2-1.3 1.9 0 3.2 1.3 1.3 1.3 1.3 3.2 0 1.9-1.3 3.2-1.3 1.3-3.2 1.3Zm12.5 0q-1.9 0-3.2-1.3-1.3-1.3-1.3-3.2 0-1.9 1.3-3.2 1.3-1.3 3.2-1.3 1.9 0 3.2 1.3 1.3 1.3 1.3 3.2 0 1.9-1.3 3.2-1.3 1.3-3.2 1.3Zm9.25 8.5q-1.9 0-3.2-1.3-1.3-1.3-1.3-3.2 0-1.9 1.3-3.2 1.3-1.3 3.2-1.3 1.9 0 3.2 1.3 1.3 1.3 1.3 3.2 0 1.9-1.3 3.2-1.3 1.3-3.2 1.3Zm-26.2 20.5q-2.1 0-3.45-1.575T8.5 38.95q0-2.1 1.275-3.725T12.5 32.1q1.1-1.1 2.05-2.325.95-1.225 1.8-2.525 1.45-2.2 3.25-4.1 1.8-1.9 4.4-1.9 2.6 0 4.425 1.9 1.825 1.9 3.275 4.15.85 1.3 1.775 2.5.925 1.2 2.025 2.3 1.45 1.5 2.725 3.125Q39.5 36.85 39.5 38.95q0 2.15-1.35 3.725-1.35 1.575-3.45 1.575-2.7 0-5.35-.45-2.65-.45-5.35-.45-2.7 0-5.35.45-2.65.45-5.35.45Z"/></svg>',
};
