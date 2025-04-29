import { React, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../home/AuthContext";
import "./sidebar.css"
import logoutImage from "../../assets/sidebar/icons-logout.png";
import sugrIconImage from "../../assets/sidebar/icons-sugr.png";
import reportsIconImage from "../../assets/sidebar/icons-reports.png";
import patientIconImage from "../../assets/sidebar/icons-patient.png";
import tabdivIconImage from "../../assets/sidebar/icons-tabdiv.png";
import memberIconImage from "../../assets/sidebar/icons-member.png";
import settingsIconImage from "../../assets/sidebar/icons-settings.png";



function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

    const [sidebarHovers, setSidebarHovers] = useState([ false, false, false, false ]);

    const handleHoverChange = (index) => {
        let newSidebarHovers = [false, false, false, false];
        let hover_index_map = ["drugs", "patients", "x", "y"]
        navigate("/dashboard/"+hover_index_map[index])
        newSidebarHovers[index] = true;
        setSidebarHovers(newSidebarHovers);
    };

  const onHomeButtonClick = () => {
    navigate("/home")
  }


  return (
    <div className="sidebar">
      <button
        className="home-button"
        onClick={onHomeButtonClick}>
        SUGR.
      </button>

      <div className={"sidebar-content"}>

          <div className={"sidebar-main-contents"}>
            <img src={sugrIconImage} alt="SugrIcon"/>
          </div>

          <button className={"sidebar-main-contents stat-button hover"}
          onClick={() => handleHoverChange(0)}>
              {sidebarHovers[0] ?
                  <img src={reportsIconImage} alt="reportsIcon"/>
                  :<img style={{ 'opacity': 0.2 }}
                      src={reportsIconImage} alt="reportsIcon"/>}
          </button>

          <button className={"sidebar-main-contents stat-button hover"}
          onClick={() => handleHoverChange(1)}>
            {sidebarHovers[1] ?
                  <img src={patientIconImage} alt="patientIcon"/>
                  :<img style={{ 'opacity': 0.2 }}
                      src={patientIconImage} alt="certIcon"/>}
          </button>

          <div className={"sidebar-main-contents"}>
            <img src={tabdivIconImage} alt="tabDivider"/>
          </div>

          <button className={"sidebar-main-contents stat-button hover"}
          onClick={() => handleHoverChange(2)}>
            {sidebarHovers[2] ?
                  <img src={memberIconImage} alt="memberIcon" style={{ 'filter': 'invert(1)' }}/>
                  :<img style={{ 'opacity': 0.2, 'filter': 'invert(1)' }}
                      src={memberIconImage} alt="memberIcon"/>}
          </button>

          <button className={"sidebar-main-contents stat-button hover"}
          onClick={() => handleHoverChange(3)}>
            {sidebarHovers[3] ?
                  <img src={settingsIconImage} alt="settingsIcon" style={{ 'filter': 'invert(1)' }}/>
                  :<img style={{ 'opacity': 0.2, 'filter': 'invert(1)' }}
                      src={settingsIconImage} alt="settingsIcon"/>}
          </button>
      </div>

      <button
        className="logout-button"
        onClick={logout}>
        <img src={logoutImage} alt="Logout"/>
      </button>

    </div>
  );
}

export default Sidebar;