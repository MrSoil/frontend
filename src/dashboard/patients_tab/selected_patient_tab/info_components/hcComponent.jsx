import * as React from "react";
import './hc_component.css'

function getTodayForDjango() {
  const today = new Date();
  return today.toString();
}

function HcStatus({ string_date, date, clickFunction }) {
  return (
    <article className="hc-status" onClick={() => clickFunction(date)}>
        <h3 className="hc-name">
            {string_date}
        <span className="dosage-detail">(2 doses)</span>
      </h3>
       <time className="hc-date">{date}</time>

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

function HCList({ selectedPatient, setNewHCContainer, hcDate, setHcDate }) {
  const hcs = getLastSixDaysForDjango();

  const handleNewHc = (new_date = getTodayForDjango()) => {
      console.log(new_date)
      setHcDate(new_date)
      setNewHCContainer(true)
  }

  return (
    <article className="hc-container">
        <header className="hc-header">Hcs</header>
        <div className="hc-divider" />
        <div style={{"overflow": "scroll", "overflowX": "hidden"}}>
          {hcs.map((hc, index) => (
            <HcStatus key={index}
                            setHcsDate={setHcDate}
                            setNewHCContainer={setNewHCContainer}
                            clickFunction={handleNewHc} {...hc} />
          ))}
        </div>
        <div className="hc-divider" />
        <div style={{alignSelf: "center", marginLeft: "3%"}}>
            <button className="hcs-button" onClick={() => handleNewHc()}>Bugünün İlaçları</button>
        </div>
    </article>
  );
}

export default HCList;
