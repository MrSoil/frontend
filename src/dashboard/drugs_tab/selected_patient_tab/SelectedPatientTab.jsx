import * as React from "react";
import './selected_patient.css'
import Select from 'react-select';
import {useState, useEffect} from "react";
import PatientProfileComponent from "./info_components/PatientProfileComponent";
import Patients from "../drugs_tab_general/Patients";
import {useNavigate} from "react-router-dom";
import NotesList from "../../drugs_tab/selected_patient_tab/info_components/notesComponent";
import MedicationTable from "./info_components/MedicationTable";

function SelectedPatientTab({ selectedPatient }) {
    const [newRoomContainer, setNewRoomContainer] = useState(false)
    const [newNoteContainer, setNewNoteContainer] = useState(false)
    const [newCareCategoryContainer, setNewCareCategoryContainer] = useState(false)

    const [newNoteName, setNewNoteName] = useState("")
    const [newNoteDesc, setNewNoteDesc] = useState("")
    const cancelNewNote = () => {
        setNewNoteContainer(false)
    }
    const addNewMedicine = () => {

        const addMedicine = async () => {
        // fetch("http://localhost:8000/api/patients/", {
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

        if (error_occurred){
            return
        }

        addMedicine()

    }

    const navigate = useNavigate();

    const getGeneralTab = () => {
        navigate("/dashboard/drugs")
    }

  return (
       <div className="dashboard-content-background">
        <div className="dashboard-content-navigator">
            <button className="navigator-button" onClick={getGeneralTab}
            style={{margin: "0 0 5px 10px"}}>Manage Patients</button>
            {
            /*First Stage*/

            }
        </div>
        <div className="dashboard-content-container">
            {newRoomContainer !== false ?
          <div className="blackout-container">
            <div className="blackout"></div>
            <div className="blackout-content-container">
                <div className={"formContainer"}>
                <input
                    placeholder=" "
                    className={"formBox"} />
                <label>New Room</label>
              </div>
                <div className="exit-container">
                    <button style={{backgroundColor: "#A695CC", float: "right"}} >Submit</button>
                </div>
            </div>
          </div>:
          newNoteContainer !== false ?
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
          : newCareCategoryContainer !== false ?
          <div className="blackout-container">
            <div className="blackout"></div>
            <div className="blackout-content-container">
                <div className={"formContainer"}>
                <input
                    placeholder=" "
                    className={"formBox"} />
                <label>New Care Category</label>
          </div>
                <div className="exit-container">
                <button style={{backgroundColor: "#A695CC", float: "right"}} >Submit</button>
              </div>
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

         <MedicationTable selectedPatient={selectedPatient}/>
      </div>

    </div>
    </div>

  );
}
export default SelectedPatientTab;
