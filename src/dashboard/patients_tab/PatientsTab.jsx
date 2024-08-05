import {React, useEffect, useState} from 'react';
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

  return (
    <div className="dashboard-content-container">
        {generalTab ? <PatientEditContainer setGeneralTab={setGeneralTab} setAddTab={setAddTab} setRemoveTab={setRemoveTab}/>: null}
        {generalTab ? <Patients setGeneralTab={setGeneralTab} setSelectedPatient={setSelectedPatient}/>: null}

        {addTab ? <PatientAdd setGeneralTab={setGeneralTab} setAddTab={setAddTab}/>: null}
        {removeTab ? <PatientRemove setGeneralTab={setGeneralTab} setRemoveTab={setRemoveTab}/>: null}
        {selectedPatient ? <SelectedPatientTab setGeneralTab={setGeneralTab} setSelectedPatient={setSelectedPatient} selectedPatient={selectedPatient}/>: null}
    </div>
  );
}

export default PatientsTab;