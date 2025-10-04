import React, { useMemo } from "react";
import PropTypes from "prop-types";

/**

BodyCanvas
Renders one side (front/back) from a dataset of vector paths.
dataset shape:
{
viewBox: { w: number, h: number },
front: Array<{ key, label, d }>,
back: Array<{ key, label, d }>
} */ export default function BodyCanvas({ dataset, view = "front", selectedKey, onSelect, width = 520, colors = { stroke: "#7E6FA8", hover: "#C7BCE3", selected: "rgba(166,149,204,0.45)", prefill: "rgba(166,149,204,0.25)", }, }) { const { viewBox, front, back } = dataset || {}; const shapes = view === "back" ? back : front;
const vb = useMemo(() => {
const w = viewBox?.w || 600;
const h = viewBox?.h || 900;
return `0 0 ${w} ${h}`;
}, [viewBox]);

return (
<svg
viewBox={vb}
width="100%"
style={{ maxWidth: width, display: "block" }}
role="img"
aria-label={`Human body ${view}`}
>
{Array.isArray(shapes) &&
shapes.map((s) => {
const active = selectedKey === s.key;
return (
<path
key={s.key}
d={s.d}
fill={active ? colors.selected : "transparent"}
stroke={colors.stroke}
strokeWidth={active ? 2 : 1}
style={{ cursor: "pointer", transition: "fill .15s ease, stroke .15s ease" }}
onClick={() => onSelect?.(s.key)}
onMouseEnter={(e) => {
if (!active) e.currentTarget.style.fill = colors.prefill;
}}
onMouseLeave={(e) => {
if (!active) e.currentTarget.style.fill = "transparent";
}}
/>
);
})}
</svg>
);
}

BodyCanvas.propTypes = {
dataset: PropTypes.shape({
viewBox: PropTypes.shape({ w: PropTypes.number, h: PropTypes.number }),
front: PropTypes.arrayOf(
PropTypes.shape({ key: PropTypes.string, label: PropTypes.string, d: PropTypes.string })
),
back: PropTypes.arrayOf(
PropTypes.shape({ key: PropTypes.string, label: PropTypes.string, d: PropTypes.string })
),
}),
view: PropTypes.oneOf(["front", "back"]),
selectedKey: PropTypes.string,
onSelect: PropTypes.func,
width: PropTypes.number,
colors: PropTypes.object,
};

