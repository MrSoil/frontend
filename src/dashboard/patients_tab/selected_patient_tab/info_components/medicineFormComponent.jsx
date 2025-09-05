import * as React from "react";
import './medicine_form_component.css'
import {useEffect, useState} from "react";
import { Tab, Tabs } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

    return gender + ", " + str_age + " years old"
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

function MedicineForm({ selectedPatient, setSelectedPatient, setNewMedicineContainer, medicinesDate }) {
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
  const dict_key = reformatDjangoDate(medicinesDate)
  console.log(dict_key)
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
    setSelectedGivenMeds_M(prev => {
      const next = new Set(prev);
      if (next.has(medId)) next.delete(medId);
      else next.add(medId);
      return next;
    });
  };

    const handleGivenChange_N = medId => {
    setSelectedGivenMeds_N(prev => {
      const next = new Set(prev);
      if (next.has(medId)) next.delete(medId);
      else next.add(medId);
      return next;
    });
  };

      const handleGivenChange_E = medId => {
    setSelectedGivenMeds_E(prev => {
      const next = new Set(prev);
      if (next.has(medId)) next.delete(medId);
      else next.add(medId);
      return next;
    });
  };

  const submitGivenMeds = () => {
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

    const payload = payload_M.concat(payload_N).concat(payload_E)

    console.log(payload)
    // setTakenMeds(prev => new Set([...prev, ...selectedGivenMeds]));
    // setSelectedGivenMeds(new Set());

    for (let i = 0; i < payload.length; i++) {
        fetch("http://localhost:8000/api/patients/", {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({
              "patient_id": payload[i]["patient_id"],
              "email": payload[i]["email"],
              "type": payload[i]["type"],
              "medicine_id": payload[i]["medicine_id"],
              "period": payload[i]["period"],
              "today_date": payload[i]["today_date"]
          })
        })
        .then(r => r.json())
        .then(() => {
          // merge newly given into takenMeds and clear selection
          setTakenMeds_M(prev => new Set([...prev, ...selectedGivenMeds_M]));
          setTakenMeds_N(prev => new Set([...prev, ...selectedGivenMeds_N]));
          setTakenMeds_E(prev => new Set([...prev, ...selectedGivenMeds_E]));

          setSelectedGivenMeds_M(new Set());
          setSelectedGivenMeds_N(new Set());
          setSelectedGivenMeds_E(new Set());
        })
        .catch(console.error);
    }
  };

  const updateSelectedPatient = (email) => {
    setIsLoading(true);
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
        const selectedPatientNew = resp.data[0];
        if (selectedPatient !== selectedPatientNew){
          setSelectedPatient(selectedPatientNew);
        }
        const values_M = []
        const values_N = []
        const values_E = []

        for (var key in selectedPatientNew.patient_medicines) {
          var medicine = selectedPatientNew.patient_medicines[key];
          if (dict_key in medicine["medicine_data"]["given_dates"]["morning"]) values_M.push(medicine["medicine_id"])
          if (dict_key in medicine["medicine_data"]["given_dates"]["noon"]) values_N.push(medicine["medicine_id"])
          if (dict_key in medicine["medicine_data"]["given_dates"]["evening"]) values_E.push(medicine["medicine_id"])
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
        Object.entries(meds).forEach(([medId, record]) => {
          const buildEntry = (period) => ({
              id: medId,
              name: record.medicine_data.name,
              category: record.medicine_data.category,
              dosage: record.medicine_data.medicine_dosage[period],
              fullness: record.medicine_data.fullness_options[period],
              days: record.medicine_data.selected_days[period],
              period: periodMap[period],
              given: getTodayForDjango() in record.medicine_data.given_dates[period],
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

  useEffect(() => {
      updateSelectedPatient(user.email)
    }, [user.email]);

  if (isLoading) {
    return <div>Loading...</div>;
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


      <div className="content">
        <div>
          <div style={{"height": "250px","width": "450px", "marginBottom": "15px"}}>
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
           <div className="room-info" style={{"padding": "10px", "paddingLeft": "20px"}}>
            <h3 className="title">Oda</h3>
            <div className="details">
              <p style={{"marginTop": "0"}}>{selectedPatient.floor_no}</p>
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
              <button style={{"backgroundColor": "#A695CC"}}>Not Ekle</button>
            </div>
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
                              Dozaj (miligram)
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
                      {/*        Dozaj (miligram)*/}
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
                                  <input
                                    type="checkbox"
                                    disabled={isTaken}
                                    checked={isTaken || isSelected}
                                    onChange={() => handleGivenChange_M(medicine.id)}
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
                                  <input
                                    type="checkbox"
                                    disabled={isTaken}
                                    checked={isTaken || isSelected}
                                    onChange={() => handleGivenChange_N(medicine.id)}
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
                                  <input
                                    type="checkbox"
                                    disabled={isTaken}
                                    checked={isTaken || isSelected}
                                    onChange={() => handleGivenChange_E(medicine.id)}
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
            <label>İsa Yusuf ORAK</label>
          </div>
          <button style={{backgroundColor: "#A695CC"}} onClick={submitGivenMeds}>İmza</button>
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
