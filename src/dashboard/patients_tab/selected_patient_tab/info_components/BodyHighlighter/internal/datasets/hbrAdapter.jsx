// BodyHighlighter/internal/datasets/hbrAdapter.js
import { PARTS_GROUPS, SVG_PARTS } from "@darshanpatel2608/human-body-react";

/**

Adapter that converts @darshanpatel2608/human-body-react exports
into a normalized dataset the BodyCanvas can render.
If your installed version uses different keys, adjust resolveGroup/resolvePath. */
function resolveGroup(name) {
// Try common variants
const g =
PARTS_GROUPS?.[name] ||
PARTS_GROUPS?.[name?.toUpperCase?.()] ||
PARTS_GROUPS?.[name?.toLowerCase?.()];
return Array.isArray(g) ? g : [];
}

function resolvePath(key) {
const part = SVG_PARTS?.[key] || SVG_PARTS?.[key?.toUpperCase?.()] || SVG_PARTS?.[key?.toLowerCase?.()];
if (!part) return null;
// Compatible with shapes that might be in { d } or direct path string
if (typeof part === "string") return part;
if (typeof part?.d === "string") return part.d;
return null;
}

export function buildMaleDatasetFromLib() {
// Coords in the lib are typically normalized to a consistent viewBox
const viewBox = { w: 600, h: 900 };

const frontKeys = resolveGroup("FRONT");
const backKeys = resolveGroup("BACK");

const front = frontKeys
.map((key) => ({ key, label: key, d: resolvePath(key) }))
.filter((s) => !!s.d);

const back = backKeys
.map((key) => ({ key, label: key, d: resolvePath(key) }))
.filter((s) => !!s.d);

return { viewBox, front, back };
}