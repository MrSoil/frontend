import * as React from "react";
import './selected_patient.css'
import Select from 'react-select';
import {useState, useEffect} from "react";
import MedicineList from "./info_components/medicinesComponent";
import PatientProfileComponent from "./info_components/PatientProfileComponent";
import NotesList from "./info_components/notesComponent";
import HCList from "./info_components/hcComponent";
import HC_Form from "./info_components/hcFormComponent";
import Medicine_Form from "./info_components/medicineFormComponent";
import PatientSelectionModal from "./PatientSelectionModal";
import { API_BASE_URL } from "../../../config";


import { Visibility, VisibilityOff, ArrowCircleLeftOutlined, ArrowCircleRightOutlined } from "@mui/icons-material";
import {Box,
        Grid,
        Stack,
        TextField,
        Button,
        Checkbox,
        FormControlLabel,
        Dialog,
        DialogTitle,
        DialogContent,
        DialogActions,
        InputAdornment,
        IconButton,
        ThemeProvider,
        createTheme,
      } from "@mui/material";

function getTodayForDjango() {
  const today = new Date();
  return today.toString();
}

function SelectedPatientTab({ setGeneralTab, setSelectedPatient, selectedPatient, patientsList, setPatientsList, currentPatientIndex, navigateToPreviousPatient, navigateToNextPatient, setCurrentPatientIndex }) {
    const [newRoomContainer, setNewRoomContainer] = useState(false)
    const [newCareCategoryContainer, setNewCareCategoryContainer] = useState(false)
    const [newMedicineContainer, setNewMedicineContainer] = useState(false)
    const [newHCContainer, setNewHCContainer] = useState(false)
    const [showPatientSelectionModal, setShowPatientSelectionModal] = useState(false)
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // let newMedicineTimes = []
    const [newMedicineTimes, setNewMedicineTimes] = useState([])
    const [newMedicineRemove, setNewMedicineRemove] = useState(false)

    const [ medicinesDate, setMedicinesDate ] = useState(getTodayForDjango())
    const [ hcDate, setHcDate ] = useState(getTodayForDjango())

    useEffect(() => {
        if (newMedicineTimes.length === 0) {
            setNewMedicineRemove(false)
        }
    }, [newMedicineTimes]);

    useEffect(() => {
    }, [newMedicineRemove]);

    const refreshPatientData = () => {
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
                    const updatedPatient = resp.data[0];
                    setSelectedPatient(updatedPatient);
                    // Update the patient in the patientsList
                    const updatedList = patientsList.map(p => 
                        p.patient_id === updatedPatient.patient_id ? updatedPatient : p
                    );
                    setPatientsList(updatedList);
                }
            })
            .catch(error => {
                console.error("Error refreshing patient data:", error);
            });
        }
    };

  return (
      <div className="dashboard-profile-container">
          {newMedicineContainer !== false ?
          <Medicine_Form selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient} setNewMedicineContainer={setNewMedicineContainer} medicinesDate={medicinesDate} patientsList={patientsList} currentPatientIndex={currentPatientIndex} setCurrentPatientIndex={setCurrentPatientIndex} navigateToPreviousPatient={navigateToPreviousPatient} navigateToNextPatient={navigateToNextPatient}/>
          : newHCContainer !== false ?
          <HC_Form selectedPatient={selectedPatient}
                   setSelectedPatient={setSelectedPatient}
                    setNewHCContainer={setNewHCContainer}
                    hcDate={hcDate}
                    patientsList={patientsList}
                    currentPatientIndex={currentPatientIndex}
                    setCurrentPatientIndex={setCurrentPatientIndex}
                    navigateToPreviousPatient={navigateToPreviousPatient}
                    navigateToNextPatient={navigateToNextPatient}/> : null}
              
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
              
              <Stack sx={{ width: 1, height: 1 }}>
              <Grid style={{'justifyContent': 'space-between', "height": "80vh"}} container spacing={0} sx={{ width: 1 }}>
                <Grid size={6} sx={{ width: 0.25, height: 0.985 }}>

                  <PatientProfileComponent selectedPatient={selectedPatient}
                                  setNewRoomContainer={setNewRoomContainer}
                                  setNewCareCategoryContainer={setNewCareCategoryContainer}
                                  onPatientUpdate={refreshPatientData}/>
                </Grid>
                <Grid size={6} sx={{ width: 0.74, height: 1}}>
                  <Box sx={{ height: '49%', pb: 1 }}>
                     <MedicineList selectedPatient={selectedPatient}
                                setNewMedicineContainer={setNewMedicineContainer}
                                medicinesDate={medicinesDate}
                                setMedicinesDate={setMedicinesDate}/>
                  </Box>
                  <Box sx={{ height: '49%', pt: 1 }}>
                     <HCList selectedPatient={selectedPatient}
                            setNewHCContainer={setNewHCContainer}
                            hcDate={hcDate}
                            setHcDate={setHcDate}/>
                  </Box>
                    </Grid>
                </Grid>
              </Stack>


         {/*<div>*/}
         {/*    <NotesList selectedPatient={selectedPatient}*/}
         {/*               setNewNoteContainer={setNewNoteContainer}/>*/}
         {/*</div>*/}
         <PatientSelectionModal
           isOpen={showPatientSelectionModal}
           onClose={() => setShowPatientSelectionModal(false)}
           patientsList={patientsList}
           selectedPatient={selectedPatient}
           onSelectPatient={(patient) => {
             const patientIndex = patientsList.findIndex(p => p.patient_id === patient.patient_id);
             if (patientIndex !== -1) {
               setCurrentPatientIndex(patientIndex);
               setSelectedPatient(patient);
             }
           }}
         />
      </div>
  );
}
export default SelectedPatientTab;
