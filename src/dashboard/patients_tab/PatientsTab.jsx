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

    const getGeneralTab = () => {
        setSelectedPatient(null)
        setAddTab(false)
        setRemoveTab(false)
        setGeneralTab(true)
    }

  return (
    <div className="dashboard-content-background">
        <div className="dashboard-content-navigator">
            <button className="navigator-button" onClick={getGeneralTab}
            style={{margin: "0 0 5px 10px"}}>Manage Patients</button>
            {
            /*First Stage*/
                addTab ? <button className="navigator-button">Add Patients</button>:
                removeTab ? <button className="navigator-button">Remove Patients</button>:
                selectedPatient ? <button className="navigator-button">Edit Patients</button>: null

            }
            {/*Second Stage*/}

        </div>
        <div className="dashboard-content-container">


        {generalTab ? <PatientEditContainer setGeneralTab={setGeneralTab} setAddTab={setAddTab} setRemoveTab={setRemoveTab}/>: null}
        {generalTab ? <Patients setGeneralTab={setGeneralTab} setSelectedPatient={setSelectedPatient}/>: null}

        {addTab ? <PatientAdd setGeneralTab={setGeneralTab} setAddTab={setAddTab}/>: null}
        {removeTab ? <PatientRemove setGeneralTab={setGeneralTab} setRemoveTab={setRemoveTab}/>: null}
        {selectedPatient ? <SelectedPatientTab setGeneralTab={setGeneralTab} setSelectedPatient={setSelectedPatient} selectedPatient={selectedPatient}/>: null}
    </div>
    </div>
  );
}

export default PatientsTab;