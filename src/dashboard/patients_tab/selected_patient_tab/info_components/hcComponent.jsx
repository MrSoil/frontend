import * as React from "react";
import './hc_component.css'


function HCStatus({ date, hc, dosage, timing, lastMod }) {
  return (
    <article className="hc-status">
      <time className="hc-date">{date}</time>
      <h3 className="hc-name">
        {hc} | {dosage}
        <span className="dosage-detail">(2 doses)</span>
      </h3>
      <p className="hc-timing">{timing}</p>
      <div className="hc-info">
      <span className="label-text">Last Mod: {lastMod} h. ago</span>
      </div>
    </article>
  );
}

function HCList({ selectedPatient, setNewHCContainer }) {
  const signed_hc = [
    {
      date: "15.09.23 | Permanently",
      hc: "hc A",
      dosage: "12 mg",
      timing: "Every morning | Full",
      lastMod: "16",
    },
    {
      date: "19.05.24 | 26.05.24",
      hc: "hc B",
      dosage: "24 mg",
      timing: "Every 12 hours | Full",
      lastMod: "13",
    },
    {
      date: "19.05.24 | 26.05.24",
      hc: "hc C",
      dosage: "1000 mg",
      timing: "Every night | Hungry",
      lastMod: "16",
    },
  ];

  const handleNewHC = () => {
      setNewHCContainer(true)
  }

  return (
    <article className="hc-container">
        <header className="hc-header">hcs</header>
        <div className="hc-divider" />
        <div style={{"overflow": "scroll", "overflowX": "hidden"}}>
          {signed_hc.map((each_hc, index) => (
            <HCStatus key={index} {...each_hc} />
          ))}
        </div>
        <div className="hc-divider" />
        <div style={{alignSelf: "center", marginLeft: "3%"}}>
            <button className="hcs-button" onClick={handleNewHC}>Sign Health Care</button>
        </div>
    </article>
  );
}

export default HCList;
