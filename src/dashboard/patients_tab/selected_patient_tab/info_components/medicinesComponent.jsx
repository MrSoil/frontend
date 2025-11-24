import * as React from "react";
import { useNavigate } from "react-router-dom";
import './medicines_component.css'

function getTodayForDjango() {
  const today = new Date();
  return today.toString();
}

function MedicineStatus({ string_date, date, clickFunction }) {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var mydate = new Date(date);

  return (
    <article className="medicine-status" onClick={() => clickFunction(date)}>
        <h3 className="medicine-name">
            {string_date}
      </h3>
       <time className="medicine-date">{mydate.toLocaleString(options)}</time>

    </article>
  );
}

function getLastSixDaysForDjango() {
  const daysOfWeek = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const out = [];

  for (let i = 1; i <= 6; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);

    out.push({
      string_date: daysOfWeek[d.getDay()],
      date:  Date.prototype.toString.call(d)
    });
  }

  return out;
}

function MedicineList({ selectedPatient, setNewMedicineContainer, medicinesDate, setMedicinesDate }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const medicines = getLastSixDaysForDjango();

  const handleNewMedicine = (new_date = getTodayForDjango()) => {
      setMedicinesDate(new_date)
      setNewMedicineContainer(true)
  }

  const handleEditMedicine = (new_date = getTodayForDjango()) => {
    navigate("/dashboard/drugs/patient/" + selectedPatient.patient_id)
  }

  return (
    <article className="medicine-container">
        <header className="medicine-header">Sağlık Raporları</header>
        <div className="medicine-divider" />
        <div style={{"overflow": "scroll", "overflowX": "hidden", "height": "200px"}}>
          {medicines.map((medicine, index) => (
            <MedicineStatus key={index}
                            setMedicinesDate={setMedicinesDate}
                            setNewMedicineContainer={setNewMedicineContainer}
                            clickFunction={handleNewMedicine} {...medicine} />
          ))}
        </div>
        <div className="medicine-divider" />
        <div style={{alignSelf: "center", marginLeft: "3%"}}>
            <button className="medicines-button" onClick={() => handleNewMedicine()}>Bugünün Sağlık Raporu</button>
            <button className="medicines-button" onClick={() => handleEditMedicine()}>İlaçları Düzenle</button>
        </div>
    </article>
  );
}

export default MedicineList;
