import * as React from "react";
import './medicines_component.css'

function getTodayForDjango() {
  const today = new Date();
  return today.toString();
}

function MedicineStatus({ string_date, date, clickFunction }) {
  return (
    <article className="medicine-status" onClick={() => clickFunction(date)}>
        <h3 className="medicine-name">
            {string_date}
        <span className="dosage-detail">(2 doses)</span>
      </h3>
       <time className="medicine-date">{date}</time>

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
  const medicines = getLastSixDaysForDjango();

  const handleNewMedicine = (new_date = getTodayForDjango()) => {
      console.log(new_date)
      setMedicinesDate(new_date)
      setNewMedicineContainer(true)
  }

  return (
    <article className="medicine-container">
        <header className="medicine-header">Medicines</header>
        <div className="medicine-divider" />
        <div style={{"overflow": "scroll", "overflowX": "hidden"}}>
          {medicines.map((medicine, index) => (
            <MedicineStatus key={index}
                            setMedicinesDate={setMedicinesDate}
                            setNewMedicineContainer={setNewMedicineContainer}
                            clickFunction={handleNewMedicine} {...medicine} />
          ))}
        </div>
        <div className="medicine-divider" />
        <div style={{alignSelf: "center", marginLeft: "3%"}}>
            <button className="medicines-button" onClick={() => handleNewMedicine()}>Bugünün İlaçları</button>
        </div>
    </article>
  );
}

export default MedicineList;
