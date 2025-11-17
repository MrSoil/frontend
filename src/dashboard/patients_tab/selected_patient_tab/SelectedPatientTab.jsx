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

function SelectedPatientTab({ setGeneralTab, setSelectedPatient, selectedPatient, patientsList, currentPatientIndex, navigateToPreviousPatient, navigateToNextPatient, setCurrentPatientIndex }) {
    const [newRoomContainer, setNewRoomContainer] = useState(false)
    const [newCareCategoryContainer, setNewCareCategoryContainer] = useState(false)
    const [newMedicineContainer, setNewMedicineContainer] = useState(false)
    const [newHCContainer, setNewHCContainer] = useState(false)
    const [showPatientSelectionModal, setShowPatientSelectionModal] = useState(false)

    const [newRoom, setNewRoom] = useState("")
    const [newCareCategory, setNewCareCategory] = useState("")

    const [newMedicineName, setNewMedicineName] = useState("")
    const [newMedicineDay, setNewMedicineDay] = useState([])

    const days = [
        { label: 'Sunday', value: 'Sunday' },
        { label: 'Monday', value: 'Monday' },
        { label: 'Tuesday', value: 'Tuesday' },
        { label: 'Wednesday', value: 'Wednesday' },
        { label: 'Thursday', value: 'Thursday' },
        { label: 'Friday', value: 'Friday' },
        { label: 'Saturday', value: 'Saturday' }
    ];

    // let newMedicineTimes = []
    const [newMedicineTimes, setNewMedicineTimes] = useState([])
    const [newMedicineRemove, setNewMedicineRemove] = useState(false)


    const [newMedicineDesc, setNewMedicineDesc] = useState("")
    const [newMedicineDose, setNewMedicineDose] = useState("")

    const [newMedicineNameError, setNewMedicineNameError] = useState("")
    const [newMedicineTimeError, setNewMedicineTimeError] = useState("")
    const [newMedicineDescError, setNewMedicineDescError] = useState("")
    const [newMedicineDoseError, setNewMedicineDoseError] = useState("")

    const [ medicinesDate, setMedicinesDate ] = useState(getTodayForDjango())
    const [ hcDate, setHcDate ] = useState(getTodayForDjango())

    const popMedicineTimeSlot = () => {
        const newTimes = [...newMedicineTimes];
        newTimes.pop()
        setNewMedicineTimes(newTimes);
    }

    const handleTimeChange = (index, event) => {
        const newTimes = [...newMedicineTimes];
        newTimes[index] = event.target.value;
        setNewMedicineTimes(newTimes);
    };

    const addMedicineTimeSlot = () => {
        setNewMedicineRemove(true)
        const newTimes = [...newMedicineTimes];
        newTimes[newTimes.length] = "";
        setNewMedicineTimes(newTimes);
    }

    const cancelNewRoom = () => {
        setNewRoom("")
        setNewRoomContainer(false)
    }

    const cancelNewCareCategory = () => {
        setNewCareCategory("")
        setNewCareCategoryContainer(false)
    }

    const cancelNewMedicine = () => {
        setNewMedicineNameError("")
        setNewMedicineDoseError("")
        setNewMedicineTimeError("")
        setNewMedicineDescError("")

        setNewMedicineName("")
        setNewMedicineDose("")
        setNewMedicineTimes([])
        setNewMedicineDay([])
        setNewMedicineDesc("")
        setNewMedicineRemove(false)

        setNewMedicineContainer(false)
    }

    const addNewMedicine = () => {

        const addMedicine = async () => {
        // fetch("http://localhost:8000http://testserver.local:8000/api/patients/", {
        // method: "POST",
        // headers: {
        //     'Content-Type': 'application/json'
        //   },
        // body: JSON.stringify(
        //     {"email": user.email,
        //         'type': 'new',
        //         'first_name': firstname,
        //         'last_name': lastname,
        //         'device_id': deviceID,
        //         'patient_id': citizenID,
        //         'floor_no': floorNo,
        //         'care_category': careCategory,
        //         'date_of_birth': dateOfBirth,
        //         'blood_type': bloodType,
        //         'height': patientHeight,
        //         'weight': patientWeight,
        //         'gender': patientGender,
        //         'contact_first_name': contactFirstname,
        //         'contact_last_name': contactFirstname,
        //         'contact_phone_no': contactPhoneNo,
        //         'patient_photo': base64Image.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
        //     })
        // })
        // .then(response => response.json())
        // .then(data => {
        // if ('success' === data['status']) {
        //     window.alert("Patient is successfully saved.")
        //     setNewMedicineContainer(false)
        // } else {
        //     window.alert("Patient is NOT saved!")
        // }
        // })
        // .catch(error => {
        // console.error('Error:', error);
        // window.alert("Patient is NOT saved!");
        // });
    }

        let error_occurred = false;
        setNewMedicineNameError("")
        setNewMedicineDoseError("")
        setNewMedicineTimeError("")
        setNewMedicineDescError("")


        if ("" === newMedicineName) {
            setNewMedicineNameError("Please enter a medicine name")
            error_occurred = true
        }

        if ("" === newMedicineDose) {
            setNewMedicineDoseError("Please enter a dose")
            error_occurred = true
        }

        if (newMedicineTimes.length === 0 || newMedicineTimes[newMedicineTimes.length - 1] === "") {
            setNewMedicineTimeError("Please enter a medicine time")
            error_occurred = true
        }


        if ("" === newMedicineDesc) {
            setNewMedicineDescError("Please enter a medicine description")
            error_occurred = true
        }


        if (error_occurred){
            return
        }

        addMedicine()

    }

    useEffect(() => {
        if (newMedicineTimes.length === 0) {
            setNewMedicineRemove(false)
        }
    }, [newMedicineTimes]);

    useEffect(() => {
    }, [newMedicineRemove]);

  return (
      <div className="dashboard-profile-container">
          {newRoomContainer !== false ?
          <div className="blackout-container">
            <div className="blackout"></div>
            <div className="blackout-content-container">
                <div className={"formContainer"}>
                <input
                    value={newRoom}
                    placeholder=" "
                    onChange={ev => setNewRoom(ev.target.value)}
                    className={"formBox"} />
                <label>New Room</label>
              </div>
                <div className="exit-container">
                    <button style={{backgroundColor: "#E77169", float: "left"}} onClick={cancelNewRoom} >Cancel</button>
                    <button style={{backgroundColor: "#A695CC", float: "right"}} >Submit</button>
                </div>
            </div>
          </div>
          : newCareCategoryContainer !== false ?
          <div className="blackout-container">
            <div className="blackout"></div>
            <div className="blackout-content-container">
                <div className={"formContainer"}>
                <input
                    value={newCareCategory}
                    placeholder=" "
                    onChange={ev => setNewCareCategory(ev.target.value)}
                    className={"formBox"} />
                <label>New Care Category</label>
          </div>
                <div className="exit-container">
                <button style={{backgroundColor: "#E77169", float: "left"}} onClick={cancelNewCareCategory} >Cancel</button>
                <button style={{backgroundColor: "#A695CC", float: "right"}} >Submit</button>
              </div>
            </div>
          </div>
          : newMedicineContainer !== false ?
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
              <Grid style={{'justifyContent': 'space-between'}} container spacing={0} sx={{ width: 1, height: 1 }}>
                <Grid size={6} sx={{ width: 0.25, height: 0.985 }}>

                  <PatientProfileComponent selectedPatient={selectedPatient}
                                  setNewRoomContainer={setNewRoomContainer}
                                  setNewCareCategoryContainer={setNewCareCategoryContainer}/>
                </Grid>
                <Grid size={6} sx={{ width: 0.74, height: 1 }}>
                  <Box sx={{ height: 1/2 }}>
                     <MedicineList selectedPatient={selectedPatient}
                                setNewMedicineContainer={setNewMedicineContainer}
                                medicinesDate={medicinesDate}
                                setMedicinesDate={setMedicinesDate}/>
                  </Box>
                  <Box sx={{ height: 1/2 }}>
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
