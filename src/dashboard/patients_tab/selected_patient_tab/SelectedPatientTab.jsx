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


function getTodayForDjango() {
  const today = new Date();
  return today.toString();
}

function SelectedPatientTab({ setGeneralTab, setSelectedPatient, selectedPatient }) {
    const [newRoomContainer, setNewRoomContainer] = useState(false)
    const [newCareCategoryContainer, setNewCareCategoryContainer] = useState(false)
    const [newMedicineContainer, setNewMedicineContainer] = useState(false)
    const [newNoteContainer, setNewNoteContainer] = useState(false)
    const [newHCContainer, setNewHCContainer] = useState(false)

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

    const [newNoteName, setNewNoteName] = useState("")
    const [newNoteDesc, setNewNoteDesc] = useState("")

    const [newMedicineNameError, setNewMedicineNameError] = useState("")
    const [newMedicineTimeError, setNewMedicineTimeError] = useState("")
    const [newMedicineDescError, setNewMedicineDescError] = useState("")
    const [newMedicineDoseError, setNewMedicineDoseError] = useState("")

    const [ medicinesDate, setMedicinesDate ] = useState(getTodayForDjango())

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
            console.log(newMedicineName)
            console.log(newMedicineDose)
            console.log(newMedicineDay)
            console.log(newMedicineTimes)
            console.log(newMedicineDesc)
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

        if ([] === newMedicineTimes || newMedicineTimes[-1] === "") {
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
        console.log('The newMedicineTimes has been updated to:', newMedicineTimes);
        if (newMedicineTimes.length === 0) {
            setNewMedicineRemove(false)
        }
    }, [newMedicineTimes]);

    useEffect(() => {
        console.log('The newMedicineRemove has been updated to:', newMedicineRemove);
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
          // <div className="blackout-container">
          //   <div className="blackout"></div>
          //   <div className="blackout-content-container">
          //       <div className="update-row-container">
          //           <div className={"formContainer"} style={{"marginBottom": "10px"}} >
          //               <input
          //                   value={newMedicineName}
          //                   placeholder=" i.e. Majezik"
          //                   onChange={ev => setNewMedicineName(ev.target.value)}
          //                   onFocus={ev => setNewMedicineNameError("")}
          //                   className={"formBox"} />
          //               {newMedicineNameError !== "" ? <label className="errorLabel">Medicine Name</label>: null}
          //               {newMedicineNameError === "" ? <label>Medicine Name</label>: null}
          //           </div>
          //           <div className={"formContainer"} style={{"marginBottom": "10px"}} >
          //                   <input
          //                       value={newMedicineDose}
          //                       placeholder=" i.e. 100 mg, 1 dose etc."
          //                       onChange={ev => setNewMedicineDose(ev.target.value)}
          //                       onFocus={ev => setNewMedicineDoseError("")}
          //                       className={"formBox"} />
          //                   {newMedicineDoseError !== "" ? <label className="errorLabel">Medicine Dose</label>: null}
          //                   {newMedicineDoseError === "" ? <label>Medicine Dose</label>: null}
          //               </div>
          //       </div>
          //       <div style={{"overflowY": "scroll", "maxHeight": "300px", "padding": "5px", "zIndex": "999"}}>
          //           <div className="update-row-container">
          //               {/*<select*/}
          //               {/*    onChange={ev => setNewMedicineDay(ev.target.value)}*/}
          //               {/*    className={"formBox"}>*/}
          //               {/*    <option hidden selected={true} value="">--Select a Day--</option>*/}
          //               {/*    <option value="Sunday">Sunday</option>*/}
          //               {/*    <option value="Monday">Monday</option>*/}
          //               {/*    <option value="Tuesday">Tuesday</option>*/}
          //               {/*    <option value="Wednesday">Wednesday</option>*/}
          //               {/*    <option value="Thursday">Thursday</option>*/}
          //               {/*    <option value="Friday">Friday</option>*/}
          //               {/*    <option value="Saturday">Saturday</option>*/}
          //               {/*</select>*/}
          //               <Select
          //                   isMulti
          //                   name="days"
          //                   options={days}
          //                   className={"Select"}
          //                   // className="basic-multi-select"
          //                   classNamePrefix="select"
          //                   value={newMedicineDay}
          //                   onChange={ev => setNewMedicineDay(ev)}
          //                   placeholder="--Select a Day--"
          //               />
          //               Time Slots:
          //               <button className={"miniAdd"} onClick={addMedicineTimeSlot} >+</button>
          //
          //               {newMedicineRemove ? <button className={"miniRemove"} onClick={popMedicineTimeSlot} >-</button> : <button className={"miniDisabled"}>-</button>}
          //
          //             </div>
          //           <div id={"inputFieldsContainer"}>
          //               {newMedicineTimes.map((time, index) => (
          //                 <div key={index} className="formContainer">
          //                   <input
          //                     type="time"
          //                     className="formBox"
          //                     value={newMedicineTimes[index]}
          //                     onChange={(event) => handleTimeChange(index, event)}
          //                   />
          //                   <label>Medicine Time</label>
          //
          //                 </div>
          //               ))}
          //           </div>
          //
          //       </div>
          //       <div className={"formContainer"} style={{height: "fit-content"}}>
          //           <textarea
          //               value={newMedicineDesc}
          //               placeholder=""
          //               onChange={ev => setNewMedicineDesc(ev.target.value)}
          //               onFocus={ev => setNewMedicineDescError("")}
          //               className={"formBox"}></textarea>
          //           {newMedicineDescError !== "" ? <label className="errorLabel">Medicine Description</label>: null}
          //           {newMedicineDescError === "" ? <label>Medicine Description</label>: null}
          //       </div>
          //       <div className="exit-container">
          //           <button style={{backgroundColor: "#E77169", float: "left"}} onClick={cancelNewMedicine} >Cancel</button>
          //           <button style={{backgroundColor: "#A695CC", float: "right"}} onClick={addNewMedicine} >Submit</button>
          //       </div>
          //   </div>
          // </div>
          <Medicine_Form selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient} setNewMedicineContainer={setNewMedicineContainer} medicinesDate={medicinesDate}/>
          : newNoteContainer !== false ?
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
          : newHCContainer !== false ?
          <HC_Form selectedPatient={selectedPatient}
                    setNewHCContainer={setNewHCContainer}/> : null}
         <PatientProfileComponent selectedPatient={selectedPatient}
                                  setNewRoomContainer={setNewRoomContainer}
                                  setNewCareCategoryContainer={setNewCareCategoryContainer}/>
         <div>
             <MedicineList selectedPatient={selectedPatient}
                        setNewMedicineContainer={setNewMedicineContainer}
                        medicinesDate={medicinesDate}
                        setMedicinesDate={setMedicinesDate}/>
             <HCList selectedPatient={selectedPatient}
                    setNewHCContainer={setNewHCContainer}/>

         </div>
         <div>
             <NotesList selectedPatient={selectedPatient}
                        setNewNoteContainer={setNewNoteContainer}/>
         </div>
      </div>
  );
}
export default SelectedPatientTab;
