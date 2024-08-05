import * as React from "react";
import './selected_patient.css'
import {useState} from "react";
import MedicineList from "./info_components/medicinesComponent";
import PatientProfileComponent from "./info_components/PatientProfileComponent";
import NotesList from "./info_components/notesComponent";

function SelectedPatientTab({ setGeneralTab, setSelectedPatient, selectedPatient }) {

  return (
      <div className="dashboard-profile-container">
         <PatientProfileComponent selectedPatient={selectedPatient}/>
         <MedicineList selectedPatient={selectedPatient}/>
         <NotesList selectedPatient={selectedPatient}/>
      </div>
  );
}
export default SelectedPatientTab;
