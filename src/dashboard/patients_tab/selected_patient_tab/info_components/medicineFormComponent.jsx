import * as React from "react";
import './medicine_form_component.css'
import {useState} from "react";

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

function MedicineStatus({ date, medicine, dosage, timing, satisfaction, lastMod }) {
  return (
    <article className="medicine-status">
      <time className="medicine-date">{date}</time>
      <h4 className="medicine-name">
        {medicine} | {dosage}
        <span className="dosage-detail">(2 doses)</span>
      </h4>
      <p className="medicine-timing">{timing}</p>
      <div className="medicine-info">
        <div className="satisfaction-status">
          <span className="status-label">{satisfaction}</span>
          <div className="status-indicator" />
          <span className="label-text">Last Mod: {lastMod} h. ago</span>
        </div>
      </div>
    </article>
  );
}

const PersonInfo = ({ patientPhoto, name, surname, gender, age, bloodType, height, weight }) => (
  <div className="person-info" style={{"height": "70%","width": "100%", "border": "1px solid #D2D2D2"}}>
    <div className="person-photo" style={{"margin-left": "-10px"}}>
      <img
        loading="lazy"
        src={`data:image/*;base64,${patientPhoto}`}
        alt={`${name} ${surname}`}
        className="photo"
      />
    </div>
    <div className="info" style={{"margin-left": "-10px"}}>
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

function MedicineForm({ selectedPatient, setNewMedicineContainer }) {

  const onCancelCareClick = () => {
      setNewMedicineContainer(false)
  }
  const [dailyMedicinesM, setDailyMedicinesM] = useState([
    {
      date: "15.09.23 | Permanently",
      medicine: "Medicine A",
      dosage: "12 mg",
      timing: "Every morning | Full",
      satisfaction: "unsatisfied",
      lastMod: "16",
    },
    {
      date: "19.05.24 | 26.05.24",
      medicine: "Medicine B",
      dosage: "24 mg",
      timing: "Every 12 hours | Full",
      satisfaction: "unsatisfied",
      lastMod: "13",
    },
    {
      date: "19.05.24 | 26.05.24",
      medicine: "Medicine C",
      dosage: "1000 mg",
      timing: "Every night | Hungry",
      satisfaction: "unsatisfied",
      lastMod: "16",
    },
  ]);

  const [dailyMedicinesN, setDailyMedicinesN] = useState([
    {
      date: "15.09.23 | Permanently",
      medicine: "Medicine A",
      dosage: "12 mg",
      timing: "Every morning | Full",
      satisfaction: "unsatisfied",
      lastMod: "16",
    },
    {
      date: "19.05.24 | 26.05.24",
      medicine: "Medicine B",
      dosage: "24 mg",
      timing: "Every 12 hours | Full",
      satisfaction: "unsatisfied",
      lastMod: "13",
    },
    {
      date: "19.05.24 | 26.05.24",
      medicine: "Medicine C",
      dosage: "1000 mg",
      timing: "Every night | Hungry",
      satisfaction: "unsatisfied",
      lastMod: "16",
    },
  ]);

  const [dailyMedicinesE, setDailyMedicinesE] = useState([
    {
      date: "15.09.23 | Permanently",
      medicine: "Medicine A",
      dosage: "12 mg",
      timing: "Every morning | Full",
      satisfaction: "unsatisfied",
      lastMod: "16",
    },
    {
      date: "19.05.24 | 26.05.24",
      medicine: "Medicine B",
      dosage: "24 mg",
      timing: "Every 12 hours | Full",
      satisfaction: "unsatisfied",
      lastMod: "13",
    },
    {
      date: "19.05.24 | 26.05.24",
      medicine: "Medicine C",
      dosage: "1000 mg",
      timing: "Every night | Hungry",
      satisfaction: "unsatisfied",
      lastMod: "16",
    },
  ]);

  const [feedingNote, setFeedingNote] = useState('');
  const [selectedNoteTitle, setSelectedNoteTitle] = useState('');


  const [oldNotes, setOldNotes] = useState([{
      note_date: "15.09.23",
      note_title: "Test1",
      note_data: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },{
      note_date: "15.09.23",
      note_title: "Test2",
      note_data: "bbbbb",
    }])

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


      <div className="content">
        <div>
          <div style={{"height": "250px","width": "450px", "margin-bottom": "15px"}}>
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
           <div className="room-info" style={{"padding": "10px", "padding-left": "20px"}}>
            <h3 className="title">Oda</h3>
            <div className="details">
              <p style={{"margin-top": "0"}}>{selectedPatient.floor_no}</p>
            </div>
        </div>
          </div>
          <div className="half-medicine-column" style={{"height": "480px", "width": "450px"}}>
            <h3>İlaç Notları</h3>
            <div className="divider"></div>
            <div className="medicine-notes">
              {oldNotes.map((note, index) => (
                <PatientNotes key={index} note={note} />
              ))}
            </div>
            <div className="divider"></div>
            <h4 style={{marginBottom: "10px"}}>{selectedNoteTitle ? selectedNoteTitle : "Başlık Seçiniz"}</h4>
            <textarea placeholder="Notunuzu giriniz..." value={feedingNote} onChange={(e) => setFeedingNote(e.target.value)} />
            <h5>Konu Başlığı</h5>
            <div className="half-medicine-note-submit">
              <select onChange={(e) => setSelectedNoteTitle(e.target.value)}>
                <option>Başlık Seçiniz</option>
                <option>Hijyen Gereksinimleri</option>
                <option>Beslenme Takibi</option>
              </select>
              <button style={{"background-color": "#A695CC"}}>Not Ekle</button>
            </div>
          </div>
        </div>
        <div>
          <div className="half-medicine-column" style={{"height": "650px"}}>
          <h3>Günlük İlaç Takibi</h3>
          <div className="divider-low-margin"></div>
          <div style={{"display": "grid", "height": "90%"}}>
            <div >
              <h4>Sabah İçilecek İlaçlar</h4>
              {/*{Object.keys(dailyMedicinesM).map((key) => (*/}
              {/*  <div className="each-point" key={key}>*/}
              {/*    <label>{key}</label>*/}
              {/*    <input type="checkbox" checked={dailyMedicinesM[key]} onChange={() => toggleDailyMedicinesM(key)} />*/}
              {/*  </div>*/}
              {/*))}*/}
                <div className="medicine-scroll" style={{marginTop: "10px"}}>
              {dailyMedicinesM.map((medicine, index) => (
                <MedicineStatus key={index} {...medicine} />
              ))}
            </div>
            </div>
            <div className="divider-low-margin" style={{marginTop: "10px"}}></div>
            <div>
              <h4>Öğlen İçilecek İlaçlar</h4>
              {/*{Object.keys(dailyMedicinesN).map((key) => (*/}
              {/*  <div className="each-point" key={key}>*/}
              {/*    <label>{key}</label>*/}
              {/*    <input type="checkbox" checked={dailyMedicinesN[key]} onChange={() => toggleDailyMedicinesN(key)} />*/}
              {/*  </div>*/}
              {/*))}*/}
                <div className="medicine-scroll" style={{marginTop: "10px"}}>
              {dailyMedicinesN.map((medicine, index) => (
                <MedicineStatus key={index} {...medicine} />
              ))}
            </div>
            </div>
            <div className="divider-low-margin" style={{marginTop: "10px"}}></div>
            <div>
            <h4>Akşam İçilecek İlaçlar</h4>
            {/*{Object.keys(dailyMedicinesE).map((key) => (*/}
            {/*  <div className="each-point" key={key}>*/}
            {/*    <label>{key}</label>*/}
            {/*    <input type="checkbox" checked={dailyMedicinesE[key]} onChange={() => toggleDailyMedicinesE(key)} />*/}
            {/*  </div>*/}
            {/*))}*/}
                <div className="medicine-scroll" style={{marginTop: "10px"}}>
              {dailyMedicinesE.map((medicine, index) => (
                <MedicineStatus key={index} {...medicine} />
              ))}
            </div>
          </div>
          </div>
        </div>
          <div className="half-medicine-column" style={{"height": "80px"}}>
          <div style={{display: "inline-flex", "width": "100%", "justify-content": "space-between", "margin-bottom": "15px"}}>

          <div style={{display: "grid", "width": "100%"}}>
            <h3>Kontrol Eden Hemşire:</h3>
            <label>İsa Yusuf ORAK</label>
          </div>
            <button style={{backgroundColor: "#A695CC"}}>İmza</button>
          </div>
        </div>
        </div>
      </div>
    </div>
            </div>
          </div>
  );
}

export default MedicineForm;
