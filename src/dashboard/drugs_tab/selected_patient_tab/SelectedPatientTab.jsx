import * as React from "react";
import './selected_patient.css'
import Select from 'react-select';
import {useState, useEffect} from "react";
import PatientProfileComponent from "./info_components/PatientProfileComponent";
import Patients from "../drugs_tab_general/Patients";
import {useNavigate} from "react-router-dom";
import NotesList from "../../drugs_tab/selected_patient_tab/info_components/notesComponent";
import MedicationTable from "./info_components/MedicationTable";
import MedicationForm from "./info_components/MedicationForm";
import MedicationSystemForm from "./info_components/MedicationSystemForm";

function SelectedPatientTab({ setSelectedPatient, selectedPatient }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const [isLoading, setIsLoading] = useState(true);
    const [newRoomContainer, setNewRoomContainer] = useState(false)
    const [newNoteContainer, setNewNoteContainer] = useState(false)
    const [newCareCategoryContainer, setNewCareCategoryContainer] = useState(false)

    const [newSystemMedicineContainer, setNewSystemMedicineContainer] = useState(false)
    const [newMedicineContainer, setNewMedicineContainer] = useState(false)
    const [medicineTabs, setMedicineTabs] = useState([false, false]);

    const [newNoteName, setNewNoteName] = useState("")
    const [newNoteDesc, setNewNoteDesc] = useState("")
    const cancelNewNote = () => {
        setNewNoteContainer(false)
    }

    const navigate = useNavigate();

    const getGeneralTab = () => {
        navigate("/dashboard/drugs")
    }

    const updateSelectedPatient = (email) => {
    setIsLoading(true)
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
      setIsLoading(false)
      }
    }
    ).catch(error => {
        setIsLoading(true)
    });
  };

  useEffect(() => {
      updateSelectedPatient(user.email)
    }, [user.email]);

  if (isLoading) {
    return <div>Loading...</div>;
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
            {newNoteContainer !== false ?
          <div className="blackout-container">
            <div className="blackout"></div>
            <div className="blackout-content-container">
                    <div className={"formContainer"}>
                        <input
                            value={newNoteName}
                            placeholder=" i.e. Majezik"
                            onChange={ev => setNewNoteName(ev.target.value)}
                            className={"formBox"} />
                        <label>Note Name</label>
                    </div>
                    <div className={"formContainer"} style={{height: "fit-content"}}>
                        <textarea rows="5" cols="50"
                            value={newNoteDesc}
                            placeholder=""
                            onChange={ev => setNewNoteDesc(ev.target.value)}
                            className={"formBox"}></textarea>
                        <label>Note Description</label>
                    </div>
                <div className="exit-container">
                    <button style={{backgroundColor: "#E77169", float: "left"}} onClick={cancelNewNote} >Cancel</button>
                    <button style={{backgroundColor: "#A695CC", float: "right"}} >Submit</button>
                </div>
            </div>
          </div>
          : newMedicineContainer !== false ?
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
        <div className="dashboard-drugs-profile-container">

         <PatientProfileComponent selectedPatient={selectedPatient}
                                  setNewRoomContainer={setNewRoomContainer}
                                  setNewCareCategoryContainer={setNewCareCategoryContainer}/>
         <NotesList selectedPatient={selectedPatient}
                    setNewNoteContainer={setNewNoteContainer}/>
      </div>
        <div className="dashboard-drugs-profile-container">

         <MedicationTable setNewMedicineContainer={setNewMedicineContainer} selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient} setNewSystemMedicineContainer={setNewSystemMedicineContainer} />
      </div>

    </div>
    </div>

  );
}
export default SelectedPatientTab;
