import * as React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
  Chip,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import { ArrowDropDown, Check, Remove, Close } from '@mui/icons-material';
import './patient_profile_component.css'
import { API_BASE_URL } from "../../../../config";
import PatientEditModal from "./PatientEditModal";


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

const getStatus = ( title, score ) => {
    let okay_thresholds = {
        "heart_beat": { "low_risk": 51, "high_risk": 149 },
        "oxygen": { "low_risk": 90, "high_risk": 100 },
        "sleep": { "low_risk": 70, "high_risk": 100 },
        "stress": { "low_risk": 0, "high_risk": 100 },
        "vitality": { "low_risk": 0, "high_risk": 100 }
    }

    let good_thresholds = {
        "heart_beat": { "low_risk": 60, "high_risk": 100 },
        "oxygen": { "low_risk": 95, "high_risk": 100 },
        "sleep": { "low_risk": 80, "high_risk": 100 },
        "stress": { "low_risk": 0, "high_risk": 50 },
        "vitality": { "low_risk": 50, "high_risk": 100 }
    }

    if (!score || score.length === 0) {
        return "None"
    }
    
    // Get the latest value
    let latestValue;
    if (Array.isArray(score)) {
        latestValue = score[score.length - 1];
        // If it's an object with value property, extract it
        if (typeof latestValue === 'object' && latestValue.value !== undefined) {
            latestValue = latestValue.value;
        }
    } else {
        latestValue = score;
    }

    if ( latestValue < okay_thresholds[title]["low_risk"] || latestValue > okay_thresholds[title]["high_risk"] ) {
        return "Warning"
    }

    if ( latestValue < good_thresholds[title]["low_risk"] || latestValue > good_thresholds[title]["high_risk"] ) {
        return "Okay"
    }

    return "Good"
};


const getTitle = ( title ) => {
    let titles = {
        "heart_beat": "Kalp Atış Hızı",
        "oxygen": "Oksijen",
        "sleep": "Uyku",
        "stress": "Stres",
        "vitality": "Vitality"
    }
    return titles[title]
};

const getUnitType = ( title ) => {
    let titles = {
        "heart_beat": "bpm",
        "oxygen": "%",
        "sleep": "%",
        "stress": "",
        "vitality": ""
    }
    return titles[title]
};


const PersonInfo = ({ patientPhoto, name, surname, gender, age, bloodType, height, weight, room }) => {
  const genderText = gender === 'Erkek' ? 'Erkek' : 'Kadın';
  const ageText = getGenderAge(age, gender).split(',')[1].trim();
  
  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Box
          component="img"
          src={`data:image/*;base64,${patientPhoto}`}
          alt={`${name} ${surname}`}
          sx={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ fontFamily: 'RedHatDisplay', fontWeight: 600, mb: 0.5 }}>
            {name} {surname}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'RedHatDisplay', color: '#717070' }}>
            {room}
          </Typography>
        </Box>
        <IconButton size="small">
          <ArrowDropDown />
        </IconButton>
      </Stack>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Chip 
          label={genderText} 
          size="small" 
          sx={{ 
            backgroundColor: '#E3F2FD', 
            color: '#1976D2',
            fontFamily: 'RedHatDisplay',
            fontWeight: 500
          }} 
        />
        <Chip 
          label={ageText} 
          size="small" 
          sx={{ 
            backgroundColor: '#E3F2FD', 
            color: '#1976D2',
            fontFamily: 'RedHatDisplay',
            fontWeight: 500
          }} 
        />
        <Chip 
          label={`${weight} kg`} 
          size="small" 
          sx={{ 
            backgroundColor: '#E3F2FD', 
            color: '#1976D2',
            fontFamily: 'RedHatDisplay',
            fontWeight: 500
          }} 
        />
        <Chip 
          label={`${height} cm`} 
          size="small" 
          sx={{ 
            backgroundColor: '#E3F2FD', 
            color: '#1976D2',
            fontFamily: 'RedHatDisplay',
            fontWeight: 500
          }} 
        />
        <Chip 
          label={bloodType} 
          size="small" 
          sx={{ 
            backgroundColor: '#E3F2FD', 
            color: '#1976D2',
            fontFamily: 'RedHatDisplay',
            fontWeight: 500
          }} 
        />
      </Stack>
    </Box>
  );
};


const VitalScore = ({ title, score, status }) => {
  let displayValue = null;
  if (score && score.length > 0) {
    const latest = score[score.length - 1];
    if (typeof latest === 'object' && latest.value !== undefined) {
      displayValue = latest.value;
    } else {
      displayValue = latest;
    }
  }

  const getStatusLabel = (status) => {
    if (status === "Good") return "İyi";
    if (status === "Okay") return "Ortalama";
    if (status === "Warning") return "Kötü";
    return "Veri Yok";
  };

  const getStatusColor = (status) => {
    if (status === "Good") return { bg: '#40dba3', text: '#40dba3' };
    if (status === "Okay") return { bg: '#5F6767', text: '#5F6767' };
    if (status === "Warning") return { bg: '#E4756D', text: '#E4756D' };
    return { bg: '#5F6767', text: '#5F6767' };
  };

  const getStatusIcon = (status) => {
    if (status === "Good") return <Check sx={{ fontSize: 14, color: '#FFFFFF' }} />;
    if (status === "Okay") return <Remove sx={{ fontSize: 14, color: '#FFFFFF' }} />;
    if (status === "Warning") return <Close sx={{ fontSize: 14, color: '#FFFFFF' }} />;
    return <Remove sx={{ fontSize: 14, color: '#FFFFFF' }} />;
  };

  const statusColor = getStatusColor(status);

  return (
    <ListItem
      sx={{
        py: 0,
        px: 2,
        backgroundColor: '#FFFFFF'
      }}
    >
      <ListItemText
        primary={getTitle(title)}
        secondary={displayValue !== null ? `${displayValue} ${getUnitType(title)}` : 'Veri Yok'}
        primaryTypographyProps={{
          fontFamily: 'RedHatDisplay',
          fontSize: '16px',
          color: '#343738'
        }}
        secondaryTypographyProps={{
          fontFamily: 'RedHatDisplay',
          fontSize: '16px',
          color: '#343738',
          fontWeight: 500
        }}
      />
      <ListItemSecondaryAction>
        <Chip
          icon={
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: statusColor.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {getStatusIcon(status)}
            </Box>
          }
          label={getStatusLabel(status)}
          size="small"
          sx={{
            backgroundColor: 'transparent',
            color: statusColor.text,
            fontFamily: 'RedHatDisplay',
            fontWeight: 500,
            border: 'none',
            '& .MuiChip-icon': {
              marginLeft: 1
            }
          }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const AddVitalsModal = ({ isOpen, onClose, onSave, patientId, userEmail }) => {
  const [vitals, setVitals] = useState({
    heart_beat: "",
    oxygen: "",
    stress: "",
    sleep: "",
    vitality: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVitals(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const todayDate = new Date().toString();
    const vitalsData = {
      email: userEmail,
      type: "add_vitals",
      patient_id: patientId,
      vitals_data: vitals,
      today_date: todayDate
    };

    fetch(`${API_BASE_URL}/patients/`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vitalsData)
    })
    .then(r => r.json())
    .then(resp => {
      if (resp.status === "success") {
        onSave();
        onClose();
        // Reset form
        setVitals({
          heart_beat: "",
          oxygen: "",
          stress: "",
          sleep: "",
          vitality: ""
        });
      }
    })
    .catch(error => {
      console.error("Error saving vitals:", error);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Vital Değerleri Ekle</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="vital-input-group">
            <label>Nabız</label>
            <input
              type="number"
              name="heart_beat"
              value={vitals.heart_beat}
              onChange={handleChange}
              placeholder="XX"
            />
          </div>
          <div className="vital-input-group">
            <label>Kandaki Oksijen Miktarı</label>
            <input
              type="number"
              name="oxygen"
              value={vitals.oxygen}
              onChange={handleChange}
              placeholder="XX"
            />
          </div>
          <div className="vital-input-group">
            <label>Stres</label>
            <input
              type="number"
              name="stress"
              value={vitals.stress}
              onChange={handleChange}
              placeholder="XX"
            />
          </div>
          <div className="vital-input-group">
            <label>Uyku Kalitesi</label>
            <input
              type="number"
              name="sleep"
              value={vitals.sleep}
              onChange={handleChange}
              placeholder="XX"
            />
          </div>
          <div className="vital-input-group">
            <label>Canlılık</label>
            <input
              type="number"
              name="vitality"
              value={vitals.vitality}
              onChange={handleChange}
              placeholder="XX"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>İptal Et</button>
          <button className="btn-save" onClick={handleSave}>Kaydet</button>
        </div>
      </div>
    </div>
  );
};

function PatientProfileComponent({ selectedPatient, setNewRoomContainer, setNewCareCategoryContainer, onPatientUpdate }) {
    const [showAddVitalsModal, setShowAddVitalsModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [patientVitals, setPatientVitals] = useState({});
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const handleNewRoom = () => {
        setNewRoomContainer(true)
    }

    const handleNewCareCategory = () => {
        setNewCareCategoryContainer(true)
    }

    const fetchPatientData = () => {
      if (selectedPatient && selectedPatient.patient_id && user.email) {
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
            setPatientVitals(patientData.patient_vitals || {});
          }
        })
        .catch(error => {
          console.error("Error fetching patient data:", error);
        });
      }
    };

    useEffect(() => {
      if (selectedPatient && selectedPatient.patient_vitals) {
        setPatientVitals(selectedPatient.patient_vitals);
      } else {
        fetchPatientData();
      }
    }, [selectedPatient]);

    const handleVitalsSaved = () => {
      fetchPatientData();
    };

    const vitalTypes = ["heart_beat", "oxygen", "stress", "sleep", "vitality"];

    return (
      <Card sx={{ height: '100%', borderRadius: '24px', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 0 }}>
          <PersonInfo
            patientPhoto={selectedPatient.patient_personal_info.section_1.image}
            name={selectedPatient.patient_personal_info.section_1.firstname}
            surname={selectedPatient.patient_personal_info.section_1.lastname}
            gender={selectedPatient.patient_personal_info.section_1.patientGender}
            age={selectedPatient.patient_personal_info.section_1.dateOfBirth}
            bloodType={selectedPatient.patient_personal_info.section_1.bloodType.toUpperCase()}
            height={selectedPatient.patient_personal_info.section_1.patientHeight}
            weight={selectedPatient.patient_personal_info.section_1.patientWeight}
            room={selectedPatient.patient_personal_info.section_1.patientRoom}
          />
          
          <Divider />
          
          <Box sx={{ p: 2, pb: 1.5, pt: 1.5 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0 }}>
              <Typography variant="h6" sx={{ fontFamily: 'RedHatDisplay', fontWeight: 700, fontSize: '16px' }}>
                Oda
              </Typography>
              {/*<Button*/}
              {/*  size="small"*/}
              {/*  onClick={handleNewRoom}*/}
              {/*  sx={{*/}
              {/*    color: '#A695CC',*/}
              {/*    textTransform: 'none',*/}
              {/*    fontFamily: 'RedHatDisplay',*/}
              {/*    fontSize: '12px',*/}
              {/*    minWidth: 'auto',*/}
              {/*    px: 2*/}
              {/*  }}*/}
              {/*>*/}
              {/*  Düzenle*/}
              {/*</Button>*/}
            </Stack>
            <Typography variant="body2" sx={{ fontFamily: 'RedHatDisplay', color: '#717070', fontSize: '14px' }}>
              {selectedPatient.patient_personal_info.section_1.patientRoom}
            </Typography>
          </Box>

          <Divider />

          <Box sx={{ p: 2, pb: 1.5, pt: 1.5 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0 }}>
              <Typography variant="h6" sx={{ fontFamily: 'RedHatDisplay', fontWeight: 700, fontSize: '16px' }}>
                Bakım Kategorisi
              </Typography>
              {/*<Button*/}
              {/*  size="small"*/}
              {/*  onClick={handleNewCareCategory}*/}
              {/*  sx={{*/}
              {/*    color: '#A695CC',*/}
              {/*    textTransform: 'none',*/}
              {/*    fontFamily: 'RedHatDisplay',*/}
              {/*    fontSize: '12px',*/}
              {/*    minWidth: 'auto',*/}
              {/*    px: 2*/}
              {/*  }}*/}
              {/*>*/}
              {/*  Düzenle*/}
              {/*</Button>*/}
            </Stack>
            <Typography variant="body2" sx={{ fontFamily: 'RedHatDisplay', color: '#717070', fontSize: '14px' }}>
              Aktif Yaşam
            </Typography>
          </Box>

          <Divider />

          <Box sx={{ p: 2, pb: 1.5, pt: 1.5}}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0 }}>
              <Typography variant="h6" sx={{ fontFamily: 'RedHatDisplay', fontWeight: 700, fontSize: '16px' }}>
                Kişisel Bilgiler
              </Typography>
              <Button
                size="small"
                onClick={() => setShowEditModal(true)}
                sx={{
                  color: '#A695CC',
                  textTransform: 'none',
                  fontFamily: 'RedHatDisplay',
                  fontSize: '12px',
                  minWidth: 'auto',
                  px: 2
                }}
              >
                Düzenle
              </Button>
            </Stack>
            <Typography variant="body2" sx={{ fontFamily: 'RedHatDisplay', color: '#717070', fontSize: '14px' }}>
              Tamamlandı
            </Typography>
          </Box>

          <Divider />

          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2, pb: 1.5, pt: 1.5 }}>
              <Typography variant="h6" sx={{ fontFamily: 'RedHatDisplay', fontWeight: 700, fontSize: '16px' }}>
                Vital Değerler
              </Typography>
              <Button
                size="small"
                onClick={() => setShowAddVitalsModal(true)}
                sx={{
                  color: '#A695CC',
                  textTransform: 'none',
                  fontFamily: 'RedHatDisplay',
                  fontSize: '12px',
                  minWidth: 'auto',
                  px: 2
                }}
              >
                Düzenle
              </Button>
            </Stack>
            <List sx={{ p: 0, flexGrow: 1 }}>
              {vitalTypes.map((key, index) => {
                const score = patientVitals[key] || [];
                return (
                  <React.Fragment key={key}>
                    <VitalScore 
                      title={key} 
                      score={score}
                      status={getStatus(key, score)} 
                    />
                    {index < vitalTypes.length - 1 && <Divider />}
                  </React.Fragment>
                );
              })}
            </List>
          </Box>
        </CardContent>
        <AddVitalsModal
          isOpen={showAddVitalsModal}
          onClose={() => setShowAddVitalsModal(false)}
          onSave={handleVitalsSaved}
          patientId={selectedPatient.patient_id}
          userEmail={user.email}
        />
        <PatientEditModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          selectedPatient={selectedPatient}
          onSave={() => {
            handleVitalsSaved();
            if (onPatientUpdate) {
              onPatientUpdate();
            }
          }}
        />
      </Card>
    );
}
export default PatientProfileComponent;
