import * as React from "react";
import './hc_form_component.css'
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from "../../../../config";
import {
Icon, Typography, Button, IconButton, Checkbox, FormControlLabel, TextField, FormControl, Select, MenuItem, Box, Accordion, AccordionSummary, AccordionDetails, Dialog, DialogTitle, DialogContent, DialogActions, Tooltip, Chip, Stack, Switch,
} from '@mui/material';
import Close from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ArrowCircleLeftOutlined, ArrowCircleRightOutlined, Delete, Edit } from '@mui/icons-material';
import PatientSelectionModal from '../PatientSelectionModal';
import NoteModal from './NoteModal';

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

function PatientNotes({ note, onEdit, onDelete }) {
    let date = note["note_date"]
    let title = note["note_title"]
    let data = note["note_data"]
  return (
    <article className="note">
      <div className="note-header-row">
        <time className="note-date" style={{margin: 0}}>{date}</time>
        <div className="note-actions">
          <IconButton 
            size="small" 
            onClick={() => onEdit(note)}
            className="note-action-btn"
            title="Düzenle"
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={() => onDelete(note)}
            className="note-action-btn delete"
            title="Sil"
          >
            <Delete fontSize="small" />
          </IconButton>
        </div>
      </div>
      <div className="note-header-row">
      <h3 className="note-title">
        {title}
      </h3>
      </div>
      <div className="note-header-row">
           <p className="note-data" style={{margin: 0}}>{data}</p>
      </div>

    </article>
  );
}

function HCForm({ selectedPatient, setSelectedPatient, setNewHCContainer, hcDate, patientsList, currentPatientIndex, setCurrentPatientIndex, navigateToPreviousPatient, navigateToNextPatient }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [bodyCode, setBodyCode] = useState(null);

  const titleOptions = [
      "Hijyen Gereksinimleri",
      "Beslenme Takibi",
      "Pozisyon Takibi",
      "Pansuman ve Katater Bakımı",
      "Ödem Takibi",
      "Misafir Güvenliği"
  ];

  const [expandedCol1, setExpandedCol1] = useState(false); // 'hygiene' | 'meal' | 'posture' | false
  const [expandedCol2, setExpandedCol2] = useState(false); // 'dressing' | 'edema' | 'security' | 'stool' | false

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
    mouthCare: "Ağız Bakımı - Dişlerin Temizliği",
    handFaceCare: "El - Yüz Temizliği",
    earNoseCare: "Burun - Kulak Temizliği",
    bottomCare: "Alt Bakımı",
    bodyCare: "Vücut Muayenesi Kontrolü",
    rashCare: "Yara - Kızarıklık vb. Kontrolü",
    moistureCare: "Cildi Nemlendirme",
  }
  let hygieneCheckWeeklyMap = {
    bathCare: "Banyo Yaptırılması",
    handFootCare: "El ve Ayak Tırnaklarının Kesilmesi",
    bodyHairCare: "İstenmeyen Tüylerin Temizliği",
    hairCare: "Saç - Sakal Tıraşının Yapılması",
    bedBathCare: "Yatak Banyosu - Vücut Silme - Yatakta Saç Yıkama",
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
    walkable: "Mobil - Yürüyen Misafir",
  }
  let dressingCheckMap = {
    isInjured: "Bası Yarası Var Mı?",
    stage: "Bası Yarası Evresi",
    dailyDressing: "Günlük Bası Yarası Pansumanı",
    needDressing: "Pansuman Gerektiren Bir Durum Var Mı?",
    isDressed: "Pansuman Yapıldı",
    catheter: "Katater Bakımı Yapıldı"
  }
  let edemaCheckMap = {
    liquidCheck: "Sıvı Takibi Yapıldı Mı?",
    liquidIntakeML:  "Alınan Sıvı Miktarı:",
    urineOutput:  "İdrar Çıkışı:",
  }
  let securityCheckMap = {
    reason1: "Yerde takılacağı kablo vs. herhangi bir şey var mı? Giymiş olduğu terlik ve oda zemini güvenli mi?",
    reason2: "Hemşire çağrı zilinin kullanıldı mı?",
    reason3: "Gözlük kullanıyor ise erişebileceği bir yere konuldu mu?",
    reason4: "Kenarlık koruması gerekli mi?",
    reason5: "Düşme riski oluştu mu?"
  }
  let stoolCheckMap = {
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
    breakfastNote: "",
    lunchNote: "",
    midNote: "",
    dinnerNote: "",
    liquidNote: "",
  });

  const [postureCheck, setPostureCheck] = useState({
    walkable: false,
    positions: [
      { time: "08:00", position: "Sırt Üstü", checked: false },
      { time: "10:00", position: "Sağa Dönük", checked: false },
      { time: "12:00", position: "Sola Dönük", checked: false },
      { time: "14:00", position: "Sırt Üstü", checked: false },
      { time: "16:00", position: "Sağa Dönük", checked: false },
      { time: "18:00", position: "Sola Dönük", checked: false },
    ]
  });

  const [dressingCheck, setDressingCheck] = useState({
    isInjured: null, // null = not answered, true = yes, false = no
    injuredRegion: null,
    stage: 1,
    dailyDressing: false,
    needDressing: null, // null = not answered, true = yes, false = no
    isDressed: false,
    catheter: false
  });

  const [edemaCheck, setEdemaCheck] = useState({
    liquidCheck: null, // null = not answered, true = yes, false = no
    liquidIntakeML: 0,
    urineOutput: 0,
  });

  const [securityCheck, setSecurityCheck] = useState({
    reason1: false,
    reason2: false,
    reason3: false,
    reason4: false,
    reason5: false,
    reason1Note: "",
    reason2Note: "",
    reason3Note: "",
    reason4Note: "",
    reason5Note: "",
  });

  const [stoolCheck, setStoolCheck] = useState({
    stool: false,
  });

  const [roomChecks, setRoomChecks] = useState(
    new Array(12).fill(false)
  );

  const [feedingNote, setFeedingNote] = useState('');
  const [selectedNote, setSelectedNote] = useState('');
  const [showPatientSelectionModal, setShowPatientSelectionModal] = useState(false);
  const [oldNotes, setOldNotes] = useState([]);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const bodyMapping = ["Kafa Bölgesi", "Göğüs Bölgesi", "Sol Kol Bölgesi", "Sol Ayak Bölgesi", "Sol El Bölgesi",
    "Sol Bacak Bölgesi", "Sol Omuz Bölgesi", "Sağ Kol Bölgesi", "Sağ Ayak Bölgesi", "Sağ El Bölgesi",
    "Sağ Bacak Bölgesi", "Sağ Omuz Bölgesi", "Karın Bölgesi"]

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
      "stoolCheck": stoolCheck,
      "roomChecks": roomChecks
    }
    // setTakenMeds(prev => new Set([...prev, ...selectedGivenMeds]));
    // setSelectedGivenMeds(new Set());

    fetch(`${API_BASE_URL}/patients/`, {
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
    fetch(`${API_BASE_URL}/patients/?email=${email}&patient_id=${selectedPatient.patient_id}`, {
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
           setHygieneCheckDaily(hc["hygieneCheckDaily"] || {})
           setHygieneCheckWeekly(hc["hygieneCheckWeekly"] || {})
           setMealCheck({
             breakfastCare: false,
             lunchCare: false,
             midCare: false,
             dinnerCare: false,
             liquidCare: false,
             breakfastNote: "",
             lunchNote: "",
             midNote: "",
             dinnerNote: "",
             liquidNote: "",
             ...hc["mealCheck"]
           })
           setPostureCheck({
             walkable: false,
             positions: [
               { time: "08:00", position: "Sırt Üstü", checked: false },
               { time: "10:00", position: "Sağa Dönük", checked: false },
               { time: "12:00", position: "Sola Dönük", checked: false },
               { time: "14:00", position: "Sırt Üstü", checked: false },
               { time: "16:00", position: "Sağa Dönük", checked: false },
               { time: "18:00", position: "Sola Dönük", checked: false },
             ],
             ...hc["postureCheck"]
           })
           setDressingCheck({
             isInjured: null,
             injuredRegion: null,
             stage: 1,
             dailyDressing: false,
             needDressing: null,
             isDressed: false,
             catheter: false,
             ...hc["dressingCheck"]
           })
           setEdemaCheck({
             liquidCheck: null,
             liquidIntakeML: 0,
             urineOutput: 0,
             ...hc["edemaCheck"]
           })
           setSecurityCheck({
             reason1: false,
             reason2: false,
             reason3: false,
             reason4: false,
             reason5: false,
             reason1Note: "",
             reason2Note: "",
             reason3Note: "",
             reason4Note: "",
             reason5Note: "",
             ...hc["securityCheck"]
           })
           setStoolCheck(hc["stoolCheck"] || { stool: false })
           setRoomChecks(hc["roomChecks"] || [])
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
            breakfastNote: "",
            lunchNote: "",
            midNote: "",
            dinnerNote: "",
            liquidNote: "",
          })
          setPostureCheck({
            walkable: false,
            positions: [
              { time: "08:00", position: "Sırt Üstü", checked: false },
              { time: "10:00", position: "Sağa Dönük", checked: false },
              { time: "12:00", position: "Sola Dönük", checked: false },
              { time: "14:00", position: "Sırt Üstü", checked: false },
              { time: "16:00", position: "Sağa Dönük", checked: false },
              { time: "18:00", position: "Sola Dönük", checked: false },
            ]
          })
          setDressingCheck({
            isInjured: null,
            injuredRegion: null,
            stage: 1,
            dailyDressing: false,
            needDressing: null,
            isDressed: false,
            catheter: false
          })
          setEdemaCheck({
            liquidCheck: null,
            liquidIntakeML: 0,
            urineOutput: 0,
          })
          setSecurityCheck({
            reason1: false,
            reason2: false,
            reason3: false,
            reason4: false,
            reason5: false,
            reason1Note: "",
            reason2Note: "",
            reason3Note: "",
            reason4Note: "",
            reason5Note: "",
          })
          setStoolCheck({
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

  const fetchNotes = () => {
    if (!selectedPatient || !selectedPatient.patient_id) return;
    
    fetch(`${API_BASE_URL}/patients/?email=${user.email}&patient_id=${selectedPatient.patient_id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(resp => {
      if (resp.status === "success" && resp.data && resp.data.length > 0) {
        const patientData = resp.data[0];
        const patientNotes = patientData.patient_notes || {};
        
        // Convert notes object to array, sorted by date (newest first)
        const notesArray = [];
        Object.keys(patientNotes).forEach(noteId => {
          notesArray.push(patientNotes[noteId]);
        });

        // Sort by timestamp (newest first)
        notesArray.sort((a, b) => {
          const dateA = new Date(a.timestamp || a.note_date);
          const dateB = new Date(b.timestamp || b.note_date);
          return dateB - dateA;
        });
        
        setOldNotes(notesArray);
      } else {
        setOldNotes([]);
      }
    })
    .catch(error => {
      console.error("Error fetching notes:", error);
      setOldNotes([]);
    });
  };

  const addNote = () => {
    if (!selectedNote || selectedNote === "") {
      alert("Lütfen bir başlık seçiniz.");
      return;
    }
    if (!feedingNote.trim()) {
      alert("Lütfen not içeriğini giriniz.");
      return;
    }

    fetch(`${API_BASE_URL}/patients/`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        type: "add_note",
        patient_id: selectedPatient.patient_id,
        note_title: selectedNote,
        note_data: feedingNote,
        today_date: getTodayForDjango()
      })
    })
    .then(r => r.json())
    .then(resp => {
      if (resp.status === "success") {
        setFeedingNote('');
        setSelectedNote('');
        fetchNotes();
      } else {
        alert("Not eklenirken bir hata oluştu.");
      }
    })
    .catch(error => {
      console.error("Error adding note:", error);
      alert("Not eklenirken bir hata oluştu.");
    });
  };

  const handleNewNote = () => {
    setNoteToEdit(null);
    setShowNoteModal(true);
  };

  const handleEditNote = (note) => {
    setNoteToEdit(note);
    setShowNoteModal(true);
  };

  const handleDeleteNote = (note) => {
    if (!window.confirm("Bu notu silmek istediğinize emin misiniz?")) {
      return;
    }

    fetch(`${API_BASE_URL}/patients/`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        type: "delete_note",
        patient_id: selectedPatient.patient_id,
        note_id: note.note_id,
        note_date: note.note_date
      })
    })
    .then(r => r.json())
    .then(resp => {
      if (resp.status === "success") {
        fetchNotes();
      } else {
        alert("Not silinirken bir hata oluştu.");
      }
    })
    .catch(error => {
      console.error("Error deleting note:", error);
      alert("Not silinirken bir hata oluştu.");
    });
  };

  const handleNoteSaved = () => {
    fetchNotes();
  };

  useEffect(() => {
      updateSelectedPatient(user.email, hcType);
      fetchNotes();
    }, [user.email, selectedPatient.patient_id]);

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
      {/* New Top Header Design */}
      <div className="hc-form-top-header">
        <div className="hc-form-top-left">
          <Typography className="hc-form-title-main" variant="h5">Bakım</Typography>
          <Typography className="hc-form-title-sub" variant="body1">Aktif Yaşam</Typography>
        </div>

        <div className="patient-navigation-container-inherited">
          <IconButton
            className="nav-arrow"
            onClick={navigateToPreviousPatient}
            disabled={currentPatientIndex === 0}
            title="Previous Patient"
        >
            <ArrowCircleLeftOutlined sx={{ fontSize: 40 }} />
        </IconButton>
        <div className="patient-navigation-info">
            <span className="patient-counter">
                {currentPatientIndex + 1} / {patientsList.length}
            </span>
            <button
                className="patient-name-button"
                onClick={() => setShowPatientSelectionModal(true)}
            >
                {selectedPatient?.patient_personal_info?.section_1?.firstname} {selectedPatient?.patient_personal_info?.section_1?.lastname}
            </button>
        </div>
        <IconButton
            className="nav-arrow"
            onClick={navigateToNextPatient}
            disabled={currentPatientIndex === patientsList.length - 1}
            title="Next Patient"
        >
            <ArrowCircleRightOutlined sx={{ fontSize: 40 }} />
        </IconButton>

        </div>

        <div className="hc-form-top-right">
          <div className="hc-form-shift-toggle">
            <Typography className="hc-form-shift-label" variant="body2">Sabah Vardiyası</Typography>
            <Switch
              checked={hcType === "day"}
              onChange={() => {
                if (hcType !== "day") {
                  handleToggleHcType();
                }
              }}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#1976d2',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#1976d2',
                },
              }}
            />
          </div>
          <div className="hc-form-shift-toggle">
            <Typography className="hc-form-shift-label" variant="body2">Gece Vardiyası</Typography>
            <Switch
              checked={hcType === "night"}
              onChange={() => {
                if (hcType !== "night") {
                  handleToggleHcType();
                }
              }}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#1976d2',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#1976d2',
                },
              }}
            />
          </div>
          <IconButton
            className="hc-form-close-button"
            aria-label="Close"
            onClick={onCancelCareClick}
            sx={{ 
              border: "none", 
              backgroundColor: "inherit", 
              cursor: "pointer",
              ml: 1
            }}
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
        <AccordionDetails className="AccordionDetails">
        <div className="divider-low-margin"></div>
        {Object.keys(mealCheck).filter(key => !key.endsWith('Note')).map((key) => (
        <div key={key}>
        <div className="each-point">
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
        {mealCheck[key] && (
          <Box sx={{ ml: 1, mr: 1, mb: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder={`${mealCheckMap[key]} detayı giriniz...`}
              value={mealCheck[`${key}Note`] || ""}
              onChange={(e) => setMealCheck(prev => ({ ...prev, [`${key}Note`]: e.target.value }))}
            />
          </Box>
        )}
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
        {Object.keys(postureCheck).filter(key => key !== 'positions').map((key) => (
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
        <Box sx={{ mt: 2 }}>
          <Typography className="TypographyHC" variant="subtitle1" sx={{ mb: 1 }}>Pozisyon Değişimleri</Typography>
          <div className="divider-low-margin"></div>
          {postureCheck.positions?.map((pos, index) => (
            <div className="each-point" key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{"marginLeft": "15px"}}
                    icon={<PlaylistAddRoundedIcon />}
                    checkedIcon={<PlaylistAddCheckCircleIcon />}
                    checked={pos.checked}
                    onChange={() => {
                      const newPositions = [...postureCheck.positions];
                      newPositions[index].checked = !newPositions[index].checked;
                      setPostureCheck(prev => ({ ...prev, positions: newPositions }));
                    }}
                  />
                }
                label={`${pos.position} Pozisyon (${pos.time})`}
              />
            </div>
          ))}
        </Box>
        </AccordionDetails>
        </Accordion>
      </div>

      <div className="care-column"> {/* Pansuman ve Katater Bakımı */}
        <Accordion expanded={expandedCol2 === 'dressing'} onChange={handleChangeCol2('dressing')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="TypographyHC" variant="h6">Pansuman ve Katater Bakımı</Typography>
          </AccordionSummary>
         <AccordionDetails>
           <div className="divider-low-margin"></div>
           {/* Bası yarası var mı? */}
           <div className="each-point">
             <Typography className="TypographyHC" variant="body1" sx={{ mb: 0 }}>{dressingCheckMap.isInjured}</Typography>
             <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
               <FormControlLabel
                 control={
                   <Checkbox
                     checked={dressingCheck.isInjured === true}
                     onChange={() => setDressingCheck(prev => ({ ...prev, isInjured: prev.isInjured === true ? null : true }))}
                   />
                 }
                 label="Evet"
               />
               <FormControlLabel
                 control={
                   <Checkbox
                     checked={dressingCheck.isInjured === false}
                     onChange={() => setDressingCheck(prev => ({ ...prev, isInjured: prev.isInjured === false ? null : false }))}
                   />
                 }
                 label="Hayır"
               />
             </Box>
           </div>
           
           {/* Bası yarasının bölgesi - shown when Evet is selected */}
           {dressingCheck.isInjured === true && (
             <Box sx={{ ml: 2, mb: 0 }}>
               <Typography className="TypographyHC" variant="body1" sx={{ mb: 1 }}>Bası yarasının bölgesi</Typography>
               <BodyPartInput value={dressingCheck.injuredRegion} onChange={(val) => setDressingCheck(prev => ({ ...prev, injuredRegion: val }))} />
             </Box>
           )}
           
           {/* Evre - shown when Evet is selected */}
           {dressingCheck.isInjured === true && (
             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, ml: 2, mb: 2 }}>
               <Typography className="TypographyHC" variant="body1">{dressingCheckMap.stage}</Typography>
               <FormControl size="small" sx={{ minWidth: 140 }}>
                 <InputLabel id="stage-label">Evre</InputLabel>
                 <Select
                   labelId="stage-label"
                   id="stage-select"
                   label="Evre"
                   value={Number(dressingCheck.stage) ?? 1}
                   onChange={(e) => setDressingCheck((prev) => ({ ...prev, stage: Number(e.target.value) }))}
                 >
                   <MenuItem value={1}>Evre I</MenuItem>
                   <MenuItem value={2}>Evre II</MenuItem>
                   <MenuItem value={3}>Evre III</MenuItem>
                   <MenuItem value={4}>Evre IV</MenuItem>
                 </Select>
               </FormControl>
             </Box>
           )}
           
           {/* Günlük Bası Yarası Pansumanı - shown when Evet is selected */}
           {dressingCheck.isInjured === true && (
             <div className="each-point">
               <FormControlLabel
                 control={
                   <Checkbox
                     style={{ marginLeft: '15px' }}
                     icon={<PlaylistAddRoundedIcon />}
                     checkedIcon={<PlaylistAddCheckCircleIcon />}
                     checked={dressingCheck.dailyDressing}
                     onChange={() => toggleList('dailyDressing', dressingCheck, setDressingCheck)}
                   />
                 }
                 label={dressingCheckMap.dailyDressing}
               />
             </div>
           )}
           
           {/* Pansuman gerektiren durum var mı? */}
           <div className="each-point">
             <Typography className="TypographyHC" variant="body1" sx={{ mb: 0 }}>{dressingCheckMap.needDressing}</Typography>
             <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
               <FormControlLabel
                 control={
                   <Checkbox
                     checked={dressingCheck.needDressing === true}
                     onChange={() => setDressingCheck(prev => ({ ...prev, needDressing: prev.needDressing === true ? null : true }))}
                   />
                 }
                 label="Evet"
               />
               <FormControlLabel
                 control={
                   <Checkbox
                     checked={dressingCheck.needDressing === false}
                     onChange={() => setDressingCheck(prev => ({ ...prev, needDressing: prev.needDressing === false ? null : false }))}
                   />
                 }
                 label="Hayır"
               />
             </Box>
           </div>
           
           {/* Pansuman Yapıldı mı? - shown when needDressing is Evet */}
           {dressingCheck.needDressing === true && (
             <div className="each-point">
               <FormControlLabel
                 control={
                   <Checkbox
                     style={{ marginLeft: '15px' }}
                     icon={<PlaylistAddRoundedIcon />}
                     checkedIcon={<PlaylistAddCheckCircleIcon />}
                     checked={dressingCheck.isDressed}
                     onChange={() => toggleList('isDressed', dressingCheck, setDressingCheck)}
                   />
                 }
                 label={dressingCheckMap.isDressed}
               />
             </div>
           )}
           
           {/* Katater Bakımı */}
           <div className="each-point">
             <FormControlLabel
               control={
                 <Checkbox
                   style={{ marginLeft: '15px' }}
                   icon={<PlaylistAddRoundedIcon />}
                   checkedIcon={<PlaylistAddCheckCircleIcon />}
                   checked={dressingCheck.catheter}
                   onChange={() => toggleList('catheter', dressingCheck, setDressingCheck)}
                 />
               }
               label={dressingCheckMap.catheter}
             />
           </div>

         </AccordionDetails>
        </Accordion>
        <Accordion expanded={expandedCol2 === 'edema'} onChange={handleChangeCol2('edema')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="TypographyHC" variant="h6">Ödem Takibi</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="divider-low-margin"></div>
            
            {/* Sıvı takibi Yapıldı mı? */}
            <div className="each-point">
              <Typography className="TypographyHC" variant="body1" sx={{ mb: 0 }}>{edemaCheckMap.liquidCheck}</Typography>
              <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={edemaCheck.liquidCheck === true}
                      onChange={() => setEdemaCheck(prev => ({ ...prev, liquidCheck: prev.liquidCheck === true ? null : true }))}
                    />
                  }
                  label="Evet"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={edemaCheck.liquidCheck === false}
                      onChange={() => setEdemaCheck(prev => ({ ...prev, liquidCheck: prev.liquidCheck === false ? null : false }))}
                    />
                  }
                  label="Hayır"
                />
              </Box>
            </div>
            
            {/* Kaç ml sıvı alındı? - shown when Evet is selected */}
            {edemaCheck.liquidCheck === true && (
              <div className="each-point">
                <InputLabel style={{"alignContent": "center"}} htmlFor="outlined-adornment-liquidIntakeML">{edemaCheckMap.liquidIntakeML}</InputLabel>
                <OutlinedInput
                  style={{"alignContent": "center", "width": "150px"}}
                  id="outlined-adornment-liquidIntakeML"
                  type="number"
                  step="0.01"
                  size="small"
                  endAdornment={<InputAdornment position="end">ml</InputAdornment>}
                  value={edemaCheck.liquidIntakeML}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 0;
                    setEdemaCheck(prev => ({ ...prev, liquidIntakeML: value }))
                  }}
                />
              </div>
            )}
            
            {/* İdrar Çıkışı - shown when Evet is selected */}
            {edemaCheck.liquidCheck === true && (
              <div className="each-point">
                <InputLabel style={{"alignContent": "center"}} htmlFor="outlined-adornment-urineOutput">{edemaCheckMap.urineOutput}</InputLabel>
                <OutlinedInput
                  style={{"alignContent": "center", "width": "150px"}}
                  id="outlined-adornment-urineOutput"
                  type="number"
                  step="0.01"
                  size="small"
                  endAdornment={<InputAdornment position="end">ml</InputAdornment>}
                  value={edemaCheck.urineOutput}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 0;
                    setEdemaCheck(prev => ({ ...prev, urineOutput: value }))
                  }}
                />
              </div>
            )}

          </AccordionDetails>
        </Accordion>

        {/* Misafir Güvenliği */}
        <Accordion expanded={expandedCol2 === 'security'} onChange={handleChangeCol2('security')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className="TypographyHC" variant="h6">Misafir Güvenliği</Typography>
        </AccordionSummary>
        <AccordionDetails className="AccordionDetails">
        <div className="divider-low-margin"></div>
        {Object.keys(securityCheck).filter(key => !key.endsWith('Note')).map((key) => (
        <div key={key}>
        <div className="each-point">
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
        {securityCheck[key] && (
          <Box sx={{ ml: 1, mr: 1, mb: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder={`Detayı giriniz...`}
              value={securityCheck[`${key}Note`] || ""}
              onChange={(e) => setSecurityCheck(prev => ({ ...prev, [`${key}Note`]: e.target.value }))}
            />
          </Box>
        )}
        </div>
        ))}
        </AccordionDetails>
        </Accordion>

        {/* Gaita Takibi */}
        <Accordion expanded={expandedCol2 === 'stool'} onChange={handleChangeCol2('stool')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className="TypographyHC" variant="h6">Gaita Takibi</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div className="divider-low-margin"></div>
        {Object.keys(stoolCheck).map((key) => (

<div className="each-point" key={key}> {<FormControlLabel control={ <Checkbox style={{"marginLeft": "15px"}}
                    icon={<PlaylistAddRoundedIcon />}
                    checkedIcon={<PlaylistAddCheckCircleIcon />} checked={stoolCheck[key]} onChange={() => setStoolCheck({ ...stoolCheck, [key]: !stoolCheck[key] }) } /> } label={stoolCheckMap[key]} /> } </div> ))}
        </AccordionDetails>
        </Accordion>

      </div>

      <div>
        <div className="half-care-column">
          <Typography className="TypographyHC" variant="h6">Bakım Notları</Typography>
          <div className="divider"></div>

          <div className="care-notes">
            {oldNotes.map((note, index) => (
              <PatientNotes 
                className="care-note" 
                key={note.note_id || index} 
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
          <Button className="Button" variant="contained" sx={{ backgroundColor: "#A695CC", ml: 1 }} onClick={handleNewNote}>
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
        </div>
      </div>
    </div>
      <div className="divider"></div>
      {/* Bottom Buttons Container - Outside the cards */}
      <div className="hc-form-bottom-buttons-container">
        <Button
          className="hc-form-cancel-button"
          variant="outlined"
          onClick={onCancelCareClick}
          sx={{
            borderColor: '#1976d2',
            color: '#1976d2',
            backgroundColor: '#FFFFFF',
            '&:hover': {
              borderColor: '#1976d2',
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          İptal Et
        </Button>
        <Button
          className="hc-form-save-button"
          variant="contained"
          onClick={submitSignedHC}
          sx={{
            backgroundColor: '#1976d2',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          Kaydet
        </Button>
      </div>
  </div>
</div>
<PatientSelectionModal
  isOpen={showPatientSelectionModal}
  onClose={() => setShowPatientSelectionModal(false)}
  patientsList={patientsList}
  selectedPatient={selectedPatient}
  onSelectPatient={(patient) => {
    const patientIndex = patientsList.findIndex(p => p.patient_id === patient.patient_id);
    if (patientIndex !== -1) {
      setCurrentPatientIndex(patientIndex);
      setSelectedPatient(patient);
    }
  }}
/>
<NoteModal
  isOpen={showNoteModal}
  onClose={() => {
    setShowNoteModal(false);
    setNoteToEdit(null);
  }}
  onSave={handleNoteSaved}
  patientId={selectedPatient?.patient_id}
  userEmail={user.email}
  noteToEdit={noteToEdit}
  titleOptions={titleOptions}
/>
</div> )
}

export default HCForm;
