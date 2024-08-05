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
    let thresholds = {
        "heart_beat": { "low_risk": 50, "high_risk": 150 },
        "oxygen": { "low_risk": 50, "high_risk": 150 },
        "sleep": { "low_risk": 50, "high_risk": 150 },
        "stress": { "low_risk": 50, "high_risk": 150 },
        "vitality": { "low_risk": 50, "high_risk": 150 }
    }
    if (score.length === 0) {
        return "Okay"
    }
    else {
        score = score[-1]
    }

    if (!score) {
        return "Okay"
    }
    if ( score < thresholds[title]["low_risk"] || score > thresholds[title]["high_risk"] ) {
        return "Warning"
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

const RoomInfo = ({ block, floor, roomNumber }) => (
  <div className="room-info">
    <h3 className="title">Room</h3>
    <div className="details">
      <p>{block} | {floor} | {roomNumber} Room</p>
      <button className="change-room">Change Room</button>
    </div>
  </div>
);

const CareCategory = ({ category }) => (
  <div className="care-category">
    <h3 className="title">Care Category</h3>
    <div className="category">
        <p>{category}</p>
        <button className="change-category">Change Category</button>
    </div>
  </div>
);

const VitalScores = ({ scores }) => (
  <section className="vital-scores">
    <div className="vitals-title">
      <h3 className="title">Vital Scores</h3>
      <button className="see-details">See Details</button>
    </div>
    <hr className="separator"></hr>
    {Object.keys(scores).map(key => (
      <VitalScore title={key} score={scores[key].pop()} status={getStatus(key, scores[key])} />
    ))}

  </section>
);


const VitalScore = ({ title, score, status }) => (
  <section className="vital-score">
    <div className="vital">
      <h4 className="title">{getTitle(title)}</h4>

      {
      status.search("Good") !== -1 ?
        <div className="status-good">
          {score ? <p className="score">{score} {getUnitType(title)}</p> : null}
          <div loading="lazy" className="status-good-icon"></div>
          {status}
        </div>
          :
      status.search("Okay") !== -1 ?
        <div className="status-okay">
            {score ? <p className="score">{score} {getUnitType(title)}</p> : null}
          <div loading="lazy" className="status-okay-icon"></div>
          {status}
        </div>
          :
      status.search("Warning") !== -1 ?
        <div className="status-warning">
            {score ? <p className="score">{score} {getUnitType(title)}</p> : null}
          <div loading="lazy" className="status-warning-icon"></div>
          {status}
        </div>
          :
          null}

    </div>
  </section>
);

function PatientProfileComponent({ selectedPatient }) {

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
            <RoomInfo
              floor={selectedPatient.floor_no}
            />
            <hr className="separator" />
            <CareCategory
              category={selectedPatient.care_category}
            />
            <hr className="separator" />
         </div>
         <div className="profile-container-bottom">
             <VitalScores
              scores={selectedPatient.patient_vitals}
            />
         </div>
     </article>
  );
}
export default PatientProfileComponent;
