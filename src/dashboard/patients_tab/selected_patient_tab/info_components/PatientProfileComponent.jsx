import * as React from "react";
import { useState, useEffect } from "react";
import './patient_profile_component.css'
import { API_BASE_URL } from "../../../../config";


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
        "heart_beat": "Heart Beat",
        "oxygen": "Oxygen",
        "sleep": "Sleep",
        "stress": "Stress",
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


const PersonInfo = ({ patientPhoto, name, surname, gender, age, bloodType, height, weight }) => (
  <div className="person-info">
    <div className="person-photo">
      <img
        loading="lazy"
        src={`data:image/*;base64,${patientPhoto}`}
        alt={`${name} ${surname}`}
        className="photo"
      />
    </div>
    <div className="info">
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
    if (status === "Good") return `${title === "heart_beat" ? "HR" : title === "oxygen" ? "OX" : title === "stress" ? "ST" : title === "sleep" ? "SP" : "VT"}: Good`;
    if (status === "Okay") return `${title === "heart_beat" ? "HR" : title === "oxygen" ? "OX" : title === "stress" ? "ST" : title === "sleep" ? "SP" : "VT"}: Okay`;
    if (status === "Warning") return `${title === "heart_beat" ? "HR" : title === "oxygen" ? "OX" : title === "stress" ? "ST" : title === "sleep" ? "SP" : "VT"}: Warning`;
    return "";
  };

  return (
    <section className="vital-score">
      <div className="vital">
        <h4 className="title">{getTitle(title)}</h4>
        <div className="vital-right">
          {displayValue !== null && (
            <p className="score">{displayValue} {getUnitType(title)}</p>
          )}
          {
          status === "Good" ?
            <div className="status-good">
              <div className="status-good-icon">✓</div>
              <span>{getStatusLabel(status)}</span>
            </div>
              :
          status === "Okay" ?
            <div className="status-okay">
              <div className="status-okay-icon">—</div>
              <span>{getStatusLabel(status)}</span>
            </div>
              :
          status === "Warning" ?
            <div className="status-warning">
              <div className="status-warning-icon">✗</div>
              <span>{getStatusLabel(status)}</span>
            </div>
              :
              // NONE CASE
              <div className="status-okay">
              <div className="status-okay-icon">—</div>
              <span>No data</span>
            </div>
          }
        </div>
      </div>
    </section>
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

function PatientProfileComponent({ selectedPatient, setNewRoomContainer, setNewCareCategoryContainer }) {
    const [showAddVitalsModal, setShowAddVitalsModal] = useState(false);
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
     <article className="profile-container-general">
         <div className="profile-container-top">
            <PersonInfo
              patientPhoto={selectedPatient.patient_personal_info.section_1.image}
              name={selectedPatient.patient_personal_info.section_1.firstname}
              surname={selectedPatient.patient_personal_info.section_1.last_name}
              gender={selectedPatient.patient_personal_info.section_1.patientGender}
              age={selectedPatient.patient_personal_info.section_1.dateOfBirth}
              bloodType={selectedPatient.patient_personal_info.section_1.bloodType.toUpperCase()}
              height={selectedPatient.patient_personal_info.section_1.patientHeight}
              weight={selectedPatient.patient_personal_info.section_1.patientWeight}
            />
            <hr className="separator" />
            <div className="room-info">
                <h3 className="title">Oda</h3>
                <div className="details">
                  <p>{selectedPatient.patient_personal_info.section_1.patientRoom}</p>
                </div>
            </div>
            <hr className="separator" />
            <div className="care-category">
                <h3 className="title">Bakım Kategorisi</h3>
                <div className="category">
                    <p>Aktif Yaşam</p>
                </div>
          </div>
            <hr className="separator" />
         </div>
         <div className="profile-container-bottom">
            <section className="vital-scores">
            <div className="vitals-title">
              <h3 className="title">Vital Değerler</h3>
              <button className="btn-add-vitals" onClick={() => setShowAddVitalsModal(true)}>Ekle</button>
            </div>
            <hr className="separator"></hr>
            {vitalTypes.map(key => {
              const score = patientVitals[key] || [];
              return (
                <VitalScore 
                  key={key} 
                  title={key} 
                  score={score}
                  status={getStatus(key, score)} 
                />
              );
            })}
         </section>
         </div>
         <AddVitalsModal
           isOpen={showAddVitalsModal}
           onClose={() => setShowAddVitalsModal(false)}
           onSave={handleVitalsSaved}
           patientId={selectedPatient.patient_id}
           userEmail={user.email}
         />
     </article>
  );
}
export default PatientProfileComponent;
