import * as React from "react";
import './medicines_component.css'


function MedicineStatus({ date, medicine, dosage, timing, satisfaction, lastMod }) {
  return (
    <article className="medicine-status">
      <time className="medicine-date">{date}</time>
      <h3 className="medicine-name">
        {medicine} | {dosage}
        <span className="dosage-detail">(2 doses)</span>
      </h3>
      <p className="medicine-timing">{timing}</p>
      <div className="medicine-info">
        <div className="satisfaction-status">
          <span className="status-label">{satisfaction}</span>
          <div className="status-indicator" />
          <span className="label-text">Last Mod: {lastMod} h. ago</span>
        </div>
      </div>
    </article>
  );
}

function MedicineList({ selectedPatient, setNewMedicineContainer }) {
  const medicines = [
    {
      date: "15.09.23 | Permanently",
      medicine: "Medicine A",
      dosage: "12 mg",
      timing: "Every morning | Full",
      satisfaction: "unsatisfied",
      lastMod: "16",
    },
    {
      date: "19.05.24 | 26.05.24",
      medicine: "Medicine B",
      dosage: "24 mg",
      timing: "Every 12 hours | Full",
      satisfaction: "unsatisfied",
      lastMod: "13",
    },
    {
      date: "19.05.24 | 26.05.24",
      medicine: "Medicine C",
      dosage: "1000 mg",
      timing: "Every night | Hungry",
      satisfaction: "unsatisfied",
      lastMod: "16",
    },
  ];

  const handleNewMedicine = () => {
      setNewMedicineContainer(true)
  }

  return (
    <article className="medicine-container">
        <header className="medicine-header">Medicines</header>
        <div className="medicine-divider" />
        <div style={{"overflow": "scroll", "overflowX": "hidden"}}>
          {medicines.map((medicine, index) => (
            <MedicineStatus key={index} {...medicine} />
          ))}
        </div>
        <div className="medicine-divider" />
        <div style={{alignSelf: "center", marginLeft: "3%"}}>
            <button className="medicines-button" onClick={handleNewMedicine}>Add Medicines</button>
            <button className="medicines-button">Submit</button>
        </div>
    </article>
  );
}

export default MedicineList;
