import * as React from "react";
import './selected_patient.css'
import Select from 'react-select';
import {useState, useEffect} from "react";
import { API_BASE_URL } from "../../../config";
import PatientProfileComponent from "./info_components/PatientProfileComponent";
import Patients from "../drugs_tab_general/Patients";
import {useNavigate, useLocation, useParams} from "react-router-dom";
import NotesList from "../../drugs_tab/selected_patient_tab/info_components/notesComponent";
import MedicationTable from "./info_components/MedicationTable";
import MedicationForm from "./info_components/MedicationForm";
import MedicationSystemForm from "./info_components/MedicationSystemForm";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ArrowCircleLeftOutlined, ArrowCircleRightOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import PatientSelectionModal from "../../patients_tab/selected_patient_tab/PatientSelectionModal";

function SelectedPatientTab({ setSelectedPatient, selectedPatient }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const [isLoading, setIsLoading] = useState(true);
    const [newRoomContainer, setNewRoomContainer] = useState(false)
    const [newCareCategoryContainer, setNewCareCategoryContainer] = useState(false)

    const [newSystemMedicineContainer, setNewSystemMedicineContainer] = useState(false)
    const [newMedicineContainer, setNewMedicineContainer] = useState(false)
    const [medicineTabs, setMedicineTabs] = useState([false, false]);

    const [newNoteName, setNewNoteName] = useState("")
    const [newNoteDesc, setNewNoteDesc] = useState("")
    const [patientsList, setPatientsList] = useState([]);
    const [currentPatientIndex, setCurrentPatientIndex] = useState(0);
    const [showPatientSelectionModal, setShowPatientSelectionModal] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const getGeneralTab = () => {
        navigate("/dashboard/drugs")
    }

    const getPatients = (email) => {
      fetch(`${API_BASE_URL}/patients/?email=${email}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(r => r.json())
      .then(resp => {
        if (resp.status === "success") {
          setPatientsList(resp.data);
          // Find current patient index
          let patient_id = window.location.pathname.split("/");
          patient_id = patient_id[patient_id.length - 1];
          const index = resp.data.findIndex(p => p.patient_id === patient_id);
          if (index !== -1) {
            setCurrentPatientIndex(index);
          }
        }
      })
      .catch(error => {
        console.error("Error fetching patients:", error);
      });
    };

    const updateSelectedPatient = (email) => {
        let patient_id = window.location.pathname.split("/");
        patient_id = patient_id[patient_id.length - 1];

        setIsLoading(true)
        fetch(`${API_BASE_URL}/patients/?email=${email}&patient_id=${patient_id}`, {
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
          setIsLoading(false)
          }
        }
        ).catch(error => {
            setIsLoading(true)
        });
    };

    const navigateToPreviousPatient = () => {
      if (currentPatientIndex > 0) {
        const newIndex = currentPatientIndex - 1;
        const patient = patientsList[newIndex];
        navigate(`/dashboard/drugs/patient/${patient.patient_id}`);
      }
    };

    const navigateToNextPatient = () => {
      if (currentPatientIndex < patientsList.length - 1) {
        const newIndex = currentPatientIndex + 1;
        const patient = patientsList[newIndex];
        navigate(`/dashboard/drugs/patient/${patient.patient_id}`);
      }
    };

  useEffect(() => {
      getPatients(user.email);
      updateSelectedPatient(user.email);
    }, [user.email]);

  // Watch for URL changes and reload patient data
  useEffect(() => {
    if (user.email && location.pathname.includes('/patient/')) {
      updateSelectedPatient(user.email);
    }
  }, [location.pathname, user.email]);

  useEffect(() => {
    // Update patient index when selectedPatient or patientsList changes
    if (patientsList.length > 0 && selectedPatient) {
      const index = patientsList.findIndex(p => p.patient_id === selectedPatient.patient_id);
      if (index !== -1 && index !== currentPatientIndex) {
        setCurrentPatientIndex(index);
      }
    }
  }, [selectedPatient, patientsList]);

  if (isLoading) {
    return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
  }

  return (
       <div className="dashboard-content-background">
        <div className="dashboard-content-navigator">
            <div className="dashboard-logo-design">SUGR.</div>
            <button className="navigator-button" onClick={getGeneralTab}
            >/ Müşteri İlaçları</button>
            {
            /*First Stage*/
            <button className="navigator-button">/ {selectedPatient.patient_personal_info.section_1.firstname} {selectedPatient.patient_personal_info.section_1.lastname}</button>
            }
        </div>
        <div className="dashboard-content-container">
            {newMedicineContainer !== false ?
          <div className="blackout-container">
            <div className="blackout"></div>
            <div className="blackout-content-container" style={{"maxHeight": "800px"}}>
          {/*      <div className={"formContainer"}>*/}
          {/*      <input*/}
          {/*          placeholder=" "*/}
          {/*          className={"formBox"} />*/}
          {/*      <label>New Care Category</label>*/}
          {/*</div>*/}
                <MedicationForm setSelectedPatient={setSelectedPatient} selectedPatient={selectedPatient} newMedicineContainer={newMedicineContainer} setNewMedicineContainer={setNewMedicineContainer}></MedicationForm>
            </div>
          </div>
          : newSystemMedicineContainer !== false ?
          <div className="blackout-container">
            <div className="blackout"></div>
            <div className="blackout-content-container" style={{"maxHeight": "800px"}}>
          {/*      <div className={"formContainer"}>*/}
          {/*      <input*/}
          {/*          placeholder=" "*/}
          {/*          className={"formBox"} />*/}
          {/*      <label>New Care Category</label>*/}
          {/*</div>*/}
                <MedicationSystemForm setNewSystemMedicineContainer={setNewSystemMedicineContainer}></MedicationSystemForm>
            </div>
          </div>
          : null}
        {/* Patient Navigation Arrows */}
        <div className="patient-navigation-container">
            <IconButton 
                className="nav-arrow"
                onClick={navigateToPreviousPatient}
                disabled={currentPatientIndex === 0}
                title="Previous Patient"
            >
                <ArrowCircleLeftOutlined sx={{ fontSize: 40 }} />
            </IconButton>
            <div className="patient-navigation-info">
                <span className="patient-counter">
                    {currentPatientIndex + 1} / {patientsList.length}
                </span>
                <button 
                    className="patient-name-button"
                    onClick={() => setShowPatientSelectionModal(true)}
                >
                    {selectedPatient?.patient_personal_info?.section_1?.firstname} {selectedPatient?.patient_personal_info?.section_1?.lastname}
                </button>
            </div>
            <IconButton 
                className="nav-arrow"
                onClick={navigateToNextPatient}
                disabled={currentPatientIndex === patientsList.length - 1}
                title="Next Patient"
            >
                <ArrowCircleRightOutlined sx={{ fontSize: 40 }} />
            </IconButton>
        </div>
        <div className="dashboard-drugs-profile-container">

         <PatientProfileComponent selectedPatient={selectedPatient}
                                  setNewRoomContainer={setNewRoomContainer}
                                  setNewCareCategoryContainer={setNewCareCategoryContainer}/>
         <NotesList selectedPatient={selectedPatient}
                   />
      </div>
        <div className="dashboard-drugs-profile-container">

         <MedicationTable setNewMedicineContainer={setNewMedicineContainer} selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient} setNewSystemMedicineContainer={setNewSystemMedicineContainer} />
      </div>

    </div>
           <PatientSelectionModal
      isOpen={showPatientSelectionModal}
      onClose={() => setShowPatientSelectionModal(false)}
      patientsList={patientsList}
      selectedPatient={selectedPatient}
      onSelectPatient={(patient) => {
        navigate(`/dashboard/drugs/patient/${patient.patient_id}`);
      }}
    />
    </div>

  );
}
export default SelectedPatientTab;
