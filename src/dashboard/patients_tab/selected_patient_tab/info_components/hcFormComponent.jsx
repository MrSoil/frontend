import * as React from "react";
import './hc_form_component.css'
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react';
import {
Icon, Typography, Button, IconButton, Checkbox, FormControlLabel, TextField, FormControl, Select, MenuItem, Box, Accordion, AccordionSummary, AccordionDetails, Dialog, DialogTitle, DialogContent, DialogActions, Tooltip, Chip, Stack,
} from '@mui/material';
import Close from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import BodyPartInput from "./BodyPartInput";



Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

function getTodayForDjango() {
  const today = new Date();
  return today.toString();
}

function reformatDjangoDate(djangoDateString) {
  const d = new Date(djangoDateString);

  // pull out zero-padded components
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yy = String(d.getFullYear() % 100).padStart(2, '0');

  return `${dd}-${mm}-${yy}`;
}

function PatientNotes({ note }) {
    let date = note["note_date"]
    let title = note["note_title"]
    let data = note["note_data"]
  return (
    <article className="note">
      <time className="note-date" style={{margin: 0}}>{date}</time>
      <h4>
        {title}
      </h4>
      <p className="note-data" style={{margin: 0}}>{data}</p>
    </article>
  );
}

function HCForm({ selectedPatient, setSelectedPatient, setNewHCContainer, hcDate }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [bodyCode, setBodyCode] = useState(null);


  const [expandedCol1, setExpandedCol1] = useState(false); // 'hygiene' | 'meal' | 'posture' | false
  const [expandedCol2, setExpandedCol2] = useState(false); // 'dressing' | 'edema' | 'security' | 'urine' | false

  const handleChangeCol1 = (panel) => (event, isExpanded) => {
  setExpandedCol1(isExpanded ? panel : false);
  };
  const handleChangeCol2 = (panel) => (event, isExpanded) => {
  setExpandedCol2(isExpanded ? panel : false);
  };
  const onCancelCareClick = () => {
      setNewHCContainer(false)
  }

  let hygieneCheckDailyMap = {
    mouthCare: "Ağız Bakımı/Dişlerin Temizliği",
    handFaceCare: "El-Yüz Temizliği",
    earNoseCare: "Burun-Kulak Temizliği",
    bottomCare: "Alt Bakımı",
    bodyCare: "Vücut  Muayenesi Kontrolü",
    rashCare: "Yara/Kızarıklık vb. kontrolü",
    moistureCare: "Cildi Nemlendirme",
  }
  let hygieneCheckWeeklyMap = {
    bathCare: "Banyo Yaptırılması",
    handFootCare: "El ve Ayak Tırnaklarının Kesilmesi",
    bodyHairCare: "İstenmeyen Tüylerin Temizliği",
    hairCare: "Saç-Sakal Tıraşının Yapılması",
    bedBathCare: "Yatak Banyosu/Vücut Silme/Yatakta Saç Yıkama",
    bedSheetCare: "Yatak Takımlarının Değiştirilmesi",
  }
  let mealCheckMap = {
    breakfastCare: "Kahvaltı",
    lunchCare: "Öğle Yemeği",
    midCare: "Ara Öğün",
    dinnerCare: "Akşam Yemeği",
    liquidCare: "Su ve Diğer Sıvı Alımı",
  }
  let postureCheckMap = {
    walkable: "Mobil/Yürüyen Misafir",
  }
  let dressingCheckMap = {
    isInjured: "Bası Yarası var mı?",
    stage: "Kaçıncı Evre?",
    dailyDressing: "Günlük Bası Yarası Pansumanı Yapıldı mı?",
    needDressing: "Pansuman gerektiren bir durum var mı?",
    isDressed: "Pansuman Yapıldı mı?",
    catheter: "Katater Bakımı Yapıldı mı?"
  }
  let edemaCheckMap = {
    liquidCheck: "Sıvı takibi yapıldı mı?"
  }
  let securityCheckMap = {
    reason1: "Yerde takılacağı kablo vs. herhangi bir şey var mı? Giymiş olduğu terlik ve oda zemini güvenli mi?",
    reason2: "Hemşire çağrı zilinin kullanıldı mı?",
    reason3: "Gözlük kullanıyor ise erişebileceği bir yere konuldu mu?",
    reason4: "Kenarlık koruması gerekli mi?",
    reason5: "Düşme riski oluştu mu?"
  }
  let urineCheckMap = {
    urine:  "İdrar Çıkışı (ml):",
    stool: "Gaita Çıkışı Var mı?"
  }

  const dict_key = reformatDjangoDate(hcDate)

  const [isLoading, setIsLoading] = useState(true);

  const [ hcType, setHcType ] = useState("day")

  const [hygieneCheckDaily, setHygieneCheckDaily] = useState({
    mouthCare: false,
    handFaceCare: false,
    earNoseCare: false,
    bottomCare: false,
    bodyCare: false,
    rashCare: false,
    moistureCare: false,
  });

  const [hygieneCheckWeekly, setHygieneCheckWeekly] = useState({
    bathCare: false,
    handFootCare: false,
    bodyHairCare:  false,
    hairCare:  false,
    bedBathCare:  false,
    bedSheetCare:  false,
  });

  const [mealCheck, setMealCheck] = useState({
    breakfastCare: false,
    lunchCare: false,
    midCare: false,
    dinnerCare: false,
    liquidCare: false,
  });

  const [postureCheck, setPostureCheck] = useState({
    walkable: false,
  });

  const [dressingCheck, setDressingCheck] = useState({
    isInjured: false,
    stage: 1,
    dailyDressing: false,
    needDressing: false,
    isDressed: false,
    catheter: false
  });

  const [edemaCheck, setEdemaCheck] = useState({
    liquidCheck: false,
    injuredParts: []
  });

  const [securityCheck, setSecurityCheck] = useState({
    reason1: false,
    reason2: false,
    reason3: false,
    reason4: false,
    reason5: false
  });

  const [urineCheck, setUrineCheck] = useState({
    urine: 0,
    stool: false
  });

  const [roomChecks, setRoomChecks] = useState(
    new Array(12).fill(false)
  );

  const [feedingNote, setFeedingNote] = useState('');
  const [selectedNote, setSelectedNote] = useState('');

  const [oldNotes, setOldNotes] = useState([
    // {
    //   note_date: "15.09.23",
    //   note_title: "Test1",
    //   note_data: "",
    // }
    ])

  const bodyMapping = ["Kafa Bölgesi", "Göğüs Bölgesi", "Sol Kol Bölgesi", "Sol Ayak Bölgesi", "Sol El Bölgesi",
    "Sol Bacak Bölgesi", "Sol Omuz Bölgesi", "Sağ Kol Bölgesi", "Sağ Ayak Bölgesi", "Sağ El Bölgesi",
    "Sağ Bacak Bölgesi", "Sağ Omuz Bölgesi", "Karın Bölgesi"]

  const addInjuredPart = () => {
    if (bodyCode == null || bodyCode === "") return;
    setEdemaCheck(prev => {
    const list = Array.isArray(prev.injuredParts) ? prev.injuredParts : [];
    if (list.includes(bodyCode)) return prev; // avoid duplicates
    return { ...prev, injuredParts: [...list, bodyCode] };
    });
    setBodyCode(null);
  };

  const removeInjuredPart = (code) => {
    setEdemaCheck(prev => ({
    ...prev,
    injuredParts: (prev.injuredParts || []).filter(c => c !== code)
    }));
  };

  const removeLastInjuredPart = () => {
    setEdemaCheck(prev => {
    const list = prev.injuredParts || [];
    if (!list.length) return prev;
    return { ...prev, injuredParts: list.slice(0, -1) };
    });
  };

  const toggleList = (key, key_list, key_function) => {
    key_function({
      ...key_list,
      [key]: !key_list[key],
    });
  };

  const toggleRoomCheck = (index) => {
    setRoomChecks(roomChecks.map((check, i) =>
      i === index ? !check : check
    ));
  };
  const handleToggleHcType = () => {
    const nextMode = hcType === "day" ? "night" : "day";

    setHcType(nextMode);
    setIsLoading(true)
    updateSelectedPatient(user.email, nextMode)
  };
  const submitSignedHC = () => {
    const hcs = selectedPatient["patient_signed_hc"];
    let payload = {}
    if (dict_key in hcs && hcType in hcs[dict_key]) {
      payload = {
        "patient_id": selectedPatient["patient_id"],
        "email": user.email,
        "type": "update_signed_hc",
        "signed_hc_id": hcs[dict_key][hcType].at(-1)["signed_hc_id"],
        "signed_hc_type": hcType,
        "today_date": getTodayForDjango()
      }
    }
    else {
      payload = {
        "patient_id": selectedPatient["patient_id"],
        "email": user.email,
        "type": "add_signed_hc",
        "signed_hc_type": hcType,
        "today_date": getTodayForDjango()
      }
    }
    payload["signed_hc_data"] = {
      "hygieneCheckDaily": hygieneCheckDaily,
      "hygieneCheckWeekly": hygieneCheckWeekly,
      "mealCheck": mealCheck,
      "postureCheck": postureCheck,
      "dressingCheck": dressingCheck,
      "edemaCheck": edemaCheck,
      "securityCheck": securityCheck,
      "urineCheck": urineCheck,
      "roomChecks": roomChecks
    }
    // setTakenMeds(prev => new Set([...prev, ...selectedGivenMeds]));
    // setSelectedGivenMeds(new Set());

    fetch("http://localhost:8000/api/patients/", {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      })
      .then(r => r.json())
      .then(() => {
      })
      .catch(console.error);
  };

  const updateSelectedPatient = (email, hc_type) => {
    setIsLoading(true);
    fetch(`http://localhost:8000/api/patients/?email=${email}&patient_id=${selectedPatient.patient_id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(resp => {
      // Assuming the backend sends back a JSON response indicating success or failure
      if (resp.status === "success") {
        const selectedPatientNew = resp.data[0];
        if (selectedPatient !== selectedPatientNew){
          setSelectedPatient(selectedPatientNew);
        }
        const hcs = selectedPatientNew["patient_signed_hc"];

        if (dict_key in hcs && hc_type in hcs[dict_key]) {
           let hc = hcs[dict_key][hc_type].at(-1)["signed_hc_data"];
           setHygieneCheckDaily(hc["hygieneCheckDaily"])
           setHygieneCheckWeekly(hc["hygieneCheckWeekly"])
           setMealCheck(hc["mealCheck"])
           setPostureCheck(hc["postureCheck"])
           setDressingCheck(hc["dressingCheck"])
           setEdemaCheck(hc["edemaCheck"])
           setSecurityCheck(hc["securityCheck"])
           setUrineCheck(hc["urineCheck"])
           setRoomChecks(hc["roomChecks"])
        }
        else {
          setHygieneCheckDaily({
            mouthCare: false,
            handFaceCare: false,
            earNoseCare: false,
            bottomCare: false,
            bodyCare: false,
            rashCare: false,
            moistureCare: false,
          })
          setHygieneCheckWeekly({
            bathCare: false,
            handFootCare: false,
            bodyHairCare:  false,
            hairCare:  false,
            bedBathCare:  false,
            bedSheetCare:  false,
          })
          setMealCheck({
            breakfastCare: false,
            lunchCare: false,
            midCare: false,
            dinnerCare: false,
            liquidCare: false,
          })
          setPostureCheck({
            walkable: false,
          })
          setDressingCheck({
            isInjured: false,
            stage: 1,
            dailyDressing: false,
            needDressing: false,
            isDressed: false,
            catheter: false
          })
          setEdemaCheck({
            liquidCheck: false,
            injuredParts: []
          })
          setSecurityCheck({
            reason1: false,
            reason2: false,
            reason3: false,
            reason4: false,
            reason5: false
          })
          setUrineCheck({
            urine: 0,
            stool: false
          })
          setRoomChecks(
              new Array(12).fill(false)
          )
        }
        setIsLoading(false);
      }
    }
    )
  };

  useEffect(() => {
      updateSelectedPatient(user.email, hcType)
    }, [user.email]);

  if (isLoading) {
    return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
  }
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var mydate = new Date();

  return (

<div className="blackout-container">
  <div className="blackout"></div>
  <div className="blackout-care-page-container">
    <div className="care-page">
      <div className="content">
        <div className="headerHC">
          <Typography className="TypographyHC" variant="h5">Bakım - Aktif Yaşam</Typography>
          <Button className="TypographyHC" onClick={handleToggleHcType} aria-pressed={hcType === "night"} variant="outlined" size="small" >
            {hcType === "day" ? "Gündüz Raporu" : "Gece Raporu"}
            {hcType === "day" ? <LightModeIcon style={{"marginLeft": "10px"}}/> : <NightlightIcon style={{"marginLeft": "10px"}}/>}
          </Button>

        </div>
      <div className="headerHC" style={{ justifyContent: "center" }}>
        <Typography className="TypographyHC" variant="h6">
          {selectedPatient.patient_personal_info.section_1.firstname.capitalize()}{" "}
          {selectedPatient.patient_personal_info.section_1.lastname.capitalize()}
        </Typography>
      </div>

      <div className="headerHC" style={{ justifyContent: "right" }}>
        <Typography className="TypographyHC" variant="h5">{mydate.toLocaleString(options)}</Typography>
        <IconButton
          className="close-button"
          aria-label="Close alert"
          type="button"
          onClick={onCancelCareClick}
          sx={{ border: "none", backgroundColor: "inherit", cursor: "pointer", m: 0, ml: 0.5, mt: "-2px" }}
        >
          <Close />
        </IconButton>
      </div>
    </div>

    <div className="divider"></div>

    <div className="content">
      <div className="care-column"> {/* Hijyen Gereksinimleri */}
        <Accordion expanded={expandedCol1 === 'hygiene'} onChange={handleChangeCol1('hygiene')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="TypographyHC" variant="h6">Hijyen Gereksinimleri</Typography>
          </AccordionSummary>
          <AccordionDetails className="AccordionDetails">
            <Typography className="TypographyHC" variant="subtitle1">Günlük Gereksinimler</Typography>
            <div className="divider-low-margin"></div>
            <Box>
              {Object.keys(hygieneCheckDaily).map((key) => (
                  <div className="each-point" key={key}>
                    <FormControlLabel label={hygieneCheckDailyMap[key]} control={
                      <Checkbox
                          style={{"marginLeft": "15px"}}
                          icon={<PlaylistAddRoundedIcon />}
                          checkedIcon={<PlaylistAddCheckCircleIcon />}
                          checked={hygieneCheckDaily[key]}
                          onChange={() => toggleList(key, hygieneCheckDaily, setHygieneCheckDaily)} /> }
                       />
                  </div> ))}
            </Box>
          <Box mt={2}>
            <Typography className="TypographyHC" variant="subtitle1">Haftalık Gereksinimler</Typography>
            <div className="divider-low-margin"></div>
            {Object.keys(hygieneCheckWeekly).map((key) => (
              <div className="each-point" key={key}>
                <FormControlLabel
                  control={
                    <Checkbox
                        style={{"marginLeft": "15px"}}
                        icon={<PlaylistAddRoundedIcon />}
                        checkedIcon={<PlaylistAddCheckCircleIcon />}
                      checked={hygieneCheckWeekly[key]}
                      onChange={() => toggleList(key, hygieneCheckWeekly, setHygieneCheckWeekly)}
                    />
                  }
                  label={hygieneCheckWeeklyMap[key]}
                />
              </div>
            ))}
          </Box>
          </AccordionDetails></Accordion>
        <Accordion expanded={expandedCol1 === 'meal'} onChange={handleChangeCol1('meal')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className="TypographyHC" variant="h6">Beslenme Takibi</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div className="divider-low-margin"></div>
        {Object.keys(mealCheck).map((key) => (
        <div className="each-point" key={key}>
        <FormControlLabel
        control={
        <Checkbox
        style={{"marginLeft": "15px"}}
        icon={<PlaylistAddRoundedIcon />}
        checkedIcon={<PlaylistAddCheckCircleIcon />}
        checked={mealCheck[key]}
        onChange={() => toggleList(key, mealCheck, setMealCheck)}
        />
        }
        label={mealCheckMap[key]}
        />
        </div>
        ))}
        </AccordionDetails>
        </Accordion>
        <Accordion expanded={expandedCol1 === 'posture'} onChange={handleChangeCol1('posture')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className="TypographyHC" variant="h6">Pozisyon Takibi</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div className="divider-low-margin"></div>
        {Object.keys(postureCheck).map((key) => (
        <div className="each-point" key={key}>
        <FormControlLabel
        control={
        <Checkbox
        style={{"marginLeft": "15px"}}
        icon={<PlaylistAddRoundedIcon />}
        checkedIcon={<PlaylistAddCheckCircleIcon />}
        checked={postureCheck[key]}
        onChange={() => toggleList(key, postureCheck, setPostureCheck)}
        />
        }
        label={postureCheckMap[key]}
        />
        </div>
        ))}
        </AccordionDetails>
        </Accordion>
      </div>

      <div className="care-column"> {/* Pansuman ve Katater Bakımı */}
        <Accordion expanded={expandedCol2 === 'dressing'} onChange={handleChangeCol2('dressing')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="TypographyHC" variant="h6">Pansuman ve Katater Bakımı</Typography>
          </AccordionSummary>
         <AccordionDetails> <div className="divider-low-margin"></div> {Object.keys(dressingCheck).map((key) => ( <div className="each-point" key={key}> {key === 'stage' ? ( <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}> <Typography className="TypographyHC" variant="body1"> {dressingCheckMap[key]} </Typography> <FormControl size="small" sx={{ minWidth: 140 }}> <InputLabel id="stage-label">Evre</InputLabel> <Select labelId="stage-label" id="stage-select" label="Evre" value={Number(dressingCheck.stage) ?? 1} onChange={(e) => setDressingCheck((prev) => ({ ...prev, stage: Number(e.target.value) })) } > <MenuItem value={1}>Evre I</MenuItem> <MenuItem value={2}>Evre II</MenuItem> <MenuItem value={3}>Evre III</MenuItem> <MenuItem value={4}>Evre IV</MenuItem> </Select> </FormControl> </Box> ) : ( <FormControlLabel control={ <Checkbox style={{ marginLeft: '15px' }} icon={<PlaylistAddRoundedIcon />} checkedIcon={<PlaylistAddCheckCircleIcon />} checked={dressingCheck[key]} onChange={() => toggleList(key, dressingCheck, setDressingCheck)} /> } label={dressingCheckMap[key]} /> )} </div> ))} </AccordionDetails>
        </Accordion>
        <Accordion expanded={expandedCol2 === 'edema'} onChange={handleChangeCol2('edema')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="TypographyHC" variant="h6">Ödem Takibi</Typography>
          </AccordionSummary>
          <AccordionDetails> <div className="divider-low-margin"></div>
            {/* Sıvı takibi checkbox (existing) */}

            <div className="each-point"> <FormControlLabel control={ <Checkbox style={{ marginLeft: "15px" }} icon={<PlaylistAddRoundedIcon />} checkedIcon={<PlaylistAddCheckCircleIcon />} checked={!!edemaCheck.liquidCheck} onChange={() => setEdemaCheck(prev => ({ ...prev, liquidCheck: !prev.liquidCheck })) } /> } label={edemaCheckMap.liquidCheck} /> </div>
            {/* Yeni: Yaralı bölge seçimi + liste */}
            <Box sx={{ mt: 1 }}>
            <BodyPartInput value={bodyCode} onChange={setBodyCode} />
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={addInjuredPart}
                disabled={bodyCode == null}
              >
                Ekle
              </Button>
              <Button
                variant="text"
                size="small"
                color="error"
                onClick={removeLastInjuredPart}
                disabled={!edemaCheck.injuredParts || edemaCheck.injuredParts.length === 0}
              >
                Sonuncuyu Sil
              </Button>
            </Stack>

            {/* Mini container: scrollable list of selected parts */}
            <Box
              sx={{
                mt: 1,
                maxHeight: 120,
                overflowY: "auto",
                border: "1px solid #eee",
                borderRadius: 1,
                p: 1,
              }}
            >
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {(edemaCheck.injuredParts || []).map((code) => (
                  <Chip
                    key={code}
                    label={`Bölge: ${bodyMapping[code-1]}`}
                    onDelete={() => removeInjuredPart(code)}
                    size="small"
                  />
                ))}
              </Stack>
            </Box>
            </Box>
          </AccordionDetails>
          {/*<AccordionDetails>*/}
          {/*  <div className="divider-low-margin"></div>*/}
          {/*  {Object.keys(edemaCheck).map((key) => (*/}
          {/*  <div className="each-point" key={key}>*/}
          {/*  <FormControlLabel*/}
          {/*  control={*/}
          {/*  <Checkbox*/}
          {/*  style={{"marginLeft": "15px"}}*/}
          {/*  icon={<PlaylistAddRoundedIcon />}*/}
          {/*  checkedIcon={<PlaylistAddCheckCircleIcon />}*/}
          {/*  checked={edemaCheck[key]}*/}
          {/*  onChange={() => toggleList(key, edemaCheck, setEdemaCheck)}*/}
          {/*  />*/}
          {/*  }*/}
          {/*  label={edemaCheckMap[key]}*/}
          {/*  />*/}
          {/*  </div>*/}
          {/*  ))}*/}
          {/*  <BodyPartInput value={bodyCode} onChange={setBodyCode} />*/}
          {/*</AccordionDetails>*/}
        </Accordion>

        {/* Misafir Güvenliği */}
        <Accordion expanded={expandedCol2 === 'security'} onChange={handleChangeCol2('security')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className="TypographyHC" variant="h6">Misafir Güvenliği</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div className="divider-low-margin"></div>
        {Object.keys(securityCheck).map((key) => (
        <div className="each-point" key={key}>
        <FormControlLabel
        control={
        <Checkbox
        style={{"marginLeft": "15px"}}
        icon={<PlaylistAddRoundedIcon />}
        checkedIcon={<PlaylistAddCheckCircleIcon />}
        checked={securityCheck[key]}
        onChange={() => toggleList(key, securityCheck, setSecurityCheck)}
        />
        }
        label={securityCheckMap[key]}
        />
        </div>
        ))}
        </AccordionDetails>
        </Accordion>

        {/* İdrar ve Gaita Takibi */}
        <Accordion expanded={expandedCol2 === 'urine'} onChange={handleChangeCol2('urine')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className="TypographyHC" variant="h6">İdrar ve Gaita Takibi</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div className="divider-low-margin"></div>
        {Object.keys(urineCheck).map((key) => (

<div className="each-point" key={key}> {key === 'urine' ? (
    <><InputLabel style={{"alignContent": "center"}} htmlFor="outlined-adornment-idrar">{urineCheckMap[key]}</InputLabel>
    <OutlinedInput
                  id="outlined-adornment-idrar"
                  type="number" step="0.01"
                  size="small"
                  endAdornment={<InputAdornment position="end">ml</InputAdornment>}
                  value={urineCheck.urine}
                  onChange={(e) => setUrineCheck({ ...urineCheck, urine: e.target.value })}
                /></> )
    : ( <FormControlLabel control={ <Checkbox style={{"marginLeft": "15px"}}
                    icon={<PlaylistAddRoundedIcon />}
                    checkedIcon={<PlaylistAddCheckCircleIcon />} checked={urineCheck[key]} onChange={() => setUrineCheck({ ...urineCheck, [key]: !urineCheck[key] }) } /> } label={urineCheckMap[key]} /> )} </div> ))}
        </AccordionDetails>
        </Accordion>

      </div>

      <div>
        <div className="half-care-column">
          <Typography className="TypographyHC" variant="h6">Bakım Notları</Typography>
          <div className="divider"></div>

          <div className="care-notes">
            {oldNotes.map((note, index) => (
              <PatientNotes className="care-note" key={index} note={note} />
            ))}
          </div>

          <div className="divider"></div>
          <Typography className="TypographyHC" variant="subtitle1" sx={{ mt: 1 }}>
            Konu Başlığı
          </Typography>
          <Typography className="TypographyHC" variant="subtitle1" sx={{ mb: "10px" }}>
            <FormControl size="small">
              <Select
                className="TypographyHC"
                value={selectedNote || ""}
                onChange={(e) => setSelectedNote(e.target.value)}
              >
                <MenuItem value="Hijyen Gereksinimleri">Hijyen Gereksinimleri</MenuItem>
                <MenuItem value="Beslenme Takibi">Beslenme Takibi</MenuItem>
                <MenuItem value="Pozisyon Takibi">Pozisyon Takibi</MenuItem>
                <MenuItem value="Pansuman ve Katater Bakımı">Pansuman ve Katater Bakımı</MenuItem>
                <MenuItem value="Ödem Takibi">Ödem Takibi</MenuItem>
                <MenuItem value="Misafir Güvenliği">Misafir Güvenliği</MenuItem>
              </Select>
            </FormControl>
          </Typography>

          <TextField
            placeholder="Notunuzu giriniz..."
            value={feedingNote}
            onChange={(e) => setFeedingNote(e.target.value)}
            fullWidth
            multiline
            minRows={3}
          />

          <Button className="Button" variant="contained" sx={{ backgroundColor: "#A695CC", ml: 1 }}>
              Not Ekle
          </Button>
        </div>

        <div className="half-care-column">
          <Typography className="TypographyHC" variant="h6">Oda Kontrolü</Typography>
          <div className="divider"></div>

          <div className="room-checks">
            {roomChecks.map((checked, index) => (
              <div
                key={index}
                className={`room-check ${checked ? "checked" : ""}`}
                onClick={() => toggleRoomCheck(index)}
              >
                {`${8 + index}:00`}
              </div>
            ))}
          </div>

          <Typography className="TypographyHC" variant="body2">
            Kontrol Eden Hemşire: {user.email}
          </Typography>

          <div
            style={{
              display: "inline-flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Button
              className="Button"
              variant="contained"
              sx={{ backgroundColor: "#A695CC", mr: 1 }}
              onClick={submitSignedHC}
            >
              İmza
            </Button>
            <Button
              className="Button"
              variant="contained"
              sx={{ backgroundColor: "#E77169" }}
              onClick={onCancelCareClick}
            >
              Geri
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div> )
}

export default HCForm;
