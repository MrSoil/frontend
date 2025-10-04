import React, { useMemo, useState, useCallback } from "react";
import {
TextField,
InputAdornment,
IconButton,
Dialog,
DialogTitle,
DialogContent,
DialogActions,
Button,
Box,
Stack,
ToggleButtonGroup,
ToggleButton,
Tooltip,
Typography,
} from "@mui/material";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import BodyCanvas from "./internal/BodyCanvas";
import { buildMaleDatasetFromLib } from "./internal/datasets/hbrAdapter";
import femaleDataset from "./internal/datasets/femaleDataset";

export const BODY_CODES = {
HEAD: 1,
NECK: 2,
CHEST: 3,
ABDOMEN: 4,
PELVIS: 5,
LEFT_SHOULDER: 6,
RIGHT_SHOULDER: 7,
LEFT_ARM: 8,
RIGHT_ARM: 9,
LEFT_FOREARM: 10,
RIGHT_FOREARM: 11,
LEFT_HAND: 12,
RIGHT_HAND: 13,
LEFT_THIGH: 14,
RIGHT_THIGH: 15,
LEFT_KNEE: 16,
RIGHT_KNEE: 17,
LEFT_SHIN: 18,
RIGHT_SHIN: 19,
LEFT_FOOT: 20,
RIGHT_FOOT: 21,
BACK: 30,
LEFT_SCAPULA: 31,
RIGHT_SCAPULA: 32,
};

// 2) Human-friendly labels (optional)
export const BODY_LABELS = {
HEAD: "Baş",
NECK: "Boyun",
CHEST: "Göğüs",
ABDOMEN: "Karın",
PELVIS: "Pelvis",
LEFT_SHOULDER: "Sol Omuz",
RIGHT_SHOULDER: "Sağ Omuz",
LEFT_ARM: "Sol Kol",
RIGHT_ARM: "Sağ Kol",
LEFT_FOREARM: "Sol Önkol",
RIGHT_FOREARM: "Sağ Önkol",
LEFT_HAND: "Sol El",
RIGHT_HAND: "Sağ El",
LEFT_THIGH: "Sol Uyluk",
RIGHT_THIGH: "Sağ Uyluk",
LEFT_KNEE: "Sol Diz",
RIGHT_KNEE: "Sağ Diz",
LEFT_SHIN: "Sol Alt Bacak",
RIGHT_SHIN: "Sağ Alt Bacak",
LEFT_FOOT: "Sol Ayak",
RIGHT_FOOT: "Sağ Ayak",
BACK: "Sırt",
LEFT_SCAPULA: "Sol Kürek",
RIGHT_SCAPULA: "Sağ Kürek",
};

function normalizeKey(raw) {
if (!raw) return null;
return String(raw).trim().toUpperCase().replace(/[\s-]+/g, "_");
}

/**

Public field component: MUI TextField + dialog picker
Props:
value: number|null (integer body code)
onChange: (number|null) => void
label?: string
initialSex?: 'male'|'female'
initialView?: 'front'|'back' */ export default function HumanBodyHighlighterField({ value, onChange, label = "Vücut Bölgesi", initialSex = "male", initialView = "front", }) {
  const [open, setOpen] = useState(false); const [sex, setSex] = useState(initialSex); // 'male' | 'female'
  const [view, setView] = useState(initialView); // 'front' | 'back'
  const [tempCode, setTempCode] = useState(value ?? null);
// datasets (front/back paths for male/female)
const maleDataset = useMemo(() => buildMaleDatasetFromLib(), []);
const dataset = useMemo(
() => (sex === "female" ? femaleDataset : maleDataset),
[sex, maleDataset]
);

const selectedKey = useMemo(() => {
return Object.keys(BODY_CODES).find((k) => BODY_CODES[k] === tempCode) || null;
}, [tempCode]);

const selectedLabel = selectedKey ? (BODY_LABELS[selectedKey] || selectedKey) : "";

const commit = () => {
onChange?.(tempCode ?? null);
setOpen(false);
};
const clear = () => {
setTempCode(null);
onChange?.(null);
setOpen(false);
};

const handleSelect = useCallback((partKey) => {
const key = normalizeKey(partKey);
if (!key) return;
const code = BODY_CODES[key];
if (code) setTempCode(code);
}, []);

return (
<>
<TextField
label={label}
value={value ?? ""}
placeholder="Bölge seçin"
fullWidth
InputProps={{
readOnly: true,
endAdornment: (
<InputAdornment position="end">
<Tooltip title={selectedLabel || "Bölge seç"}>
<IconButton onClick={() => setOpen(true)}>
<TouchAppIcon />
</IconButton>
</Tooltip>
</InputAdornment>
),
}}
helperText={value ? `Seçili: ${selectedLabel}` : " "}
/>

  <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
    <DialogTitle>Vücut Bölgesi Seç</DialogTitle>
    <DialogContent dividers>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <ToggleButtonGroup
          value={sex}
          exclusive
          onChange={(_, v) => v && setSex(v)}
          size="small"
        >
          <ToggleButton value="male">Erkek</ToggleButton>
          <ToggleButton value="female">Kadın</ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, v) => v && setView(v)}
          size="small"
        >
          <ToggleButton value="front">Ön</ToggleButton>
          <ToggleButton value="back">Arka</ToggleButton>
        </ToggleButtonGroup>

        <Typography variant="body2" sx={{ ml: "auto" }}>
          Seçili: {selectedLabel || "—"}
        </Typography>
      </Stack>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <BodyCanvas
          dataset={dataset}
          view={view}
          selectedKey={selectedKey}
          onSelect={handleSelect}
          // theming
          width={520}
          colors={{
            stroke: "#7E6FA8",
            hover: "#C7BCE3",
            selected: "rgba(166,149,204,0.45)",
            prefill: "rgba(166,149,204,0.25)",
          }}
        />
      </Box>
    </DialogContent>

    <DialogActions>
      <Button color="inherit" onClick={clear}>Temizle</Button>
      <Button color="inherit" onClick={() => setOpen(false)}>İptal</Button>
      <Button variant="contained" onClick={commit} disabled={tempCode == null}>
        Seç
      </Button>
    </DialogActions>
  </Dialog>
</>
);
}