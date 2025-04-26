import * as React from "react";
import './patient_profile_component.css'


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

function PatientProfileComponent({ selectedPatient, setNewRoomContainer, setNewCareCategoryContainer }) {

    const handleNewRoom = () => {
        setNewRoomContainer(true)
    }

    const handleNewCareCategory = () => {
        setNewCareCategoryContainer(true)
    }

    return (
     <article className="profile-container-general">
         <div className="profile-container-top">
            <PersonInfo
              patientPhoto={selectedPatient.patient_photo}
              name={selectedPatient.first_name}
              surname={selectedPatient.last_name}
              gender={selectedPatient.gender}
              age={selectedPatient.date_of_birth}
              bloodType={selectedPatient.blood_type}
              height={selectedPatient.height}
              weight={selectedPatient.weight}
            />
            <hr className="separator" />
            <div className="room-info">
                <h3 className="title">Room</h3>
                <div className="details">
                  <p>{selectedPatient.floor_no}</p>
                  <button className="change-room" onClick={handleNewRoom}>Change Room</button>
                </div>
            </div>
            <hr className="separator" />
            <div className="care-category">
            <h3 className="title">Care Category</h3>
            <div className="category">
                <p>{selectedPatient.care_category}</p>
                <button className="change-category" onClick={handleNewCareCategory}>Change Category</button>
            </div>
          </div>
            <hr className="separator" />
         </div>
         <div className="profile-container-bottom">
            <section className="vital-scores">
            <div className="vitals-title">
              <h3 className="title">Vital Scores</h3>
              <button className="see-details">See Details</button>
            </div>
            <hr className="separator"></hr>
            {selectedPatient.patient_vitals.length !== 0 ? Object.keys(selectedPatient.patient_vitals).map(key => (
              <VitalScore key={key} title={key} score={selectedPatient.patient_vitals[key]}
                          status={getStatus(key, selectedPatient.patient_vitals[key])} />
            )) : null}
         </section>
         </div>
     </article>
  );
}
export default PatientProfileComponent;
