import * as React from "react";
import './medicine_form_component.css'
import {useEffect, useState} from "react";
import {Tab, Tabs, IconButton, Typography, FormControl, Select, MenuItem, TextField, Button, Checkbox} from '@mui/material';
import { API_BASE_URL } from "../../../../config";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ArrowCircleLeftOutlined, ArrowCircleRightOutlined, Delete, Edit } from '@mui/icons-material';
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import PatientSelectionModal from '../PatientSelectionModal';
import NoteModal from './NoteModal';


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

const getGenderAge = ( age, gender ) => {
    const today = new Date();
    const birthDate = new Date(age);
    let str_age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dateDifference = today.getDate() - birthDate.getDate();

    // Adjust age if the birthdate hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && dateDifference < 0)) {
        str_age--;
    }

    return gender + ", " + str_age + " yaşında"
};

const PersonInfo = ({ patientPhoto, name, surname, gender, age, bloodType, height, weight }) => (
  <div className="person-info" style={{"height": "70%","width": "100%", "border": "1px solid #D2D2D2"}}>
    <div className="person-photo" style={{"marginLeft": "-10px"}}>
      <img
        loading="lazy"
        src={`data:image/*;base64,${patientPhoto}`}
        alt={`${name} ${surname}`}
        className="photo"
      />
    </div>
    <div className="info" style={{"marginLeft": "-10px"}}>
      <h2 className="name">{name}</h2>
      <h3 className="surname">{surname}</h3>
      <p className="gender-age">{getGenderAge(age, gender)}</p>
      <div className="blood-and-physical">
        <div className="blood-type">
            <div className="unit">
                {bloodType}
            </div>
        </div>
        <div className="physical-stats">
            <div className="unit">{height} cm</div>
            <p>/</p>
            <div className="unit">{weight} kg</div>
        </div>
      </div>
    </div>
  </div>
);

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

function MedicineForm({ selectedPatient, setSelectedPatient, setNewMedicineContainer, medicinesDate, patientsList, currentPatientIndex, setCurrentPatientIndex, navigateToPreviousPatient, navigateToNextPatient }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const theme = createTheme({
    palette: {
      secondary: {
        main: 'rgb(166, 149, 204)'
      },
      primary: {
        main: 'rgb(166, 149, 204)'
      }
    }
  });

  const titleOptions = [
    "Hijyen Gereksinimleri",
    "Beslenme Takibi",
    "Pozisyon Takibi",
    "Pansuman ve Katater Bakımı",
    "Ödem Takibi",
    "Misafir Güvenliği"
  ];

  const dict_key = reformatDjangoDate(medicinesDate)
   // already‐taken medicine IDs

  const [takenMeds_M, setTakenMeds_M] = useState(new Set());
  const [takenMeds_N, setTakenMeds_N] = useState(new Set());
  const [takenMeds_E, setTakenMeds_E] = useState(new Set());

  // meds the user has just checked this session
  const [selectedGivenMeds_M, setSelectedGivenMeds_M] = useState(new Set());
  const [selectedGivenMeds_E, setSelectedGivenMeds_E] = useState(new Set());
  const [selectedGivenMeds_N, setSelectedGivenMeds_N] = useState(new Set());

  const [isLoading, setIsLoading] = useState(true);

  const [tabValue, setTabValue] = useState(0);
  const [sortConfig, setSortConfig] = useState(null);
  const onCancelCareClick = () => {
      setNewMedicineContainer(false)
  }
  const [dailyMedicinesM, setDailyMedicinesM] = useState([]);

  const [dailyMedicinesN, setDailyMedicinesN] = useState([]);

  const [dailyMedicinesE, setDailyMedicinesE] = useState([]);

  const [feedingNote, setFeedingNote] = useState('');
  const [selectedNoteTitle, setSelectedNoteTitle] = useState('');

  const [showPatientSelectionModal, setShowPatientSelectionModal] = useState(false);
  const [oldNotes, setOldNotes] = useState([]);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const toggleDailyMedicinesM = (key) => {
    setDailyMedicinesM({
      ...dailyMedicinesM,
      [key]: !dailyMedicinesM[key],
    });
  };

  const toggleDailyMedicinesN = (key) => {
    setDailyMedicinesN({
      ...dailyMedicinesN,
      [key]: !dailyMedicinesN[key],
    });
  };

  const toggleDailyMedicinesE = (key) => {
    setDailyMedicinesE({
      ...dailyMedicinesE,
      [key]: !dailyMedicinesE[key],
    });
  };

  const requestSort = (key, setFunction) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    setFunction((prevData) => {
      return [...prevData].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    });
  };


  const handleGivenChange_M = medId => {
    // Prevent marking medications as given on future dates
    const viewedDate = new Date(medicinesDate);
    viewedDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (viewedDate > today) {
      window.alert("Gelecek tarihler için ilaç işaretlenemez.");
      return;
    }
    
    setSelectedGivenMeds_M(prev => {
      const next = new Set(prev);
      if (next.has(medId)) next.delete(medId);
      else next.add(medId);
      return next;
    });
  };

    const handleGivenChange_N = medId => {
    // Prevent marking medications as given on future dates
    const viewedDate = new Date(medicinesDate);
    viewedDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (viewedDate > today) {
      window.alert("Gelecek tarihler için ilaç işaretlenemez.");
      return;
    }
    
    setSelectedGivenMeds_N(prev => {
      const next = new Set(prev);
      if (next.has(medId)) next.delete(medId);
      else next.add(medId);
      return next;
    });
  };

      const handleGivenChange_E = medId => {
    // Prevent marking medications as given on future dates
    const viewedDate = new Date(medicinesDate);
    viewedDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (viewedDate > today) {
      window.alert("Gelecek tarihler için ilaç işaretlenemez.");
      return;
    }
    
    setSelectedGivenMeds_E(prev => {
      const next = new Set(prev);
      if (next.has(medId)) next.delete(medId);
      else next.add(medId);
      return next;
    });
  };

  const submitGivenMeds = async () => {
    const payload_M = Array.from(selectedGivenMeds_M).map(medicine_id => (
        {
            "patient_id": selectedPatient["patient_id"],
            "email": user.email,
            "type": "add_given_medicine",
            "medicine_id": medicine_id,
            "period": "morning",
            "today_date": getTodayForDjango()
        }
    ));

    const payload_N = Array.from(selectedGivenMeds_N).map(medicine_id => (
        {
            "patient_id": selectedPatient["patient_id"],
            "email": user.email,
            "type": "add_given_medicine",
            "medicine_id": medicine_id,
            "period": "noon",
            "today_date": getTodayForDjango()
        }
    ));

    const payload_E = Array.from(selectedGivenMeds_E).map(medicine_id => (
        {
            "patient_id": selectedPatient["patient_id"],
            "email": user.email,
            "type": "add_given_medicine",
            "medicine_id": medicine_id,
            "period": "evening",
            "today_date": getTodayForDjango()
        }
    ));

    const payload = payload_M.concat(payload_N).concat(payload_E);

    // Check if there are any medicines to submit
    if (payload.length === 0) {
      window.alert("İşaretlenecek ilaç bulunmuyor.");
      return;
    }

    // Confirmation dialog
    const confirmed = window.confirm(
      `Seçili ilaçlar için imza atmak istediğinize emin misiniz?\n\nSabah: ${selectedGivenMeds_M.size} ilaç\nÖğlen: ${selectedGivenMeds_N.size} ilaç\nAkşam: ${selectedGivenMeds_E.size} ilaç`
    );
    if (!confirmed) {
      return;
    }

    try {
      // Send requests sequentially to avoid potential race conditions in backend
      // Group by period to send morning, noon, then evening
      const results = [];
      
      // Process morning medicines
      for (const item of payload_M) {
        try {
          const response = await fetch(`${API_BASE_URL}/patients/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
              "patient_id": item["patient_id"],
              "email": item["email"],
              "type": item["type"],
              "medicine_id": item["medicine_id"],
              "period": item["period"],
              "today_date": item["today_date"]
            })
          });
          
          const result = await response.json();
          results.push({
            success: result.status === "success",
            period: item["period"],
            medicine_id: item["medicine_id"],
            response: result
          });
          
          if (result.status !== "success") {
            console.error(`Failed to save morning medicine ${item["medicine_id"]}:`, result);
          }
        } catch (error) {
          console.error(`Error sending morning medicine ${item["medicine_id"]}:`, error);
          results.push({
            success: false,
            period: item["period"],
            medicine_id: item["medicine_id"],
            error: error.message
          });
        }
      }

      // Process noon medicines
      for (const item of payload_N) {
        try {
          const response = await fetch(`${API_BASE_URL}/patients/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
              "patient_id": item["patient_id"],
              "email": item["email"],
              "type": item["type"],
              "medicine_id": item["medicine_id"],
              "period": item["period"],
              "today_date": item["today_date"]
            })
          });
          
          const result = await response.json();
          results.push({
            success: result.status === "success",
            period: item["period"],
            medicine_id: item["medicine_id"],
            response: result
          });
          
          if (result.status !== "success") {
            console.error(`Failed to save noon medicine ${item["medicine_id"]}:`, result);
          }
        } catch (error) {
          console.error(`Error sending noon medicine ${item["medicine_id"]}:`, error);
          results.push({
            success: false,
            period: item["period"],
            medicine_id: item["medicine_id"],
            error: error.message
          });
        }
      }

      // Process evening medicines
      for (const item of payload_E) {
        try {
          const response = await fetch(`${API_BASE_URL}/patients/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
              "patient_id": item["patient_id"],
              "email": item["email"],
              "type": item["type"],
              "medicine_id": item["medicine_id"],
              "period": item["period"],
              "today_date": item["today_date"]
            })
          });
          
          const result = await response.json();
          results.push({
            success: result.status === "success",
            period: item["period"],
            medicine_id: item["medicine_id"],
            response: result
          });
          
          if (result.status !== "success") {
            console.error(`Failed to save evening medicine ${item["medicine_id"]}:`, result);
          }
        } catch (error) {
          console.error(`Error sending evening medicine ${item["medicine_id"]}:`, error);
          results.push({
            success: false,
            period: item["period"],
            medicine_id: item["medicine_id"],
            error: error.message
          });
        }
      }

      // Separate results by period
      const morningResults = results.filter(r => r.period === "morning");
      const noonResults = results.filter(r => r.period === "noon");
      const eveningResults = results.filter(r => r.period === "evening");

      const morningSuccess = morningResults.every(r => r.success);
      const noonSuccess = noonResults.every(r => r.success);
      const eveningSuccess = eveningResults.every(r => r.success);

      // Log failed requests for debugging
      const failedRequests = results.filter(r => !r.success);
      if (failedRequests.length > 0) {
        console.error("Failed medicine submissions:", failedRequests);
        failedRequests.forEach(failed => {
          console.error(`Failed: Period=${failed.period}, Medicine=${failed.medicine_id}, Error=`, failed.error || failed.response);
        });
      }

      // Update state only for successful requests
      if (morningSuccess) {
        setTakenMeds_M(prev => new Set([...prev, ...selectedGivenMeds_M]));
        setSelectedGivenMeds_M(new Set());
      }
      if (noonSuccess) {
        setTakenMeds_N(prev => new Set([...prev, ...selectedGivenMeds_N]));
        setSelectedGivenMeds_N(new Set());
      }
      if (eveningSuccess) {
        setTakenMeds_E(prev => new Set([...prev, ...selectedGivenMeds_E]));
        setSelectedGivenMeds_E(new Set());
      }

      // Show appropriate message
      if (morningSuccess && noonSuccess && eveningSuccess) {
        window.alert("Tüm ilaçlar başarıyla kaydedildi.");
      } else {
        const failedPeriods = [];
        if (!morningSuccess) failedPeriods.push("Sabah");
        if (!noonSuccess) failedPeriods.push("Öğlen");
        if (!eveningSuccess) failedPeriods.push("Akşam");
        
        window.alert(
          `Bazı ilaçlar kaydedilemedi:\n${failedPeriods.join(", ")}\n\n` +
          `Başarılı: Sabah=${morningSuccess ? "✓" : "✗"}, Öğlen=${noonSuccess ? "✓" : "✗"}, Akşam=${eveningSuccess ? "✓" : "✗"}\n\n` +
          `Lütfen konsolu kontrol edin ve tekrar deneyin.`
        );
      }
    } catch (error) {
      console.error("Error submitting medicines:", error);
      window.alert("İlaçlar kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const updateSelectedPatient = (email) => {
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
        const values_M = []
        const values_N = []
        const values_E = []

        for (var key in selectedPatientNew.patient_medicines) {
          var medicine = selectedPatientNew.patient_medicines[key];
          // Handle both old format (boolean) and new format (object with timestamp)
          const morningGiven = medicine["medicine_data"]["given_dates"]["morning"][dict_key];
          const noonGiven = medicine["medicine_data"]["given_dates"]["noon"][dict_key];
          const eveningGiven = medicine["medicine_data"]["given_dates"]["evening"][dict_key];
          
          if (morningGiven && (typeof morningGiven === 'object' ? morningGiven.given : true)) values_M.push(medicine["medicine_id"])
          if (noonGiven && (typeof noonGiven === 'object' ? noonGiven.given : true)) values_N.push(medicine["medicine_id"])
          if (eveningGiven && (typeof eveningGiven === 'object' ? eveningGiven.given : true)) values_E.push(medicine["medicine_id"])
        }
        setTakenMeds_M(new Set(values_M))
        setTakenMeds_N(new Set(values_N))
        setTakenMeds_E(new Set(values_E))

        const meds = selectedPatientNew["patient_medicines"];
        const periodMap = {
          "morning": "Sabah",
          "noon": "Öğlen",
          "evening": "Akşam"
        };
        const daysShort = ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'];
        const today     = daysShort[new Date(medicinesDate).getDay()];

        const m = [], n = [], e = [];
        // Get the date being viewed (medicinesDate) for comparison
        const viewedDate = new Date(medicinesDate);
        viewedDate.setHours(0, 0, 0, 0); // Reset time for date comparison
        
        Object.entries(meds).forEach(([medId, record]) => {
          // Check if medicine has end_date and if the viewed date is after the end_date
          if (record.medicine_data.end_date) {
            const endDate = new Date(record.medicine_data.end_date);
            endDate.setHours(0, 0, 0, 0);
            // Skip medicines if the viewed date is after the end_date
            // This way, medicines with passed end_date won't show for current/future dates
            // but will still show for dates older than the end_date (historical viewing)
            if (viewedDate > endDate) {
              return; // Skip this medicine
            }
          }
          
          const buildEntry = (period) => ({
              id: medId,
              name: record.medicine_data.name,
              category: record.medicine_data.category,
              dosage: record.medicine_data.medicine_dosage[period],
              fullness: record.medicine_data.fullness_options[period],
              days: record.medicine_data.selected_days[period],
              period: periodMap[period],
              given: (() => {
                const givenDateValue = record.medicine_data.given_dates[period][getTodayForDjango()];
                return givenDateValue ? (typeof givenDateValue === 'object' ? givenDateValue.given : true) : false;
              })(),
          });

          if (record.medicine_data.selected_periods.morning && record.medicine_data.selected_days.morning.includes(today)) m.push(buildEntry("morning"));
          if (record.medicine_data.selected_periods.noon    && record.medicine_data.selected_days.noon.includes(today))    n.push(buildEntry("noon"));
          if (record.medicine_data.selected_periods.evening && record.medicine_data.selected_days.evening.includes(today)) e.push(buildEntry("evening"));

        });

        setDailyMedicinesM(m);
        setDailyMedicinesN(n);
        setDailyMedicinesE(e);

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
    if (!selectedNoteTitle || selectedNoteTitle === "Başlık Seçiniz") {
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
        note_title: selectedNoteTitle,
        note_data: feedingNote,
        today_date: getTodayForDjango()
      })
    })
    .then(r => r.json())
    .then(resp => {
      if (resp.status === "success") {
        setFeedingNote('');
        setSelectedNoteTitle('');
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
      updateSelectedPatient(user.email);
      fetchNotes();
    }, [user.email, selectedPatient.patient_id]);

  if (isLoading) {
    return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
  }

  return (
    <div className="blackout-container">
            <div className="blackout"></div>
            <div className="blackout-medicine-page-container">
                <div className="medicine-page">
      <div className="content">
        <div className="header">
          <h2>İlaç Takibi</h2>
          <button className="close-button" aria-label="Close alert" type="button" onClick={onCancelCareClick}
                  style={{"border": "none", "backgroundColor": "inherit", "cursor": "pointer"}}>
            <h2 aria-hidden="true">&times;</h2>
          </button>
        </div>
      </div>
          <div className="divider"></div>
          
          {/* Patient Navigation Arrows */}
          <div className="patient-navigation-container">
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
                  <ArrowCircleRightOutlined  sx={{ fontSize: 40 }} />
              </IconButton>
          </div>


      <div className="content">
        <div>
          <div style={{"height": "250px","width": "450px", "marginBottom": "15px"}}>
            <PersonInfo
              patientPhoto={selectedPatient.patient_personal_info.section_1.image}
              name={selectedPatient.patient_personal_info.section_1.firstname}
              surname={selectedPatient.patient_personal_info.section_1.lastname}
              gender={selectedPatient.patient_personal_info.section_1.patientGender}
              age={selectedPatient.patient_personal_info.section_1.dateOfBirth}
              bloodType={selectedPatient.patient_personal_info.section_1.bloodType.toUpperCase()}
              height={selectedPatient.patient_personal_info.section_1.patientHeight}
              weight={selectedPatient.patient_personal_info.section_1.patientWeight}
              />
           <div className="room-info" style={{"padding": "10px", "paddingLeft": "20px"}}>
            <h3 className="title">Oda</h3>
            <div className="details">
              <p>{selectedPatient.patient_personal_info.section_1.patientRoom}</p>
            </div>
        </div>
          </div>
          <div className="half-medicine-column" style={{"height": "480px", "width": "450px"}}>
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
        </div>
        <div>
          <div className="half-medicine-column" style={{"height": "650px"}}>
          <h3>Günlük İlaç Takibi</h3>
          <div style={{"display": "grid", "height": "90%", "marginTop": "10px"}}>
              <ThemeProvider theme={theme}>
            <Tabs
                textColor={'primary'} indicatorColor={'secondary'}
                className="tab-button"
                value={tabValue}
                // textColor="inherit"
                // indicatorColor="inherit"
                style={{"background": "#EEF7F44D"}}
                onChange={(event, newValue) => {
                    setTabValue(newValue);
                }}
            >
                <Tab label="Sabah İçilecek İlaçlar"/>
                <Tab label="Öğlen İçilecek İlaçlar"/>
                <Tab label="Akşam İçilecek İlaçlar"/>
            </Tabs>
                  </ThemeProvider>
              <div className="medicine-scroll" style={{marginTop: "10px"}}>
                    <table style={{width: "100%"}}>
                      <thead>
                      <tr>
                          <th>
                            <button  className="sort-button">
                              İlaç Adı
                            </button>
                          </th>
                          <th>
                            <button className="sort-button">
                              Dozaj
                            </button>
                          </th>
                          <th>
                            <button className="sort-button">
                              İlaç Kategorisi
                            </button>
                          </th>
                          <th>
                            <button className="sort-button">
                              İlaç Zamanı
                            </button>
                          </th>
                          <th style={{"borderRight": "None"}}>İşlemler</th>
                        </tr>

                      {/*<tr>*/}
                      {/*    <th>*/}
                      {/*      <button onClick={() => requestSort('name', setDailyMedicinesM)} className="sort-button">*/}
                      {/*        İlaç Adı*/}
                      {/*      </button>*/}
                      {/*    </th>*/}
                      {/*    <th>*/}
                      {/*      <button onClick={() => requestSort('dosage', setDailyMedicinesM)} className="sort-button">*/}
                      {/*        Dozaj*/}
                      {/*      </button>*/}
                      {/*    </th>*/}
                      {/*    <th>*/}
                      {/*      <button onClick={() => requestSort('category', setDailyMedicinesM)} className="sort-button">*/}
                      {/*        İlaç Kategorisi*/}
                      {/*      </button>*/}
                      {/*    </th>*/}
                      {/*    <th>*/}
                      {/*      <button onClick={() => requestSort('time', setDailyMedicinesM)} className="sort-button">*/}
                      {/*        İlaç Zamanı*/}
                      {/*      </button>*/}
                      {/*    </th>*/}
                      {/*    <th>Günler</th>*/}
                      {/*    <th style={{"borderRight": "None"}}>İşlemler</th>*/}
                      {/*  </tr>*/}
                      </thead>
                        {tabValue === 0 ? <tbody>
                             {dailyMedicinesM.map( medicine => {
                                const isTaken    = takenMeds_M.has(medicine.id);
                                const isSelected = selectedGivenMeds_M.has(medicine.id);
                                return (
                                <tr key={medicine.id}>
                                <td>{medicine["name"]}</td>
                                <td>{medicine["dosage"]}</td>
                                <td>{medicine["category"]}</td>
                                <td>{medicine["period"]}</td>
                                <td style={{"borderRight": "None"}}>
                                  <Checkbox
                                    disabled={isTaken}
                                    checked={isTaken || isSelected}
                                    onChange={() => handleGivenChange_M(medicine.id)}
                                    icon={<PlaylistAddRoundedIcon />}
                                    checkedIcon={<PlaylistAddCheckCircleIcon />}
                                    color="success"
                                  />
                                </td>
                              </tr>);
                             })}
                        </tbody> :
                         tabValue === 1 ? <tbody>
                             {dailyMedicinesN.map( medicine => {
                                const isTaken    = takenMeds_N.has(medicine.id);
                                const isSelected = selectedGivenMeds_N.has(medicine.id);
                                return (
                                <tr key={medicine.id}>
                                <td>{medicine["name"]}</td>
                                <td>{medicine["dosage"]}</td>
                                <td>{medicine["category"]}</td>
                                <td>{medicine["period"]}</td>
                                <td style={{"borderRight": "None"}}>
                                  <Checkbox
                                    disabled={isTaken}
                                    checked={isTaken || isSelected}
                                    onChange={() => handleGivenChange_N(medicine.id)}
                                    icon={<PlaylistAddRoundedIcon />}
                                    checkedIcon={<PlaylistAddCheckCircleIcon />}
                                    color="success"
                                  />
                                </td>
                              </tr>);
                             })}
                         </tbody> :
                         tabValue === 2 ? <tbody>
                             {dailyMedicinesE.map( medicine => {
                                const isTaken    = takenMeds_E.has(medicine.id);
                                const isSelected = selectedGivenMeds_E.has(medicine.id);
                                return (
                                <tr key={medicine.id}>
                                <td>{medicine["name"]}</td>
                                <td>{medicine["dosage"]}</td>
                                <td>{medicine["category"]}</td>
                                <td>{medicine["period"]}</td>
                                <td style={{"borderRight": "None"}}>
                                  <Checkbox
                                    disabled={isTaken}
                                    checked={isTaken || isSelected}
                                    onChange={() => handleGivenChange_E(medicine.id)}
                                    icon={<PlaylistAddRoundedIcon />}
                                    checkedIcon={<PlaylistAddCheckCircleIcon />}
                                    color="success"
                                  />
                                </td>
                              </tr>);
                             })}
                         </tbody> :
                            null}
                    </table>
              </div>


          </div>
        </div>
          <div className="half-medicine-column" style={{"height": "80px"}}>
          <div className="custom-button" style={{"display": "inline-flex", "width": "100%", "justifyContent": "space-between", "marginBottom": "15px"}}>

          <div style={{display: "grid", "width": "100%"}}>
            <h3>Kontrol Eden Hemşire:</h3>
            <label>{user.email}</label>
          </div>
          <button style={{backgroundColor: "#A695CC"}} onClick={submitGivenMeds}>İmza</button>
          </div>
        </div>
        </div>
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
          </div>
  );
}

export default MedicineForm;
