import React, {useState} from "react"
import Sidebar from '../components/sidebar/Sidebar';
import DrugsTab from './drugs_tab/DrugsTab';
import './drugs_tab/drugs_tab.css';
import PatientsTab from "./patients_tab/PatientsTab";

const Dashboard = () => {
    const [sidebarHovers, setSidebarHovers] = useState([ false, true, false, false ]);

    const handleHoverChange = (index) => {
        let newSidebarHovers = [false, false, false, false];
        newSidebarHovers[index] = true;
        setSidebarHovers(newSidebarHovers);
    };


    return (
    <div className="main-container">
        <Sidebar setHover={handleHoverChange} sidebarHovers={sidebarHovers}></Sidebar>

        { sidebarHovers[0] ? <DrugsTab/> : null}

        { sidebarHovers[1] ? <PatientsTab/> : null}

        { sidebarHovers[2] ? <div className="dashboard-content-background">profile?</div> : null}

        { sidebarHovers[3] ? <div className="dashboard-content-background">sec</div> : null}

    </div>
);
}

export default Dashboard