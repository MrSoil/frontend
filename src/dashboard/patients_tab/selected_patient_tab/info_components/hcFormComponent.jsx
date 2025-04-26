import * as React from "react";
import './hc_form_component.css'
import {useState} from "react";


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

function HCForm({ selectedPatient, setNewHCContainer }) {

  const onCancelCareClick = () => {
      setNewHCContainer(false)
  }

  const [hygieneCheckDaily, setHygieneCheckDaily] = useState({
    mouthCare: false,
    faceWash: false,
    earCleaning: false,
    bodyCheck: false,
  });

  const [hygieneCheckWeekly, setHygieneCheckWeekly] = useState({
    mouthCare: false,
    faceWash: false,
    earCleaning: false,
    bodyCheck: false,
  });

  const [mealCheck, setMealCheck] = useState({
    mouthCare: false,
    faceWash: false,
    earCleaning: false,
    bodyCheck: false,
  });

  const [postureCheck, setPostureCheck] = useState({
    mouthCare: false,
    faceWash: false,
    earCleaning: false,
    bodyCheck: false,
  });

  const [feedingNote, setFeedingNote] = useState('');
  const [selectedNote, setSelectedNote] = useState('');

  const [roomChecks, setRoomChecks] = useState(
    new Array(12).fill(false)
  );

  const [oldNotes, setOldNotes] = useState([{
      note_date: "15.09.23",
      note_title: "Test1",
      note_data: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },{
      note_date: "15.09.23",
      note_title: "Test2",
      note_data: "bbbbb",
    }])

  const toggleHygieneDaily = (key) => {
    setHygieneCheckDaily({
      ...hygieneCheckDaily,
      [key]: !hygieneCheckDaily[key],
    });
  };

  const toggleHygieneWeekly = (key) => {
    setHygieneCheckWeekly({
      ...hygieneCheckWeekly,
      [key]: !hygieneCheckWeekly[key],
    });
  };

  const toggleMealCheck = (key) => {
    setMealCheck({
      ...mealCheck,
      [key]: !mealCheck[key],
    });
  };

  const togglePosture = (key) => {
    setPostureCheck({
      ...postureCheck,
      [key]: !postureCheck[key],
    });
  };

  const toggleRoomCheck = (index) => {
    setRoomChecks(roomChecks.map((check, i) =>
      i === index ? !check : check
    ));
  };

  return (
    <div className="blackout-container">
            <div className="blackout"></div>
            <div className="blackout-care-page-container">
                <div className="care-page">
      <div className="content">
        <div className="header">
          <h2>Bakım - Aktif Yaşam</h2>
        </div>
        <div className="header" style={{justifyContent: "center"}}>
          <h3>Ahmet John Sugardoeoğlu</h3>
        </div>
        <div className="header" style={{justifyContent: "right"}}>
          <h4>01.25.2025 - 21:00</h4>
          <button className="close-button" aria-label="Close alert" type="button" onClick={onCancelCareClick}
                  style={{"border": "none", "backgroundColor": "inherit", "cursor": "pointer", "margin": "-2px 0 0 5px"}}>
            <h2 aria-hidden="true">&times;</h2>
          </button>
        </div>
      </div>
          <div className="divider"></div>


      <div className="content">
        <div className="care-column">
          <div>
          <h3>Hijyen Gereksinimleri</h3>
          <div className="divider-low-margin"></div>
          <div>
            <h4>Günlük Gereksinimler</h4>
            {Object.keys(hygieneCheckDaily).map((key) => (
              <div className="each-point" key={key}>
                <label>{key}</label>
                <input type="checkbox" checked={hygieneCheckDaily[key]} onChange={() => toggleHygieneDaily(key)} />
              </div>
            ))}
          </div>
          <div style={{marginTop: "10px"}}>
            <h4>Haftalık Gereksinimler</h4>
            {Object.keys(hygieneCheckWeekly).map((key) => (
              <div className="each-point" key={key}>
                <label>{key}</label>
                <input type="checkbox" checked={hygieneCheckWeekly[key]} onChange={() => toggleHygieneWeekly(key)} />
              </div>
            ))}
          </div>
          </div>
          <div style={{marginTop: "20px"}}>
          <h3>Beslenme Takibi</h3>
          <div className="divider-low-margin"></div>
          <div>
            {Object.keys(mealCheck).map((key) => (
              <div className="each-point" key={key}>
                <label>{key}</label>
                <input type="checkbox" checked={mealCheck[key]} onChange={() => toggleMealCheck(key)} />
              </div>
            ))}
          </div>
          <div style={{marginTop: "10px"}}>
            <h4>Pozisyon Takibi</h4>
            {Object.keys(postureCheck).map((key) => (
              <div className="each-point" key={key}>
                <label>{key}</label>
                <input type="checkbox" checked={postureCheck[key]} onChange={() => togglePosture(key)} />
              </div>
            ))}
          </div>
          </div>
        </div>

        <div className="care-column">
          <h3>Hijyen Gereksinimleri</h3>
          <div>
            <h4>Günlük Gereksinimler</h4>
          </div>
        </div>

        <div >
          <div className="half-care-column">
            <h3>Bakım Notları</h3>
            <div className="divider"></div>
            <div className="care-notes">
              {oldNotes.map((note, index) => (
                <PatientNotes className="care-note" key={index} note={note} />
              ))}
            </div>
            <div className="divider"></div>
            <h4 style={{marginBottom: "10px"}}>{selectedNote ? selectedNote : "Başlık Seçiniz"}</h4>
            <textarea placeholder="Notunuzu giriniz..." value={feedingNote} onChange={(e) => setFeedingNote(e.target.value)} />
            <h5>Konu Başlığı</h5>
            <div className="half-care-note-submit">
              <select onChange={(e) => setSelectedNote(e.target.value)}>
                <option>Başlık Seçiniz</option>
                <option>Hijyen Gereksinimleri</option>
                <option>Beslenme Takibi</option>
              </select>
              <button style={{"background-color": "#A695CC"}}>Not Ekle</button>
            </div>
          </div>

          <div className="half-care-column">
          <h3>Oda Kontrolü</h3>
          <div className="divider"></div>
          <div className="room-checks">
            {roomChecks.map((checked, index) => (
              <div key={index} className={`room-check ${checked ? 'checked' : ''}`} onClick={() => toggleRoomCheck(index)}>
                {`${8 + index}:00 Kontrol edildi`}
              </div>
            ))}
          </div>
          <label>Kontrol Eden Hemşire: İsa Yusuf ORAK</label>
          <div style={{display: "inline-flex", "width": "100%", "justify-content": "center", "margin-bottom": "15px"}}>
            <button style={{backgroundColor: "#A695CC", "margin-right": "5px"}}>İmza</button>
            <button style={{backgroundColor: "#E77169"}} onClick={onCancelCareClick}>Geri</button>
          </div>
        </div>
        </div>
      </div>
    </div>
            </div>
          </div>
  );
}

export default HCForm;
