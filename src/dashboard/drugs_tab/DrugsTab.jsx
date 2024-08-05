import * as React from "react";


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

function DrugsTab() {
    const daysData = [ { day: "Monday", date: "01/05/24", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a4ab907d848442f47848815a6d2679c7b121672f18253cbabfa134e38dc9e629?apiKey=873db62e82664057a5c151e6201a84f6&" }, { day: "Tuesday", date: "02/05/24", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a4ab907d848442f47848815a6d2679c7b121672f18253cbabfa134e38dc9e629?apiKey=873db62e82664057a5c151e6201a84f6&" }, { day: "Wednesday", date: "03/05/24", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a4ab907d848442f47848815a6d2679c7b121672f18253cbabfa134e38dc9e629?apiKey=873db62e82664057a5c151e6201a84f6&" }, { day: "Thursday", date: "04/04/24", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a4ab907d848442f47848815a6d2679c7b121672f18253cbabfa134e38dc9e629?apiKey=873db62e82664057a5c151e6201a84f6&" }, { day: "Friday", date: "05/04/24", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a4ab907d848442f47848815a6d2679c7b121672f18253cbabfa134e38dc9e629?apiKey=873db62e82664057a5c151e6201a84f6&" }, { day: "Saturday", date: "06/04/24", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a4ab907d848442f47848815a6d2679c7b121672f18253cbabfa134e38dc9e629?apiKey=873db62e82664057a5c151e6201a84f6&" }, { day: "Sunday", date: "07/04/24", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a4ab907d848442f47848815a6d2679c7b121672f18253cbabfa134e38dc9e629?apiKey=873db62e82664057a5c151e6201a84f6&" }, ];
    const daysDates = getCurrentWeekDates()

return ( <div className="dashboard-content-container">
    <div className="medications-container">
        <h2 className="medications-title">Medications to be Prepared Weekly</h2>
        <div className="divider" />
        <div className="day-cards-container">
            {daysData.map((dayData, index) =>
            ( <DayCard key={index} day={dayData.day} date={daysDates[index]} imageSrc={dayData.imageSrc} /> ))}
        </div>
    </div>
</div>
)}

export default DrugsTab
