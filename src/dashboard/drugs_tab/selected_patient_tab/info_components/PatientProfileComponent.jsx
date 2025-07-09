import * as React from "react";
import './patient_profile_component.css'
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";


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

    return gender + ", " + str_age + " years old"
};

const getStatus = ( title, score ) => {
    let okay_thresholds = {
        "heart_beat": { "low_risk": 51, "high_risk": 149 },
        "oxygen": { "low_risk": 51, "high_risk": 149 },
        "sleep": { "low_risk": 51, "high_risk": 149 },
        "stress": { "low_risk": 51, "high_risk": 149 },
        "vitality": { "low_risk": 51, "high_risk": 149 }
    }

    let good_thresholds = {
        "heart_beat": { "low_risk": 71, "high_risk": 89 },
        "oxygen": { "low_risk": 71, "high_risk": 89 },
        "sleep": { "low_risk": 71, "high_risk": 89 },
        "stress": { "low_risk": 71, "high_risk": 89 },
        "vitality": { "low_risk": 71, "high_risk": 89 }
    }

    if (score.length === 0) {
        return "None"
    }
    else {
        score = score[score.length - 1]
    }

    if ( score < okay_thresholds[title]["low_risk"] || score > okay_thresholds[title]["high_risk"] ) {
        return "Warning"
    }

    if ( score < good_thresholds[title]["low_risk"] || score > good_thresholds[title]["high_risk"] ) {
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
        "oxygen": "???",
        "sleep": "???",
        "stress": "???",
        "vitality": "???"
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


const VitalScore = ({ title, score, status }) => (
  <section className="vital-score">
    <div className="vital">
      <h4 className="title">{getTitle(title)}</h4>
      {
      status.search("Good") === 0 ?
        <div className="status-good">
          {score.length > 0 ? <p className="score">{score[score.length - 1]} {getUnitType(title)}</p> : null}
          <div loading="lazy" className="status-good-icon"></div>
          {status}
        </div>
          :
      status.search("Okay") === 0 ?
        <div className="status-okay">
            {score.length > 0 ? <p className="score">{score[score.length - 1]} {getUnitType(title)}</p> : null}
          <div loading="lazy" className="status-okay-icon"></div>
          {status}
        </div>
          :
      status.search("Warning") === 0 ?
        <div className="status-warning">
            {score.length > 0 ? <p className="score">{score[score.length - 1]} {getUnitType(title)}</p> : null}
          <div loading="lazy" className="status-warning-icon"></div>
          {status}
        </div>
          :
          // NONE CASE HAS "OKAY"
          <div className="status-okay">
          <div loading="lazy" className="status-okay-icon"></div>
          {status}
        </div>
      }
    </div>
  </section>
);

function PatientProfileComponent({ selectedPatientOuter, setNewRoomContainer, setNewCareCategoryContainer }) {
    const navigate = useNavigate();
    const params = useParams()
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPatient, setSelectedPatient] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));

    const handleNewRoom = () => {
        setNewRoomContainer(true)
    }

    const handleNewCareCategory = () => {
        setNewCareCategoryContainer(true)
    }
    const getPatient = (email) => {
    if (selectedPatientOuter != null) {
        setSelectedPatient(selectedPatientOuter)
    }
    else {
        fetch(`http://localhost:8000/api/patients/?email=${email}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
        .then(r => r.json())
        .then(resp => {
          // Assuming the backend sends back a JSON response indicating success or failure
          if (resp.status === "success") {
            let patients = resp.data;
            for (let i = 0; i < patients.length; i++) {
                console.log(patients[i].patient_id)
                console.log(params.id)
              if (params.id == patients[i].patient_id) {
                setSelectedPatient(patients[i])
                console.log(patients[i])
                setIsLoading(false);
              }
            }
          } else {
              console.log("TEST")
            setIsLoading(true);
          }
        }
        )
        .catch(error => {
          setIsLoading(true);
        });
    }


  }

    useEffect(() => {
        getPatient(user.email);
    }, [user.email]);


    if (isLoading) {
    return <div>Loading...</div>;
    }

    return (
     <article className="profile-container-drug-general">
         <div className="profile-container-drug-top">
            <PersonInfo
              patientPhoto={selectedPatient.patient_personal_info.section_1.image}
              name={selectedPatient.patient_personal_info.section_1.firstname}
              surname={selectedPatient.patient_personal_info.section_1.last_name}
              gender={selectedPatient.patient_personal_info.section_1.patientGender}
              age={selectedPatient.patient_personal_info.section_1.dateOfBirth}
              bloodType="{selectedPatient.patient_personal_info.section_1.blood_type}"
              height={selectedPatient.patient_personal_info.section_1.patientHeight}
              weight={selectedPatient.patient_personal_info.section_1.patientWeight}
            />
            <hr className="separator" />
            <div className="room-info">
                <h3 className="title">Room</h3>
                <div className="details">
                  <p>{selectedPatient.floor_no}</p>
                </div>
            </div>

         </div>
     </article>
  );
}
export default PatientProfileComponent;
