import {React, useEffect, useState} from 'react';
import addPatientIconImage from "../../../assets/dashboard/icons-addpatient.png";
import removePatientIconImage from "../../../assets/dashboard/icons-removepatient.png";
import './patients_tab_general.css'

import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";

builder.init("ab27d5053d67488495ba0f15ff064ca9");

function PatientEditContainer({ setGeneralTab, setAddTab, setRemoveTab }) {
  const isPreviewingInBuilder = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));


  const onAddPatient = () => {
    setGeneralTab(false)
    setAddTab(true)
  }


  const onRemovePatient = () => {
    setGeneralTab(false)
    setRemoveTab(true)
  }


  useEffect(() => {
      async function fetchContent() {
      const content = await builder
        .get("page", {
          url: window.location.pathname
        })
        .promise();

      setContent(content);
      setNotFound(!content);
      if (content?.data.title) {
       document.title = content.data.title
      }
    }
    fetchContent();
  }, [window.location.pathname]);


  return (
    <div>
        <div className="dashboard-add-patient-container">
            <div style={{float: "left"}}><img className="addPatientLogo" src={addPatientIconImage} alt="addPatient"/></div>
            <div style={{display: "grid"}}>
            <h1>Danışan Kaydı Ekle</h1>
            <br/>
            <h2>Bu alanda danışan kayıtları oluşturabilirsiniz :)</h2>
            <br/>
            <button style={{backgroundColor: "#A695CC"}} onClick={onAddPatient}>Kayıt Ekle</button>
            </div>
        </div>
        <div className="dashboard-remove-patient-container">
            <div style={{float: "left"}}><img className="removePatientLogo" src={removePatientIconImage} alt="removePatient"/></div>
            <div style={{display: "grid"}}>
            <h1>Danışan Kaydı Sil</h1>
            <br/>
            <h2>Bu alanda danışan kayıtlarını silebilirsiniz.</h2>
            <br/>
            <button style={{backgroundColor: "#E77169"}} onClick={onRemovePatient}>Kayıt Sil</button>
            </div>
        </div>
        {/*<BuilderComponent model="page" content={content} />*/}
    </div>
  );
}

export default PatientEditContainer;