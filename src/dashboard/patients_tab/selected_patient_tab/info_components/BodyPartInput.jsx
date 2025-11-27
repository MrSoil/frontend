import React, { useMemo, useState } from "react";
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
import { BodyComponent } from 'reactjs-human-body';

export default function BodyPartInput({ label = "Vücut Bölgesi", value, onChange }) {
// Map normalized zone groups -> integer codes you use in backend
// Adjust codes to your needs.
const ZONE_CODE = useMemo(
() => ({
head: 1,
chest: 2,
leftArm: 3,
leftFoot: 4,
leftHand: 5,
leftLeg: 6,
leftShoulder: 7,
rightArm: 8,
rightFoot: 9,
rightHand: 10,
rightLeg: 11,
rightShoulder: 12,
stomach: 13
}),
[]
);

const ZONE_LABEL = useMemo(
() => ({
head: "Kafa Bölgesi",
chest: "Göğüs Bölgesi",
leftArm: "Sol Kol Bölgesi",
leftFoot: "Sol Ayak Bölgesi",
leftHand: "Sol El Bölgesi",
leftLeg: "Sol Bacak Bölgesi",
leftShoulder: "Sol Omuz Bölgesi",
rightArm: "Sağ Kol Bölgesi",
rightFoot: "Sağ Ayak Bölgesi",
rightHand: "Sağ El Bölgesi",
rightLeg: "Sağ Bacak Bölgesi",
rightShoulder: "Sağ Omuz Bölgesi",
stomach: "Karın Bölgesi"
}),
[]
);

const [open, setOpen] = useState(false);
const [sex, setSex] = useState("male"); // 'male' | 'female'
const [view, setView] = useState("front"); // 'front' | 'back'

// Store the last clicked raw name from the library so we can highlight that specific shape
const [tempRawName, setTempRawName] = useState(null);
const selectedLabel = value ? ZONE_LABEL[value] : "";

const commit = () => {
if (!tempRawName) return;
const code = ZONE_CODE[tempRawName];
onChange?.(code);
setOpen(false);
};

const clear = () => {
setTempRawName(null);
onChange?.(null);
};

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
helperText={tempRawName ? `Seçili: ${ZONE_LABEL[tempRawName]}` : " "}
/>

  <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
    <DialogTitle>Vücut Bölgesi Seç</DialogTitle>
    <DialogContent dividers>
      <BodyComponent
            // onChange={onChange}
            onClick={(x) => setTempRawName(x)}
            bodyModel={sex}
        />
    </DialogContent>

    <DialogActions>
      <Button color="inherit" onClick={clear}>
        Temizle
      </Button>
      <Button color="inherit" onClick={() => setOpen(false)}>
        İptal
      </Button>
      <Button variant="contained" onClick={commit} disabled={!tempRawName}>
        Seç
      </Button>
    </DialogActions>
  </Dialog>
</>
);
}