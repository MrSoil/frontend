import React, {useState} from "react"
import Sidebar from '../components/sidebar/Sidebar';
import DrugsTab from './drugs_tab/DrugsTab';
import './drugs_tab/drugs_tab.css';
import PatientsTab from "./patients_tab/PatientsTab";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const Dashboard = () => {
    const [sidebarHovers, setSidebarHovers] = useState([ false, true, false, false ]);

    const handleHoverChange = (index) => {
        let newSidebarHovers = [false, false, false, false];
        newSidebarHovers[index] = true;
        setSidebarHovers(newSidebarHovers);
    };


    return (
    <div className="main-container">
        {/*<BrowserRouter>*/}
        {/*    <Routes>*/}
        {/*        <Route path="/dashboard" element={ <Sidebar setHover={handleHoverChange} sidebarHovers={sidebarHovers}></Sidebar>}>*/}
        {/*            <Route path="/dashboard/patients" element={<DrugsTab/>}/>*/}
        {/*            <Route path="/dashboard/drugs" element={<PatientsTab/>}/>*/}
        {/*        </Route>*/}
        {/*    </Routes>*/}
        {/*</BrowserRouter>*/}


        {/*{ sidebarHovers[0] ? <DrugsTab/> : null}*/}

        {/*{ sidebarHovers[1] ? <PatientsTab/> : null}*/}

        { sidebarHovers[2] ? <div className="dashboard-content-background">profile?</div> : null}

        { sidebarHovers[3] ? <div className="dashboard-content-background">sec</div> : null}

    </div>
);
}

export default Dashboard