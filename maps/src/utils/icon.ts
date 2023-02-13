import L, { DivIcon } from 'leaflet';
import { dataTypeToColor, dataTypeToSVG, MARKER_SVG } from './DataType';

const RENDER_ICON_SIZE_LIMIT = 28;

function SVG(svg: any, size: number, markerColour: string) {
  return (
    `<div style="position: relative; transform: translate(-${size / 2}px, -${size}px)">
      <div style="
        fill: ${markerColour};
        position: absolute;
        height: ${size}px;
        width: ${size}px;
        stroke: white;
        stroke-width: 8px;
        stroke-linejoin: round;
        paint-order: stroke;"
      >
        ${MARKER_SVG}
      </div>
      ${svg && size > RENDER_ICON_SIZE_LIMIT
        ? `<div style="fill: white; position: absolute; height: ${size / 2}px; width: ${size / 2}px; left: ${size / 4}px; top: ${size / 8}px;">
          ${svg}
        </div>`
        : ""}
    </div>`
  )
}

//! not really sure how much effect has this on performance.
const lmap:Record<string, DivIcon> = {
};
export default function getIcon(type: string | undefined) {
  if(!type) type="default";
  if (type in lmap) return lmap[type];

  const icon = L.divIcon({
    className: 'custom-icon',
    html: type!=='default' ? SVG(dataTypeToSVG[type], 40, dataTypeToColor[type]) : SVG(null, 40, 'blue'),
    iconSize: [0, 0],
    popupAnchor: [0, -(30)],
  });
  lmap[type] = icon;
  return icon;
}
