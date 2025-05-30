import * as React from "react";
import {useEffect, useState} from "react";
import './patients_tab_general.css'

function PatientCard({ patient, setGeneralTab, setFunction }) {
  const patientClickHandle = () => {
    setGeneralTab(false)
    setFunction(patient)
    console.log(patient)
  }

  return (
    <div className="patient-card" onClick={patientClickHandle}>
      <div className="patient-info">
        <img src={`data:image/*;base64,${patient.patient_photo}`}  alt={patient.first_name} className="patient-avatar" />
        <div className="patient-details">
          <div className="patient-name">{patient.first_name} {patient.last_name}</div>
          <div className="patient-location">{patient.floor_no}</div>
        </div>
      </div>
    </div>
  );
}

function Patients({ setGeneralTab, setSelectedPatient }) {
  const [isLoading, setIsLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const getPatients = (email) => {

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
        setPatients(resp.data);
      } else {
        setPatients([]);
      }
      setIsLoading(false);
    }
    )
    .catch(error => {
      setIsLoading(false);
      setPatients([]);
    });

  }

  useEffect(() => {
    getPatients(user.email);
    }, [user.email]);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="patients-container">
      <header className="patients-header">
        <h1 className="patients-title">Patients</h1>
        <div className="search-container">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/73cfc69292ab17af86d8b52564eb88a46395310b083bdbeb1a13a02d459da66b?apiKey=873db62e82664057a5c151e6201a84f6&" alt="Search icon" className="search-icon" />
          <input className="search-text" onChange={handleChange} value={searchInput} placeholder="Hasta Ara"/>
        </div>
        {/*<div className="sort-container">*/}
        {/*  <div className="sort-label">Sort by</div>*/}
        {/*  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c0e13445603ee573726da0b50f3dd707e180c6fe75efad7ad36ad5455af5542f?apiKey=873db62e82664057a5c151e6201a84f6&" alt="Sort icon" className="sort-icon" />*/}
        {/*</div>*/}
      </header>
      <div className="divider" />
      <div className="patients-grid">
        {patients.filter((patient) =>
        {
          let full_name = patient.first_name + " " + patient.last_name;
          return patient.first_name.toLowerCase().includes(searchInput.toLowerCase()) ||
              patient.last_name.toLowerCase().includes(searchInput.toLowerCase()) ||
              full_name.toLowerCase().includes(searchInput.toLowerCase()) ||
              patient.floor_no.toLowerCase().includes(searchInput.toLowerCase());
        }).map((patient, index) => (
          <PatientCard key={index} patient={patient} setGeneralTab={setGeneralTab} setFunction={setSelectedPatient} value={patient}/>
        ))}
      </div>
    </div>
  );
}

export default Patients;