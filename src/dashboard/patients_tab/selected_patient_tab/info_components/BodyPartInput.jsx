import React, { useMemo, useState, useEffect } from "react";
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
Chip,
} from "@mui/material";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import DeleteIcon from "@mui/icons-material/Delete";
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

// Reverse mapping: code -> raw name
const CODE_TO_RAW = useMemo(() => {
const reverse = {};
Object.keys(ZONE_CODE).forEach(key => {
reverse[ZONE_CODE[key]] = key;
});
return reverse;
}, [ZONE_CODE]);

const [open, setOpen] = useState(false);
const [sex, setSex] = useState("male"); // 'male' | 'female'
const [view, setView] = useState("front"); // 'front' | 'back'

// Track selected raw names in dialog (for visual feedback)
const [dialogSelectedRawNames, setDialogSelectedRawNames] = useState(new Set());

// Normalize value to always be an array
const selectedCodes = useMemo(() => {
if (!value) return [];
if (Array.isArray(value)) return value;
// Handle legacy single value format
return [value];
}, [value]);

// Convert selected codes to raw names for dialog
const selectedRawNames = useMemo(() => {
return selectedCodes
  .map(code => CODE_TO_RAW[code])
  .filter(Boolean);
}, [selectedCodes, CODE_TO_RAW]);

// Initialize dialog selections when opened - use a ref to track if we've initialized
const initializedRef = React.useRef(false);

useEffect(() => {
if (open) {
  // Reset initialization flag when dialog opens
  initializedRef.current = false;
  // Set selected parts immediately
  setDialogSelectedRawNames(new Set(selectedRawNames));
  initializedRef.current = true;
} else {
  // Reset when dialog closes
  initializedRef.current = false;
}
}, [open, selectedRawNames]);

// Get labels for selected codes
const selectedLabels = useMemo(() => {
return selectedCodes.map(code => {
const rawName = CODE_TO_RAW[code];
return rawName ? ZONE_LABEL[rawName] : `Bölge ${code}`;
});
}, [selectedCodes, CODE_TO_RAW, ZONE_LABEL]);

// Toggle body part selection - updates immediately
const toggleBodyPart = (rawName) => {
if (!rawName) return;
const code = ZONE_CODE[rawName];
if (!code) return;

// Toggle in dialog state
setDialogSelectedRawNames(prev => {
const newSet = new Set(prev);
if (newSet.has(rawName)) {
  newSet.delete(rawName);
} else {
  newSet.add(rawName);
}
return newSet;
});

// Update parent immediately
const currentCodes = Array.isArray(selectedCodes) ? [...selectedCodes] : [];
if (currentCodes.includes(code)) {
  // Remove
  const newCodes = currentCodes.filter(c => c !== code);
  onChange?.(newCodes.length > 0 ? newCodes : null);
} else {
  // Add
  const newCodes = [...currentCodes, code];
  onChange?.(newCodes.length > 0 ? newCodes : null);
}
};

const removeBodyPart = (codeToRemove) => {
const newCodes = selectedCodes.filter(code => code !== codeToRemove);
onChange?.(newCodes.length > 0 ? newCodes : null);
// Also update dialog state if open
if (open) {
  const rawName = CODE_TO_RAW[codeToRemove];
  if (rawName) {
    setDialogSelectedRawNames(prev => {
      const newSet = new Set(prev);
      newSet.delete(rawName);
      return newSet;
    });
  }
}
};

const clear = () => {
setDialogSelectedRawNames(new Set());
onChange?.(null);
};

const displayText = selectedLabels.length > 0 
  ? `${selectedLabels.length} bölge seçildi`
  : "";

return (
<>
<Box sx={{ width: '100%' }}>
  <TextField
    label={label}
    value={displayText}
    placeholder="Bölge seçin"
    fullWidth
    InputProps={{
      readOnly: true,
      endAdornment: (
        <InputAdornment position="end">
          <Tooltip title="Bölge ekle">
            <IconButton onClick={() => setOpen(true)}>
              <TouchAppIcon />
            </IconButton>
          </Tooltip>
        </InputAdornment>
      ),
    }}
    helperText={selectedLabels.length > 0 ? `${selectedLabels.length} bölge seçildi. Düzenlemek için tıklayın.` : " "}
  />
  
  {selectedLabels.length > 0 && (
    <Box 
      sx={{ 
        mt: 1, 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 1,
        pr: 0.5
      }}
    >
      {selectedCodes.map((code, index) => {
        const rawName = CODE_TO_RAW[code];
        const label = rawName ? ZONE_LABEL[rawName] : `Bölge ${code}`;
        return (
          <Chip
            key={code}
            label={label}
            onDelete={() => removeBodyPart(code)}
            deleteIcon={<DeleteIcon />}
            color="primary"
            variant="outlined"
          />
        );
      })}
    </Box>
  )}
</Box>

  <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
    <DialogTitle>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Vücut Bölgesi Seç</Typography>
        <Typography variant="body2" color="text.secondary">
          {dialogSelectedRawNames.size} bölge seçildi
        </Typography>
      </Stack>
    </DialogTitle>
    <DialogContent dividers>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
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
        </Stack>

        <Box sx={{ display: "flex", justifyContent: "center", minHeight: 400, position: "relative" }}>
          <BodyComponent
            key={`${sex}-${view}-${dialogSelectedRawNames.size}`} // Force re-render when selections change
            onClick={(x) => toggleBodyPart(x)}
            bodyModel={sex}
            // Note: reactjs-human-body library doesn't support showing multiple selected parts visually
            // Selected parts are shown in the chips list below
          />
          {/* Visual indicator overlay - show count of selected parts */}
          {dialogSelectedRawNames.size > 0 && (
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(166, 149, 204, 0.9)",
                color: "white",
                padding: "4px 12px",
                borderRadius: "16px",
                fontSize: "12px",
                fontWeight: 600,
                zIndex: 10,
              }}
            >
              {dialogSelectedRawNames.size} seçili
            </Box>
          )}
        </Box>

        <Box sx={{ mt: 2, minHeight: 60 }}>
          {dialogSelectedRawNames.size > 0 ? (
            <>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Seçili Bölgeler ({dialogSelectedRawNames.size}):
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {Array.from(dialogSelectedRawNames).sort().map((rawName) => {
                  const code = ZONE_CODE[rawName];
                  const label = ZONE_LABEL[rawName];
                  return (
                    <Chip
                      key={rawName}
                      label={label}
                      onDelete={() => {
                        if (code) {
                          toggleBodyPart(rawName);
                        }
                      }}
                      deleteIcon={<DeleteIcon />}
                      color="primary"
                      variant="filled"
                      size="small"
                      sx={{
                        backgroundColor: "#A695CC",
                        color: "white",
                        '&:hover': {
                          backgroundColor: "#8B7BA8",
                        }
                      }}
                    />
                  );
                })}
              </Box>
            </>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
              Henüz bölge seçilmedi. Vücut üzerinde tıklayarak bölge seçebilirsiniz.
            </Typography>
          )}
        </Box>
      </Stack>
    </DialogContent>

    <DialogActions>
      <Button color="inherit" onClick={clear}>
        Tümünü Temizle
      </Button>
      <Button variant="contained" onClick={() => setOpen(false)}>
        Tamam
      </Button>
    </DialogActions>
  </Dialog>
</>
);
}