import L from 'leaflet';
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

export default function getIcon(type: string | undefined, size: number) {
  const icon = L.divIcon({
    className: 'custom-icon',
    html: type ? SVG(dataTypeToSVG[type], size, dataTypeToColor[type]) : SVG(null, size, 'blue'),
    iconSize: [0, 0],
    popupAnchor: [0, -(3 * size / 4)],
  });

  return icon;
}
