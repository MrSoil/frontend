// BodyHighlighter/internal/datasets/femaleDataset.js
/**

Female dataset
Professional, unified approach: same renderer, separate dataset.
Replace the path "d" strings below with precisely traced female front/back anatomy paths.
For now, this file mirrors a minimal subset (HEAD/NECK/CHEST/ABDOMEN/PELVIS + limbs)
using smooth paths. You should refine these with exact vectors from your design team. */
const viewBox = { w: 600, h: 900 };

// Utility to round-rect as path (for smoother look than <rect>)
function rr(x, y, w, h, r) {
const right = x + w;
const bottom = y + h;
return [
`M${x + r},${y}`,
`H${right - r}`,
`Q${right},${y} ${right},${y + r}`,
`V${bottom - r}`,
`Q${right},${bottom} ${right - r},${bottom}`,
`H${x + r}`,
`Q${x},${bottom} ${x},${bottom - r}`,
`V${y + r}`,
`Q${x},${y} ${x + r},${y}`,
"Z",
].join(" ");
}

// Minimal, elegant female front/back paths (replace with art-accurate ones)
const front = [
{ key: "HEAD", label: "Baş", d: "M300,32 a52,63 0 1,0 0.1,0 Z" },
{ key: "NECK", label: "Boyun", d: rr(270, 150, 60, 30, 10) },
{ key: "CHEST", label: "Göğüs", d: rr(225, 185, 150, 115, 20) },
{ key: "ABDOMEN", label: "Karın", d: rr(235, 302, 130, 95, 16) },
{ key: "PELVIS", label: "Pelvis", d: rr(245, 400, 110, 72, 14) },

{ key: "LEFT_SHOULDER", label: "Sol Omuz", d: rr(195, 190, 46, 46, 14) },
{ key: "RIGHT_SHOULDER", label: "Sağ Omuz", d: rr(359, 190, 46, 46, 14) },

{ key: "LEFT_ARM", label: "Sol Kol", d: rr(178, 230, 40, 118, 16) },
{ key: "RIGHT_ARM", label: "Sağ Kol", d: rr(382, 230, 40, 118, 16) },

{ key: "LEFT_FOREARM", label: "Sol Önkol", d: rr(173, 348, 36, 100, 12) },
{ key: "RIGHT_FOREARM", label: "Sağ Önkol", d: rr(387, 348, 36, 100, 12) },

{ key: "LEFT_HAND", label: "Sol El", d: "M191,435 a22,20 0 1,0 0.1,0 Z" },
{ key: "RIGHT_HAND", label: "Sağ El", d: "M409,435 a22,20 0 1,0 0.1,0 Z" },

{ key: "LEFT_THIGH", label: "Sol Uyluk", d: rr(258, 470, 72, 160, 18) },
{ key: "RIGHT_THIGH", label: "Sağ Uyluk", d: rr(330, 470, 72, 160, 18) },

{ key: "LEFT_KNEE", label: "Sol Diz", d: rr(258, 630, 72, 24, 8) },
{ key: "RIGHT_KNEE", label: "Sağ Diz", d: rr(330, 630, 72, 24, 8) },

{ key: "LEFT_SHIN", label: "Sol Alt Bacak", d: rr(260, 656, 68, 120, 14) },
{ key: "RIGHT_SHIN", label: "Sağ Alt Bacak", d: rr(332, 656, 68, 120, 14) },

{ key: "LEFT_FOOT", label: "Sol Ayak", d: "M295,795 a40,22 0 1,0 0.1,0 Z" },
{ key: "RIGHT_FOOT", label: "Sağ Ayak", d: "M365,795 a40,22 0 1,0 0.1,0 Z" },
];

const back = [
{ key: "BACK", label: "Sırt", d: rr(230, 210, 140, 220, 20) },
{ key: "LEFT_SCAPULA", label: "Sol Kürek", d: "M262,230 a26,20 0 1,0 0.1,0 Z" },
{ key: "RIGHT_SCAPULA", label: "Sağ Kürek", d: "M338,230 a26,20 0 1,0 0.1,0 Z" },

{ key: "LEFT_THIGH", label: "Sol Uyluk", d: rr(258, 470, 72, 160, 18) },
{ key: "RIGHT_THIGH", label: "Sağ Uyluk", d: rr(330, 470, 72, 160, 18) },

{ key: "LEFT_SHIN", label: "Sol Alt Bacak", d: rr(260, 656, 68, 120, 14) },
{ key: "RIGHT_SHIN", label: "Sağ Alt Bacak", d: rr(332, 656, 68, 120, 14) },

{ key: "LEFT_FOOT", label: "Sol Ayak", d: "M295,795 a40,22 0 1,0 0.1,0 Z" },
{ key: "RIGHT_FOOT", label: "Sağ Ayak", d: "M365,795 a40,22 0 1,0 0.1,0 Z" },
];

const femaleDataset = { viewBox, front, back };
export default femaleDataset;