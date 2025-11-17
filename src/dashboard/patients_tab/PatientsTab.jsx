import {React, useEffect, useState} from 'react';
import './patients_tab.css'
import PatientEditContainer from "./patients_tab_general/PatientEditContainer";
import Patients from "./patients_tab_general/Patients";
import PatientAdd from "./patients_tab_add/PatientAdd";
import PatientRemove from "./patients_tab_remove/PatientRemove";
import SelectedPatientTab from "./selected_patient_tab/SelectedPatientTab";

 
function PatientsTab() {
    const [generalTab, setGeneralTab] = useState(true);
    const [addTab, setAddTab] = useState(false);
    const [removeTab, setRemoveTab] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientsList, setPatientsList] = useState([]);
    const [currentPatientIndex, setCurrentPatientIndex] = useState(0);

    const getGeneralTab = () => {
        setSelectedPatient(null)
        setAddTab(false)
        setRemoveTab(false)
        setGeneralTab(true)
    }

    const handlePatientSelection = (patient) => {
        const patientIndex = patientsList.findIndex(p => p === patient);
        setCurrentPatientIndex(patientIndex);
        setSelectedPatient(patient);
        setGeneralTab(false);
        setAddTab(false);
        setRemoveTab(false);
    }

    const navigateToPreviousPatient = () => {
        if (currentPatientIndex > 0) {
            const newIndex = currentPatientIndex - 1;
            setCurrentPatientIndex(newIndex);
            setSelectedPatient(patientsList[newIndex]);
        }
    }

    const navigateToNextPatient = () => {
        if (currentPatientIndex < patientsList.length - 1) {
            const newIndex = currentPatientIndex + 1;
            setCurrentPatientIndex(newIndex);
            setSelectedPatient(patientsList[newIndex]);
        }
    }

  return (
    <div className="dashboard-content-background">
        <div className="dashboard-content-navigator">
            <div className="dashboard-logo-design">SUGR.</div>
            <button className="navigator-button" onClick={getGeneralTab}
            >/ Müşteri Yönetimi</button>
            {
            /*First Stage*/
                addTab ? <button className="navigator-button">/ Müşteri Ekle</button>:
                removeTab ? <button className="navigator-button">/ Müşteri Sil</button>:
                selectedPatient ? <button className="navigator-button">/ Müşteri Düzenle</button>: null

            }
        </div>
        <div className="dashboard-content-container">


        {generalTab ? <PatientEditContainer setGeneralTab={setGeneralTab} setAddTab={setAddTab} setRemoveTab={setRemoveTab}/>: null}
        {generalTab ? <Patients setGeneralTab={setGeneralTab} setSelectedPatient={handlePatientSelection} setPatientsList={setPatientsList}/>: null}

        {addTab ? <PatientAdd setGeneralTab={setGeneralTab} setAddTab={setAddTab}/>: null}
        {removeTab ? <PatientRemove setGeneralTab={setGeneralTab} setRemoveTab={setRemoveTab}/>: null}
        {selectedPatient ? <SelectedPatientTab 
            setGeneralTab={setGeneralTab} 
            setSelectedPatient={setSelectedPatient} 
            selectedPatient={selectedPatient}
            patientsList={patientsList}
            currentPatientIndex={currentPatientIndex}
            setCurrentPatientIndex={setCurrentPatientIndex}
            navigateToPreviousPatient={navigateToPreviousPatient}
            navigateToNextPatient={navigateToNextPatient}
        />: null}
    </div>
    </div>
  );
}

export default PatientsTab;