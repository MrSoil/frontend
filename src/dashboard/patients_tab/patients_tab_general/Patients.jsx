import * as React from "react";
import {useEffect, useState, useRef} from "react";
import {useSearchParams, useNavigate} from "react-router-dom";
import './patients_tab_general.css'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { API_BASE_URL } from "../../../config";

function PatientCard({ patient, setGeneralTab, setFunction }) {
  const patientClickHandle = () => {
    setGeneralTab(false)
    setFunction(patient)
  }

  return (
    <div className="patient-card" onClick={patientClickHandle}>
      <div className="patient-info">
        <img src={`data:image/*;base64,${patient.patient_personal_info.section_1.image}`}  alt={patient.patient_personal_info.section_1.firstname} className="patient-avatar" />
        <div className="patient-details">
          <div className="patient-name">{patient.patient_personal_info.section_1.firstname} {patient.patient_personal_info.section_1.lastname}</div>
          <div className="patient-location">
            {patient.patient_personal_info.section_1.patientGender}
          <br/>
            {patient.patient_personal_info.section_1.patientRoom}
          </div>
        </div>
      </div>
    </div>
  );
}

// Extract floor from room number like "Oda - 101"
const getFloorFromRoom = (roomString) => {
  if (!roomString) return null;
  const match = roomString.match(/Oda\s*-\s*(\d+)/i);
  if (match) {
    const roomNum = parseInt(match[1]);
    return Math.floor(roomNum / 100); // 101 → 1, 201 → 2
  }
  return null;
};

function Patients({ setGeneralTab, setSelectedPatient, setPatientsList }) {
  const [isLoading, setIsLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [searchInput, setSearchInput] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const floorFilter = searchParams.get("floor");
  const [showFloorSelector, setShowFloorSelector] = useState(false);
  const floorSelectorRef = useRef(null);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleFloorChange = (floorNumber) => {
    if (floorNumber === null) {
      // Clear filter - navigate without floor parameter
      navigate("/dashboard/patients");
    } else {
      // Set new floor filter
      navigate(`/dashboard/patients?floor=${floorNumber}`);
    }
    setShowFloorSelector(false);
  };

  const handleFloorIndicatorClick = (e) => {
    e.stopPropagation();
    setShowFloorSelector(!showFloorSelector);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!showFloorSelector) return;

    const handleClickOutside = (event) => {
      if (floorSelectorRef.current && !floorSelectorRef.current.contains(event.target)) {
        setShowFloorSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFloorSelector]);

  const getPatients = (email) => {

    fetch(`${API_BASE_URL}/patients/?email=${email}`, {
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
        setPatientsList(resp.data);
      } else {
        setPatients([]);
        setPatientsList([]);
      }
      setIsLoading(false);
    }
    )
    .catch(error => {
      setIsLoading(false);
      setPatients([]);
      setPatientsList([]);
    });

  }

  useEffect(() => {
    getPatients(user.email);
    }, [user.email]);

  // Calculate unique floors from patients
  const getFloorsWithPatients = () => {
    const floorsWithPatients = new Set();
    patients.forEach(patient => {
      const room = patient.patient_personal_info?.section_1?.patientRoom;
      const floor = getFloorFromRoom(room);
      if (floor) {
        floorsWithPatients.add(floor);
      }
    });
    return Array.from(floorsWithPatients).sort((a, b) => a - b);
  };

  const sortedFloors = getFloorsWithPatients();

  if (isLoading) {

    return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
  }

  return (
    <div className="patients-container">
      <header className="patients-header">
        <h1 className="patients-title">Danışan Raporları</h1>
        <div className="search-container">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/73cfc69292ab17af86d8b52564eb88a46395310b083bdbeb1a13a02d459da66b?apiKey=873db62e82664057a5c151e6201a84f6&" alt="Search icon" className="search-icon" />
          <input className="search-text" onChange={handleChange} value={searchInput} placeholder="Danışan Ara"/>
        </div>
        <div className="floor-filter-container" ref={floorSelectorRef}>
          <div 
            className="floor-filter-indicator"
            onClick={handleFloorIndicatorClick}
          >
            {floorFilter ? `Kat ${floorFilter} filtreleniyor` : 'Tümü filtreleniyor'}
            <span className="floor-filter-arrow">▼</span>
          </div>
          {showFloorSelector && (
            <div className="floor-selector-dropdown">
              <div 
                className={`floor-selector-option ${!floorFilter ? 'active' : ''}`}
                onClick={() => handleFloorChange(null)}
              >
                Tümü
              </div>
              {sortedFloors.map((floor) => (
                <div
                  key={floor}
                  className={`floor-selector-option ${floorFilter && parseInt(floorFilter) === floor ? 'active' : ''}`}
                  onClick={() => handleFloorChange(floor)}
                >
                  Kat {floor}
                </div>
              ))}
            </div>
          )}
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
          // Apply floor filter if present
          if (floorFilter) {
            const patientFloor = getFloorFromRoom(patient.patient_personal_info.section_1.patientRoom);
            if (patientFloor !== parseInt(floorFilter)) {
              return false;
            }
          }

          // Apply text search filter
          if (searchInput) {
            let fullName = patient.patient_personal_info.section_1.firstname + " " + patient.patient_personal_info.section_1.lastname;
            const matchesSearch = (
              patient.patient_personal_info.section_1.firstname.toLowerCase().startsWith(searchInput.toLowerCase()) ||
              patient.patient_personal_info.section_1.lastname.toLowerCase().startsWith(searchInput.toLowerCase()) ||
              fullName.toLowerCase().startsWith(searchInput.toLowerCase()) ||
              patient.patient_personal_info.section_1.patientRoom.toLowerCase().startsWith(searchInput.toLowerCase())
            );
            if (!matchesSearch) {
              return false;
            }
          }

          return true;
        }).map((patient, index) => (
          <PatientCard key={index} patient={patient} setGeneralTab={setGeneralTab} setFunction={setSelectedPatient} value={patient}/>
        ))}
      </div>
    </div>
  );
}

export default Patients;