import * as React from "react";
import Patients from "../drugs_tab/drugs_tab_general/Patients";
import SelectedPatientTab from "../drugs_tab/selected_patient_tab/SelectedPatientTab";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


function getCurrentWeekDates() {
    const currentDate = new Date();
    const week = [];

    // Get the current day of the week, with 1 (Monday) to 7 (Sunday)
    const dayOfWeek = currentDate.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    // Set to the most recent Monday
    currentDate.setDate(currentDate.getDate() + mondayOffset);

    // Util function to format date as dd/MM/YYYY
    function formatDate(date) {
        let dd = date.getDate();
        let mm = date.getMonth() + 1; // January is 0!
        const yyyy = date.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        return dd + '/' + mm + '/' + yyyy;
    }

    // Push each day of the week to the array
    for (let i = 0; i < 7; i++) {
        week.push(formatDate(new Date(currentDate)));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return week;
}

function DayCard({ day, date, imageSrc })
{ return ( <div className="day-card"> <div className="day-card-header"> <div className="day-name">{day}</div> <div className="date">{date}</div> </div> <img src={imageSrc} alt="" className="day-card-image" /> <div className="create-list-text">Create Medication List</div> </div> ); }

function DrugsTab({setSelectedPatient}) {
  const navigate = useNavigate();

    const getGeneralTab = () => {
        navigate("/dashboard/drugs")
    }

    const onDashboardButtonClick = () => {
        navigate("/dashboard")
    }

return (
    <div className="dashboard-content-background">
        <div className="dashboard-content-navigator">
            <button className="dashboard-logo-design navigator-button" onClick={onDashboardButtonClick}>SUGR.</button>
            <button className="navigator-button" onClick={getGeneralTab}
            >/ Danışan İlaçları</button>
            {
            /*First Stage*/

            }
        </div>
        <div className="dashboard-content-container">
        <Patients setSelectedPatient={setSelectedPatient}/>

    </div>
    </div>
  );
}

export default DrugsTab
