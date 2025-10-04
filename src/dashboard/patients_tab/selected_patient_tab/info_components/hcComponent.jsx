import * as React from "react";
import './hc_component.css'

function getTodayForDjango() {
  const today = new Date();
  return today.toString();
}

function HcStatus({ string_date, date, clickFunction }) {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var mydate = new Date(date);

  return (
    <article className="hc-status" onClick={() => clickFunction(date)}>
        <h3 className="hc-name">
            {string_date}
      </h3>
       <time className="hc-date">{mydate.toLocaleString(options)}</time>

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
      setHcDate(new_date)
      setNewHCContainer(true)
  }

  return (
    <article className="hc-container">
        <header className="hc-header">Sağlık Raporları</header>
        <div className="hc-divider" />
        <div style={{"overflow": "scroll", "overflowX": "hidden", "height": "200px"}}>
          {hcs.map((hc, index) => (
            <HcStatus key={index}
                            setHcsDate={setHcDate}
                            setNewHCContainer={setNewHCContainer}
                            clickFunction={handleNewHc} {...hc} />
          ))}
        </div>
        <div className="hc-divider" />
        <div style={{alignSelf: "center", marginLeft: "3%"}}>
            <button className="hcs-button" onClick={() => handleNewHc()}>Bugünün Sağlık Raporu</button>
        </div>
    </article>
  );
}

export default HCList;
