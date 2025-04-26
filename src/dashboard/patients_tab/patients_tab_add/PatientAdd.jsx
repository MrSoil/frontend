import * as React from "react";
import { WithContext as ReactTags } from 'react-tag-input';
import Select from 'react-select';

import './patients_tab_add.css'
import {useState} from "react";



function PatientAdd({ setGeneralTab, setAddTab }) {

  const [ patientPage, setPatientPage ] = useState(0)

  const vac_options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
  ]

  // hasta özlük
  const [ image, setImage ] = useState("")
  const [ firstname, setFirstname ] = useState("")
  const [ lastname, setLastname ] = useState("")
  const [ citizenID, setCitizenID ] = useState("")
  const [ motherName, setMotherName ] = useState("")
  const [ fatherName, setFatherName ] = useState("")
  const [ dateOfBirth, setDateOfBirth ] = useState("")
  const [ birthPlace, setBirthPlace ] = useState("")
  const [ patientGender, setPatientGender ] = useState("")
  const [ currentRelation, setCurrentRelation ] = useState("")
  const [ patientHeight, setPatientHeight ] = useState("")
  const [ patientWeight, setPatientWeight ] = useState("")
  const [ deviceID, setDeviceID ] = useState("")


  const [ firstnameError, setFirstnameError ] = useState("")
  const [ lastnameError, setLastnameError ] = useState("")
  const [ citizenIDError, setCitizenIDError ] = useState("")
  const [ motherNameError, setMotherNameError ] = useState("")
  const [ fatherNameError, setFatherNameError ] = useState("")
  const [ dateOfBirthError, setDateOfBirthError ] = useState("")
  const [ birthPlaceError, setBirthPlaceError ] = useState("")
  const [ patientGenderError, setPatientGenderError ] = useState("")
  const [ currentRelationError, setCurrentRelationError ] = useState("")
  const [ patientHeightError, setPatientHeightError ] = useState("")
  const [ patientWeightError, setPatientWeightError ] = useState("")
  // endregion


  // region hasta eğitim
  const [ education, setEducation ] = useState("")
  const [ workStatus, setWorkStatus ] = useState("")
  const [ insurance, setInsurance ] = useState("")
  const [ vac, setVac ] = useState([])
  const [ income, setIncome ] = useState("")
  const [ backgroundInfo, setBackgroundInfo ] = useState("")

  const [ educationError, setEducationError ] = useState("")
  const [ workStatusError, setWorkStatusError ] = useState("")
  const [ insuranceError, setInsuranceError ] = useState("")
  const [ vacError, setVacError ] = useState("")
  const [ incomeError, setIncomeError ] = useState("")
  const [ backgroundInfoError, setBackgroundInfoError ] = useState("")
  // endregion

  // region danışan özlük
  const [ contactFirstname, setContactFirstname ] = useState("")
  const [ contactLastname, setContactLastname ] = useState("")
  const [ contactCitizenID, setContactCitizenID ] = useState("")
  const [ contactMotherName, setContactMotherName ] = useState("")
  const [ contactFatherName, setContactFatherName ] = useState("")
  const [ contactDateOfBirth, setContactDateOfBirth ] = useState("")
  const [ contactBirthPlace, setContactBirthPlace ] = useState("")
  const [ contactPatientGender, setContactPatientGender ] = useState("")
  const [ contactCurrentRelationship, setContactCurrentRelationship ] = useState("")

  const [ contactFirstnameError, setContactFirstnameError ] = useState("")
  const [ contactLastnameError, setContactLastnameError ] = useState("")
  const [ contactCitizenIDError, setContactCitizenIDError ] = useState("")
  const [ contactMotherNameError, setContactMotherNameError ] = useState("")
  const [ contactFatherNameError, setContactFatherNameError ] = useState("")
  const [ contactDateOfBirthError, setContactDateOfBirthError ] = useState("")
  const [ contactBirthPlaceError, setContactBirthPlaceError ] = useState("")
  const [ contactPatientGenderError, setContactPatientGenderError ] = useState("")
  const [ contactCurrentRelationshipError, setContactCurrentRelationshipError ] = useState("")
  // endregion


  // region danışan iletişim
  const [ contactRelation, setContactRelation ] = useState("")
  const [ contactEducation, setContactEducation ] = useState("")
  const [ contactWorkStatus, setContactWorkStatus ] = useState("")
  const [ contactPhone, setContactPhone ] = useState("")
  const [ contactAddress, setContactAddress ] = useState("")
  const [ contactWorkAddress, setContactWorkAddress ] = useState("")
  const [ contactEmail, setContactEmail ] = useState("")
  const [ contactApply, setContactApply ] = useState("")
  const [ contactVac, setContactVac ] = useState([])


  const [ contactRelationError, setContactRelationError ] = useState("")
  const [ contactEducationError, setContactEducationError ] = useState("")
  const [ contactWorkStatusError, setContactWorkStatusError ] = useState("")
  const [ contactPhoneError, setContactPhoneError ] = useState("")
  const [ contactAddressError, setContactAddressError ] = useState("")
  const [ contactWorkAddressError, setContactWorkAddressError ] = useState("")
  const [ contactEmailError, setContactEmailError ] = useState("")
  const [ contactApplyError, setContactApplyError ] = useState("")
  const [ contactVacError, setContactVacError ] = useState("")
  // endregion

  // region Hastalıklar & İlaçlar
  const [ onGoingProblems, setOnGoingProblems ] = useState([])
  const [ oldProblems, setOldProblems ] = useState([])
  const [ doctorContacts, setDoctorContacts ] = useState([])
  const [ oldMedicines, setOldMedicines ] = useState([])
  const [ onGoingMedicines, setOnGoingMedicines ] = useState([])
  const [ system1, setSystem1 ] = useState("")
  const [ system2, setSystem2 ] = useState("")
  const [ system3, setSystem3 ] = useState("")
  const [ system4, setSystem4 ] = useState("")

 const handleDeleteOnGoingProblems = (index) => {
    setOnGoingProblems(onGoingProblems.filter((_, i) => i !== index));
  };

  const handleAdditionOnGoingProblems = (tag) => {
    setOnGoingProblems((prevTags) => {
      return [...prevTags, tag];
    });
  };

  const handleDeleteOldProblems = (index) => {
    setOldProblems(oldProblems.filter((_, i) => i !== index));
};

const handleAdditionOldProblems = (tag) => {
    setOldProblems((prevTags) => {
        return [...prevTags, tag];
    });
};

const handleDeleteDoctorContacts = (index) => {
    setDoctorContacts(doctorContacts.filter((_, i) => i !== index));
};

const handleAdditionDoctorContacts = (tag) => {
    setDoctorContacts((prevTags) => {
        return [...prevTags, tag];
    });
};

    const handleDeleteOldMedicines = (index) => {
        setOldMedicines(oldMedicines.filter((_, i) => i !== index));
    };

    const handleAdditionOldMedicines = (tag) => {
        setOldMedicines((prevTags) => {
            return [...prevTags, tag];
        });
    };

    const handleDeleteOnGoingMedicines = (index) => {
        setOnGoingMedicines(onGoingMedicines.filter((_, i) => i !== index));
    };

    const handleAdditionOnGoingMedicines = (tag) => {
        setOnGoingMedicines((prevTags) => {
            return [...prevTags, tag];
        });
    };

  const [ onGoingProblemsError, setOnGoingProblemsError ] = useState("")
  const [ oldProblemsError, setOldProblemsError ] = useState("")
  const [ doctorContactsError, setDoctorContactsError ] = useState("")
  const [ oldMedicinesError, setOldMedicinesError ] = useState("")
  const [ onGoingMedicinesError, setOnGoingMedicinesError ] = useState("")
  const [ system1Error, setSystem1Error ] = useState("")
  const [ system2Error, setSystem2Error ] = useState("")
  const [ system3Error, setSystem3Error ] = useState("")
  const [ system4Error, setSystem4Error ] = useState("")
  // endregion

  // region Bakım - Hastalıklar & İlaçlar
  const [ onGoingCare, setOnGoingCare ] = useState([])
  const [ oldCare, setOldCare ] = useState([])
  const [ medicalState, setMedicalState ] = useState([])

  const [ fallingStory, setFallingStory ] = useState("")
  const [ balanceState, setBalanceState ] = useState("")

const handleDeleteOnGoingCare = (index) => {
    setOnGoingCare(doctorContacts.filter((_, i) => i !== index));
};

const handleAdditionOnGoingCare = (tag) => {
    setOnGoingCare((prevTags) => {
        return [...prevTags, tag];
    });
};

    const handleDeleteOldCare = (index) => {
        setOldCare(oldCare.filter((_, i) => i !== index));
    };

    const handleAdditionOldCare = (tag) => {
        setOldCare((prevTags) => {
            return [...prevTags, tag];
        });
    };

    const handleDeleteMedicalState = (index) => {
        setMedicalState(medicalState.filter((_, i) => i !== index));
    };

    const handleAdditionMedicalState = (tag) => {
        setMedicalState((prevTags) => {
            return [...prevTags, tag];
        });
    };

  const [ onGoingCareError, setOnGoingCareError ] = useState("")
  const [ oldCareError, setOldCareError ] = useState("")
  const [ medicalStateError, setMedicalStateError ] = useState("")

    const [ fallingStoryError, setFallingStoryError ] = useState("")
    const [ balanceStateError, setBalanceStateError ] = useState("")
    // endregion

  const user = JSON.parse(localStorage.getItem("user"));


  const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };


  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
  };

  const addPatient = async () => {
        const base64Image = await convertToBase64(image);
        fetch("http://localhost:8000/api/patients/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(
            {"email": user.email,
                'type': 'new',
                'patient': {
                        "image": base64Image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
                        "firstname": firstname,
                        "lastname": lastname,
                        "citizenID": citizenID,
                        "motherName": motherName,
                        "fatherName": fatherName,
                        "dateOfBirth": dateOfBirth,
                        "birthPlace": birthPlace,
                        "patientGender": patientGender,
                        "currentRelation": currentRelation,
                        "patientHeight": patientHeight,
                        "patientWeight": patientWeight,
                        "deviceID": deviceID,
                        "education": education,
                        "workStatus": workStatus,
                        "insurance": insurance,
                        "vac": vac,
                        "income": income,
                        "backgroundInfo": backgroundInfo,
                        "contactFirstname": contactFirstname,
                        "contactLastname": contactLastname,
                        "contactCitizenID": contactCitizenID,
                        "contactMotherName": contactMotherName,
                        "contactFatherName": contactFatherName,
                        "contactDateOfBirth": contactDateOfBirth,
                        "contactBirthPlace": contactBirthPlace,
                        "contactPatientGender": contactPatientGender,
                        "contactCurrentRelationship": contactCurrentRelationship,
                        "contactRelation": contactRelation,
                        "contactEducation": contactEducation,
                        "contactWorkStatus": contactWorkStatus,
                        "contactPhone": contactPhone,
                        "contactAddress": contactAddress,
                        "contactWorkAddress": contactWorkAddress,
                        "contactEmail": contactEmail,
                        "contactApply": contactApply,
                        "contactVac": contactVac
                }
            })
        })
        .then(response => response.json())
        .then(data => {
        if ('success' === data['status']) {
            window.alert("Patient is successfully saved.")
            onCancelClick()
        } else {
            window.alert("Patient is NOT saved!")
        }
        })
        .catch(error => {
        console.error('Error:', error);
        window.alert("Patient is NOT saved!");
        });
    }

  const onAddClick = () => {
    let error_occurred = false;
    setFirstnameError("")
    setLastnameError("")
    setCitizenIDError("")
    setMotherNameError("")
    setFatherNameError("")
    setDateOfBirthError("")
    setBirthPlaceError("")
    setPatientGenderError("")
    setCurrentRelationError("")
    setPatientHeightError("")
    setPatientWeightError("")
    setEducationError("")
    setWorkStatusError("")
    setInsuranceError("")
    setVacError("")
    setIncomeError("")
    setBackgroundInfoError("")
    setContactFirstnameError("")
    setContactLastnameError("")
    setContactCitizenIDError("")
    setContactMotherNameError("")
    setContactFatherNameError("")
    setContactDateOfBirthError("")
    setContactBirthPlaceError("")
    setContactPatientGenderError("")
    setContactCurrentRelationshipError("")
    setContactRelationError("")
    setContactEducationError("")
    setContactWorkStatusError("")
    setContactPhoneError("")
    setContactAddressError("")
    setContactWorkAddressError("")
    setContactEmailError("")
    setContactApplyError("")
    setContactVacError("")

    if ("" === firstname) {
        setFirstnameError("Please enter a firstname")
        error_occurred = true
    }

    if ("" === lastname) {
        setLastnameError("Please enter a lastname")
        error_occurred = true
    }

    if ("" === citizenID) {
        setCitizenIDError("Please enter a citizen ID")
        error_occurred = true
    }

    if ("" === motherName) {
        setMotherNameError("Please enter a mother's name")
        error_occurred = true
    }

    if ("" === fatherName) {
        setFatherNameError("Please enter a father's name")
        error_occurred = true
    }

    if ("" === dateOfBirth) {
        setDateOfBirthError("Please enter a date of birth")
        error_occurred = true
    }

    if ("" === birthPlace) {
        setBirthPlaceError("Please enter a birthplace")
        error_occurred = true
    }

    if ("" === patientGender) {
        setPatientGenderError("Please enter a patient gender")
        error_occurred = true
    }

    if ("" === currentRelation) {
        setCurrentRelationError("Please enter a current relation")
        error_occurred = true
    }

    if ("" === patientHeight) {
        setPatientHeightError("Please enter a patient height")
        error_occurred = true
    }

    if ("" === patientWeight) {
        setPatientWeightError("Please enter a patient weight")
        error_occurred = true
    }

    if ("" === education) {
        setEducationError("Please enter an education")
        error_occurred = true
    }

    if ("" === workStatus) {
        setWorkStatusError("Please enter a work status")
        error_occurred = true
    }

    if ("" === insurance) {
        setInsuranceError("Please enter an insurance")
        error_occurred = true
    }

    if ("" === vac) {
        setVacError("Please enter a vaccination status")
        error_occurred = true
    }

    if ("" === income) {
        setIncomeError("Please enter an income")
        error_occurred = true
    }

    if ("" === backgroundInfo) {
        setBackgroundInfoError("Please enter background information")
        error_occurred = true
    }

    if ("" === contactFirstname) {
        setContactFirstnameError("Please enter a contact firstname")
        error_occurred = true
    }

    if ("" === contactLastname) {
        setContactLastnameError("Please enter a contact lastname")
        error_occurred = true
    }

    if ("" === contactCitizenID) {
        setContactCitizenIDError("Please enter a contact citizen ID")
        error_occurred = true
    }

    if ("" === contactMotherName) {
        setContactMotherNameError("Please enter a contact mother's name")
        error_occurred = true
    }

    if ("" === contactFatherName) {
        setContactFatherNameError("Please enter a contact father's name")
        error_occurred = true
    }

    if ("" === contactDateOfBirth) {
        setContactDateOfBirthError("Please enter a contact date of birth")
        error_occurred = true
    }

    if ("" === contactBirthPlace) {
        setContactBirthPlaceError("Please enter a contact birthplace")
        error_occurred = true
    }

    if ("" === contactPatientGender) {
        setContactPatientGenderError("Please enter a contact patient gender")
        error_occurred = true
    }

    if ("" === contactCurrentRelationship) {
        setContactCurrentRelationshipError("Please enter a contact current relationship")
        error_occurred = true
    }

    if ("" === contactRelation) {
        setContactRelationError("Please enter a contact relation")
        error_occurred = true
    }

    if ("" === contactEducation) {
        setContactEducationError("Please enter a contact education")
        error_occurred = true
    }

    if ("" === contactWorkStatus) {
        setContactWorkStatusError("Please enter a contact work status")
        error_occurred = true
    }

    if ("" === contactPhone) {
        setContactPhoneError("Please enter a contact phone")
        error_occurred = true
    }

    if ("" === contactAddress) {
        setContactAddressError("Please enter a contact address")
        error_occurred = true
    }

    if ("" === contactWorkAddress) {
        setContactWorkAddressError("Please enter a contact work address")
        error_occurred = true
    }

    if ("" === contactEmail) {
        setContactEmailError("Please enter a contact email")
        error_occurred = true
    }

    if ("" === contactApply) {
        setContactApplyError("Please enter a contact application status")
        error_occurred = true
    }

    if ("" === contactVac) {
        setContactVacError("Please enter a contact vaccination status")
        error_occurred = true
    }

    if (error_occurred){
        return
    }

    addPatient()

    }

  const onCancelClick = () => {
      setAddTab(false)
      setGeneralTab(true)
  }

  const setPatientPage0 = () => {setPatientPage(0)}
  const setPatientPage1 = () => {setPatientPage(1)}
  const setPatientPage2 = () => {setPatientPage(2)}
  const setPatientPage3 = () => {setPatientPage(3)}
  const setPatientPage4 = () => {setPatientPage(4)}

  const setPatientPageInc = () => {
      if (patientPage === 4) {
          setPatientPage(0)
      }
      else {
          setPatientPage(patientPage+1)
      }
  }

  const setPatientPageDecr = () => {
      if (patientPage === 0) {
          setPatientPage(4)
      }
      else {
          setPatientPage(patientPage-1)
      }
  }

  return (
  <div className="main-container-add-patient">
      <div className="header-add-patient">
          {patientPage === 0 ? <button className="clicked">Danışan Özlük Bilgileri</button>:<button onClick={setPatientPage0}>Danışan Özlük Bilgileri</button>}
          {patientPage === 1 ? <button className="clicked">Danışan Kontağının Bilgileri</button>:<button onClick={setPatientPage1}>Danışan Kontağının Bilgileri</button>}
          {patientPage === 2 ? <button className="clicked">Danışan Psikolojik Durumu</button>:<button onClick={setPatientPage2}>Danışan Psikolojik Durumu</button>}
          {patientPage === 3 ? <button className="clicked">Danışan Bakım Durumu</button>:<button onClick={setPatientPage3}>Danışan Bakım Durumu</button>}
          {patientPage === 4 ? <button className="clicked">Danışan Sağlık Durumu</button>:<button onClick={setPatientPage4}>Danışan Sağlık Durumu</button>}
      </div>
      {
          patientPage === 0 ? <div className="container-add-patient">
          <h1 className="page-title">Danışan Özlük Bilgileri</h1>
          <h1 className="page-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent finibus ipsum ac nibh bibendum, quis sodales orci elementum. Fusce gravida vel quam eleifend ultrices. </h1>
          <div className="information-block">
              <div className="photograph-container">
                  <label for="file-input" className="photograph-label">
                      {!image ? <div><img
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e5168a45362de20f7f0b317084f0918f3bb13f3a77ad5e08dfd70c170e760f86?apiKey=873db62e82664057a5c151e6201a84f6&"
                              alt={"addPhotographAlt"} className="photograph"/>
                              <p>Add Photograph</p></div>
                          : <img for="file-input" src={URL.createObjectURL(image)} alt="Uploaded"/>
                      }
                  </label>
                  <input id="file-input" type="file" accept="image/*" onChange={(e) => handleImageChange(e)}
                         style={{display: "None"}}/>
              </div>
              <h2 className="section-title">Özlük Bilgileri</h2>
              <div className="input-group">
                  <div className={"patienceFormContainer"}>
                      {firstnameError !== "" ? <label className="errorLabel">{firstnameError}</label> : null}
                      <label>Adı</label>
                      <input
                          value={firstname}
                          placeholder=" "
                          onChange={ev => setFirstname(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {lastnameError !== "" ? <label className="errorLabel">{lastnameError}</label> : null}
                      <label>Soyadı</label>
                      <input
                          value={lastname}
                          placeholder=" "
                          onChange={ev => setLastname(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {citizenIDError !== "" ? <label className="errorLabel">{citizenIDError}</label> : null}
                      <label>TC Kimlik Numarası</label>
                      <input
                          value={citizenID}
                          placeholder=" "
                          onChange={ev => setCitizenID(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>

                  <div className={"patienceFormContainer"}>
                      {motherNameError !== "" ? <label className="errorLabel">{motherNameError}</label> : null}
                      <label>Anne Adı</label>
                      <input
                          value={motherName}
                          placeholder=" "
                          onChange={ev => setMotherName(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {fatherNameError !== "" ? <label className="errorLabel">{fatherNameError}</label> : null}
                      <label>Baba Adı</label>
                      <input
                          value={fatherName}
                          placeholder=" "
                          onChange={ev => setFatherName(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {dateOfBirthError !== "" ? <label className="errorLabel">{dateOfBirthError}</label> : null}
                      <label>Doğum Tarihi</label>
                      <input
                          pattern="\d{2}/\d{2}/\d{4}"
                          type="date"
                          value={dateOfBirth}
                          placeholder=" "
                          onChange={ev => setDateOfBirth(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>

                  <div className={"patienceFormContainer"}>
                      {birthPlaceError !== "" ? <label className="errorLabel">{birthPlaceError}</label> : null}
                      <label>Doğum Yeri</label>
                      <input
                          value={birthPlace}
                          placeholder=" "
                          onChange={ev => setBirthPlace(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {patientGenderError !== "" ? <label className="errorLabel">{patientGenderError}</label> : null}
                      <label>Cinsiyet</label>
                      <input
                          value={patientGender}
                          placeholder=" "
                          onChange={ev => setPatientGender(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {currentRelationError !== "" ? <label className="errorLabel">{currentRelationError}</label> : null}
                      <label>Medeni Durum</label>
                      <input
                          value={currentRelation}
                          placeholder=" "
                          onChange={ev => setCurrentRelation(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>
              </div>

          </div>
          <div className="divider">.</div>
          <div className="information-block">
              <h2 className="section-title">Eğitim/İş/Güvenlik Bilgileri</h2>
              <div className="input-group">
                  <div className={"patienceFormContainer"}>
                      {educationError !== "" ? <label className="errorLabel">{educationError}</label> : null}
                      <label>Öğrenim Durumu</label>
                      <input
                          value={education}
                          placeholder=" "
                          onChange={ev => setEducation(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {workStatusError !== "" ? <label className="errorLabel">{workStatusError}</label> : null}
                      <label>Çalışma Durumu</label>
                      <input
                          value={workStatus}
                          placeholder=" "
                          onChange={ev => setWorkStatus(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {insuranceError !== "" ? <label className="errorLabel">{insuranceError}</label> : null}
                      <label>Sosyal Güvence</label>
                      <input
                          value={insurance}
                          placeholder=" "
                          onChange={ev => setInsurance(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>

                  <div className={"patienceFormContainer"}>
                      {vacError !== "" ? <label className="errorLabel">{vacError}</label> : null}
                      <label>Aşı Durumu</label>
                      <Select
                          defaultValue={vac}
                          options={vac_options}
                          isMulti
                          placeholder=" "
                          onChange={setVac}
                          className={"patienceFormBox basic-multi-select"}
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {incomeError !== "" ? <label className="errorLabel">{incomeError}</label> : null}
                      <label>Aylık Gelir</label>
                      <input
                          value={income}
                          placeholder=" "
                          onChange={ev => setIncome(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {backgroundInfoError !== "" ? <label className="errorLabel">{backgroundInfoError}</label> : null}
                      <label>Adli Sicil Kaydı</label>
                      <Select
                          defaultValue={backgroundInfo}
                          options={[
                                  { value: 'var', label: 'Var' },
                                  { value: 'yok', label: 'Yok' }
                              ]}
                          onChange={setBackgroundInfo}
                          className={"patienceFormBox"}
                          />
                  </div>

              </div>
          </div>
          <div className="divider">.</div>
          <div className="information-block">
              <div className="patient-add-button-container">
                  <button style={{backgroundColor: "#E77169", float: "left"}} onClick={onCancelClick}>Cancel</button>
                  <button style={{backgroundColor: "#A695CC", float: "right"}} onClick={setPatientPageInc}>Next</button>
              </div>
          </div>
      </div>:
          patientPage === 1 ? <div className="container-add-patient">
          <h1 className="page-title">Danışan Kontağının Özlük Bilgileri</h1>
          <h1 className="page-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent finibus ipsum ac nibh bibendum, quis sodales orci elementum. Fusce gravida vel quam eleifend ultrices. </h1>
          <div className="information-block">
              <h2 className="section-title">Özlük Bilgileri</h2>
              <div className="input-group">
                  <div className={"patienceFormContainer"}>
                      {contactFirstnameError !== "" ? <label className="errorLabel">{contactFirstnameError}</label> : null}
                      <label>Adı</label>
                      <input
                          value={contactFirstname}
                          placeholder=" "
                          onChange={ev => setContactFirstname(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {contactLastnameError !== "" ? <label className="errorLabel">{contactLastnameError}</label> : null}
                      <label>Soyadı</label>
                      <input
                          value={contactLastname}
                          placeholder=" "
                          onChange={ev => setContactLastname(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {contactCitizenIDError !== "" ? <label className="errorLabel">{contactCitizenIDError}</label> : null}
                      <label>TC Kimlik Numarası</label>
                      <input
                          value={contactCitizenID}
                          placeholder=" "
                          onChange={ev => setContactCitizenID(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>

                  <div className={"patienceFormContainer"}>
                      {contactMotherNameError !== "" ? <label className="errorLabel">{contactMotherNameError}</label> : null}
                      <label>Anne Adı</label>
                      <input
                          value={contactMotherName}
                          placeholder=" "
                          onChange={ev => setContactMotherName(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {contactFatherNameError !== "" ? <label className="errorLabel">{contactFatherNameError}</label> : null}
                      <label>Baba Adı</label>
                      <input
                          value={contactFatherName}
                          placeholder=" "
                          onChange={ev => setContactFatherName(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {contactDateOfBirthError !== "" ? <label className="errorLabel">{contactDateOfBirthError}</label> : null}
                      <label>Doğum Tarihi</label>
                      <input
                          pattern="\d{2}/\d{2}/\d{4}"
                          type="date"
                          value={contactDateOfBirth}
                          placeholder=" "
                          onChange={ev => setContactDateOfBirth(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>

                  <div className={"patienceFormContainer"}>
                      {contactBirthPlaceError !== "" ? <label className="errorLabel">{contactBirthPlaceError}</label> : null}
                      <label>Doğum Yeri</label>
                      <input
                          value={contactBirthPlace}
                          placeholder=" "
                          onChange={ev => setContactBirthPlace(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {contactPatientGenderError !== "" ? <label className="errorLabel">{contactPatientGenderError}</label> : null}
                      <label>Cinsiyet</label>
                      <input
                          value={contactPatientGender}
                          placeholder=" "
                          onChange={ev => setContactPatientGender(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {contactCurrentRelationshipError !== "" ? <label className="errorLabel">{contactCurrentRelationshipError}</label> : null}
                      <label>Medeni Durum</label>
                      <input
                          value={contactCurrentRelationship}
                          placeholder=" "
                          onChange={ev => setContactCurrentRelationship(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>
              </div>

          </div>
          <div className="divider">.</div>
          <div className="information-block">
              <h2 className="section-title">İletişim Bilgileri</h2>
              <div className="input-group">
                  <div className={"patienceFormContainer"}>
                      {contactEducationError !== "" ? <label className="errorLabel">{contactEducationError}</label> : null}
                      <label>Öğrenim Durumu</label>
                      <input
                          value={contactEducation}
                          placeholder=" "
                          onChange={ev => setContactEducation(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {contactRelationError !== "" ? <label className="errorLabel">{contactRelationError}</label> : null}
                      <label>Yakınlık Derecesi</label>
                      <input
                          value={contactRelation}
                          placeholder=" "
                          onChange={ev => setContactRelation(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {contactWorkStatusError !== "" ? <label className="errorLabel">{contactWorkStatusError}</label> : null}
                      <label>İşi</label>
                      <input
                          value={contactWorkStatus}
                          placeholder=" "
                          onChange={ev => setContactWorkStatus(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>

                  <div className={"patienceFormContainer"}>
                      {contactPhoneError !== "" ? <label className="errorLabel">{contactPhoneError}</label> : null}
                      <label>Telefon Numarası</label>
                      <input
                          value={contactPhone}
                          placeholder=" "
                          onChange={ev => setContactPhone(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {contactAddressError !== "" ? <label className="errorLabel">{contactAddressError}</label> : null}
                      <label>İkamet Adresi</label>
                      <input
                          value={contactAddress}
                          placeholder=" "
                          onChange={ev => setContactAddress(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {contactWorkAddressError !== "" ? <label className="errorLabel">{contactWorkAddressError}</label> : null}
                      <label>İş Adresi</label>
                      <input
                          value={contactWorkAddress}
                          placeholder=" "
                          onChange={ev => setContactWorkAddress(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>

                  <div className={"patienceFormContainer"}>
                      {contactEmailError !== "" ? <label className="errorLabel">{contactEmailError}</label> : null}
                      <label>E-Posta Adresi</label>
                      <input
                          value={contactEmail}
                          placeholder=" "
                          onChange={ev => setContactEmail(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {contactApplyError !== "" ? <label className="errorLabel">{contactApplyError}</label> : null}
                      <label>Müracaat Tarihi</label>
                      <input
                          pattern="\d{2}/\d{2}/\d{4}"
                          type="date"
                          value={contactApply}
                          placeholder=" "
                          onChange={ev => setContactApply(ev.target.value)}
                          className={"patienceFormBox"}
                          />
                  </div>

                  <div className={"patienceFormContainer"}>
                      {contactVacError !== "" ? <label className="errorLabel">{contactVacError}</label> : null}
                      <label>Aşı Durumu</label>
                      <Select
                          defaultValue={contactVac}
                          options={vac_options}
                          isMulti
                          placeholder=" "
                          onChange={setContactVac}
                          className={"patienceFormBox basic-multi-select"}
                          />
                  </div>
              </div>
          </div>
          <div className="divider">.</div>
          <div className="information-block">
              <div className="patient-add-button-container">
                  <button style={{backgroundColor: "#E77169", float: "left"}} onClick={setPatientPageDecr}>Back</button>
                  <button style={{backgroundColor: "#A695CC", float: "right"}} onClick={setPatientPageInc}>Next</button>
              </div>
          </div>
      </div>:
          patientPage === 2 ? <div className="container-add-patient">
          <h1 className="page-title">Danışan Sağlık Bilgileri</h1>
          <h1 className="page-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent finibus ipsum ac nibh bibendum, quis sodales orci elementum. Fusce gravida vel quam eleifend ultrices. </h1>
          <div className="information-block">
              <h2 className="section-title">Hastalıklar & İlaçlar</h2>
              <div className="input-group-2">
                  <div className={"patienceFormContainer"}>
                      {onGoingProblemsError !== "" ? <label className="errorLabel">{onGoingProblemsError}</label> : null}
                      <label>Devam Eden Hastalıklar</label>
                      <ReactTags
                          className={"patienceFormBox"}
                          placeholder=" "
                          tags={onGoingProblems}
                          separators={["Enter"]}
                          handleDelete={handleDeleteOnGoingProblems}
                          handleAddition={handleAdditionOnGoingProblems}
                          allowDragDrop={false}
                          inputFieldPosition="bottom"
                          maxTags={3}
                          allowAdditionFromPaste
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {oldProblemsError !== "" ? <label className="errorLabel">{oldProblemsError}</label> : null}
                      <label>Geçirmişler Olduğu Hastalıklar ve Operasyon Var Mı?</label>
                      <ReactTags
                          className={"patienceFormBox"}
                          placeholder=" "
                          tags={oldProblems}
                          separators={["Enter"]}
                          handleDelete={handleDeleteOldProblems}
                          handleAddition={handleAdditionOldProblems}
                          allowDragDrop={false}
                          inputFieldPosition="bottom"
                          maxTags={3}
                          allowAdditionFromPaste
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {doctorContactsError !== "" ? <label className="errorLabel">{doctorContactsError}</label> : null}
                      <label>Hastayı Tanıyan/takip Eden Hastane-doktor Adı ve İletişim Bilgileri Var Mı?</label>
                      <ReactTags
                          className={"patienceFormBox"}
                          placeholder=" "
                          tags={doctorContacts}
                          separators={["Enter"]}
                          handleDelete={handleDeleteDoctorContacts}
                          handleAddition={handleAdditionDoctorContacts}
                          allowDragDrop={false}
                          inputFieldPosition="bottom"
                          maxTags={3}
                          allowAdditionFromPaste
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {oldMedicinesError !== "" ? <label className="errorLabel">{oldMedicinesError}</label> : null}
                      <label>Daha önce kullandığı fakat şu anda kesilen İlacı var mı?</label>
                      <ReactTags
                          className={"patienceFormBox"}
                          placeholder=" "
                          tags={oldMedicines}
                          separators={["Enter"]}
                          handleDelete={handleDeleteOldMedicines}
                          handleAddition={handleAdditionOldMedicines}
                          allowDragDrop={false}
                          inputFieldPosition="bottom"
                          maxTags={3}
                          allowAdditionFromPaste
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {onGoingMedicinesError !== "" ? <label className="errorLabel">{onGoingMedicinesError}</label> : null}
                      <label>Kullanmakta Olduğu İlaçlar</label>
                      <ReactTags
                          className={"patienceFormBox"}
                          placeholder=" "
                          tags={onGoingMedicines}
                          separators={["Enter"]}
                          handleDelete={handleDeleteOnGoingMedicines}
                          handleAddition={handleAdditionOnGoingMedicines}
                          allowDragDrop={false}
                          inputFieldPosition="bottom"
                          maxTags={3}
                          allowAdditionFromPaste
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {system1 !== "" ? <label className="errorLabel">{system1Error}</label> : null}
                      <label>Solunum Sistemi</label>
                      <textarea
                          value={system1}
                          placeholder=" "
                          onChange={ev => setSystem1(ev.target.value)}
                          className={"patienceFormBox"}
                      ></textarea>
                  </div>
                  <div className={"patienceFormContainer"}>
                      {system2 !== "" ? <label className="errorLabel">{system2Error}</label> : null}
                      <label>Kardiyovasküler Sistem</label>
                      <textarea
                          value={system2}
                          placeholder=" "
                          onChange={ev => setSystem2(ev.target.value)}
                          className={"patienceFormBox"}
                      ></textarea>
                  </div>
                  <div className={"patienceFormContainer"}>
                      {system3 !== "" ? <label className="errorLabel">{system3Error}</label> : null}
                      <label>Sindirim Sistemi</label>
                      <textarea
                          value={system3}
                          placeholder=" "
                          onChange={ev => setSystem3(ev.target.value)}
                          className={"patienceFormBox"}
                      ></textarea>
                  </div>
                  <div className={"patienceFormContainer"}>
                      {system4 !== "" ? <label className="errorLabel">{system4Error}</label> : null}
                      <label>Genitoüriner Sistem</label>
                      <textarea
                          value={system4}
                          placeholder=" "
                          onChange={ev => setSystem4(ev.target.value)}
                          className={"patienceFormBox"}
                      ></textarea>
                  </div>

              </div>

          </div>
          <div className="divider">.</div>
          <div className="information-block">
              <div className="patient-add-button-container">
                  <button style={{backgroundColor: "#E77169", float: "left"}} onClick={setPatientPageInc}>Back</button>
                  <button style={{backgroundColor: "#A695CC", float: "right"}} onClick={setPatientPageInc}>Next</button>
              </div>
          </div>
      </div>:
          patientPage === 3 ? <div className="container-add-patient">
          <h1 className="page-title">Danışan Sağlık Bilgileri</h1>
          <h1 className="page-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent finibus ipsum ac nibh bibendum, quis sodales orci elementum. Fusce gravida vel quam eleifend ultrices. </h1>
          <div className="information-block">
              <h2 className="section-title">Hastalıklar & İlaçlar</h2>
              <div className="input-group-2">
                  <div className={"patienceFormContainer"}>
                      {onGoingCareError !== "" ? <label className="errorLabel">{onGoingCareError}</label> : null}
                      <label>Devam Eden Bakım Durumu</label>
                      <ReactTags
                          className={"patienceFormBox"}
                          placeholder=" "
                          tags={onGoingCare}
                          separators={["Enter"]}
                          handleDelete={handleDeleteOnGoingCare}
                          handleAddition={handleAdditionOnGoingCare}
                          allowDragDrop={false}
                          inputFieldPosition="bottom"
                          maxTags={3}
                          allowAdditionFromPaste
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {oldCareError !== "" ? <label className="errorLabel">{oldCareError}</label> : null}
                      <label>Daha önce Uygulanan fakat şu anda kesilen Bakım var mı?</label>
                      <ReactTags
                          className={"patienceFormBox"}
                          placeholder=" "
                          tags={oldCare}
                          separators={["Enter"]}
                          handleDelete={handleDeleteOldCare}
                          handleAddition={handleAdditionOldCare}
                          allowDragDrop={false}
                          inputFieldPosition="bottom"
                          maxTags={3}
                          allowAdditionFromPaste
                          />
                  </div>
                  <div className={"patienceFormContainer"}>
                      {medicalStateError !== "" ? <label className="errorLabel">{medicalStateError}</label> : null}
                      <label>Kullanmakta Olduğu Medikal Durumlar</label>
                      <ReactTags
                          className={"patienceFormBox"}
                          placeholder=" "
                          tags={medicalState}
                          separators={["Enter"]}
                          handleDelete={handleDeleteMedicalState}
                          handleAddition={handleAdditionMedicalState}
                          allowDragDrop={false}
                          inputFieldPosition="bottom"
                          maxTags={3}
                          allowAdditionFromPaste
                          />
                  </div>


                  <div className={"patienceFormContainer"}>
                      {fallingStoryError !== "" ? <label className="errorLabel">{fallingStoryError}</label> : null}
                      <label>Düşme Hikayesi</label>
                      <label>Düşme Hikayesini Anlatınız</label>
                      <textarea
                          value={fallingStory}
                          placeholder=" "
                          onChange={ev => setFallingStory(ev.target.value)}
                          className={"patienceFormBox"}
                      ></textarea>
                  </div>
                  <div className={"patienceFormContainer"}>
                      {balanceState !== "" ? <label className="errorLabel">{balanceStateError}</label> : null}
                      <label>Denge ve Yürüme Bozukluğu</label>
                      <textarea
                          value={balanceState}
                          placeholder=" "
                          onChange={ev => setBalanceState(ev.target.value)}
                          className={"patienceFormBox"}
                      ></textarea>
                  </div>
              </div>

          </div>
          <div className="divider">.</div>
          <div className="information-block">
              <div className="patient-add-button-container">
                  <button style={{backgroundColor: "#E77169", float: "left"}} onClick={setPatientPageInc}>Back</button>
                  <button style={{backgroundColor: "#A695CC", float: "right"}} onClick={setPatientPageInc}>Next</button>
              </div>
          </div>
      </div>:
          // patientPage === 3 ? <div className="container-add-patient">
          //         <h1 className="page-title">Add Patient</h1>
          //         <div className="divider">.</div>
          //         <div className="patient-personal-information">
          //             <h2 className="section-title">Patient's Personal Information</h2>
          //             <div className="photograph-container">
          //                 <label htmlFor="file-input" className="photograph-label">
          //                     {!image ? <div><img
          //                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/e5168a45362de20f7f0b317084f0918f3bb13f3a77ad5e08dfd70c170e760f86?apiKey=873db62e82664057a5c151e6201a84f6&"
          //                             alt={"addPhotographAlt"} className="photograph"/>
          //                             <p>Add Photograph</p></div>
          //                         : <img htmlFor="file-input" src={URL.createObjectURL(image)} alt="Uploaded"/>
          //                     }
          //                 </label>
          //                 <input id="file-input" type="file" accept="image/*" onChange={(e) => handleImageChange(e)}
          //                        style={{display: "None"}}/>
          //             </div>
          //
          //             <div className="input-group">
          //                 <div className={"formContainer"} style={{width: '48%', float: 'left'}}>
          //                     <input
          //                         value={firstname}
          //                         placeholder=" "
          //                         onChange={ev => setFirstname(ev.target.value)}
          //                         className={"formBox"}/>
          //                     {firstnameError !== "" ? <label className="errorLabel">{firstnameError}</label> : null}
          //                     {firstnameError === "" ? <label>Name</label> : null}
          //                 </div>
          //                 <div className={"formContainer"} style={{width: '48%', float: 'right'}}>
          //                     <input
          //                         value={lastname}
          //                         placeholder=" "
          //                         onChange={ev => setLastname(ev.target.value)}
          //                         className={"formBox"}/>
          //                     {lastnameError !== "" ? <label className="errorLabel">{lastnameError}</label> : null}
          //                     {lastnameError === "" ? <label>Surname</label> : null}
          //                 </div>
          //             </div>
          //             <div className="input-group">
          //                 <div className={"formContainer"} style={{width: '48%', float: 'left'}}>
          //                     <input
          //                         value={deviceID}
          //                         placeholder=" "
          //                         onChange={ev => setDeviceID(ev.target.value)}
          //                         className={"formBox"}/>
          //                     {deviceIDError !== "" ? <label className="errorLabel">{deviceIDError}</label> : null}
          //                     {deviceIDError === "" ? <label>Device ID</label> : null}
          //                 </div>
          //                 <div className={"formContainer"} style={{width: '48%', float: 'right'}}>
          //                     <input
          //                         value={citizenID}
          //                         placeholder=" "
          //                         onChange={ev => setCitizenID(ev.target.value)}
          //                         className={"formBox"}/>
          //                     {citizenIDError !== "" ? <label className="errorLabel">{citizenIDError}</label> : null}
          //                     {citizenIDError === "" ? <label>Citizen ID</label> : null}
          //                 </div>
          //             </div>
          //             <div className="input-group">
          //                 <div className={"formContainer"} style={{width: '48%', float: 'left'}}>
          //                     <input
          //                         value={careCategory}
          //                         placeholder=" "
          //                         onChange={ev => setCareCategory(ev.target.value)}
          //                         className={"formBox"}/>
          //                     {careCategoryError !== "" ?
          //                         <label className="errorLabel">{careCategoryError}</label> : null}
          //                     {careCategoryError === "" ? <label>Care Category</label> : null}
          //                 </div>
          //                 <div className={"formContainer"} style={{width: '48%', float: 'right'}}>
          //                     <input
          //                         pattern="\d{2}/\d{2}/\d{4}"
          //                         type="date"
          //                         value={dateOfBirth}
          //                         placeholder=" "
          //                         onChange={ev => setDateOfBirth(ev.target.value)}
          //                         // onChange="console.log(this.value);"
          //                         className={"formBox"}/>
          //                     {dateOfBirthError !== "" ?
          //                         <label className="errorLabel">{dateOfBirthError}</label> : null}
          //                     {dateOfBirthError === "" ? <label>Date of Birth (dd/mm/yyyy)</label> : null}
          //                 </div>
          //             </div>
          //             <div className="input-group">
          //                 <div className={"formContainer"} style={{width: '48%', float: 'left'}}>
          //                     <input
          //                         value={floorNo}
          //                         placeholder=" "
          //                         onChange={ev => setFloorNo(ev.target.value)}
          //                         className={"formBox"}/>
          //                     {floorNoError !== "" ? <label className="errorLabel">{floorNoError}</label> : null}
          //                     {floorNoError === "" ? <label>Floor</label> : null}
          //                 </div>
          //                 <div className={"formContainer"} style={{width: '48%', float: 'right'}}>
          //                     <select
          //                         value={bloodType}
          //                         onChange={ev => setBloodType(ev.target.value)}
          //                         className={"formBox"}>
          //                         <option hidden selected={true} value="">--Select a Blood Type--</option>
          //                         <option value="A+">A (Rh+)</option>
          //                         <option value="A-">A (Rh-)</option>
          //                         <option value="B+">B (Rh+)</option>
          //                         <option value="B-">B (Rh-)</option>
          //                         <option value="AB+">AB (Rh+)</option>
          //                         <option value="AB-">AB (Rh-)</option>
          //                         <option value="0+">0 (Rh+)</option>
          //                         <option value="0-">0 (Rh-)</option>
          //                     </select>
          //                     {/*{bloodTypeError !== "" ? <label className="errorLabel" >{bloodTypeError}</label>: null}*/}
          //                     {/*{bloodTypeError === "" ? <label>Blood Type</label>: null}*/}
          //                 </div>
          //             </div>
          //             <div className="input-group">
          //                 <div className={"formContainer"} style={{width: '48%', float: 'left'}}>
          //                     <input
          //                         value={patientHeight}
          //                         placeholder=" "
          //                         onChange={ev => setPatientHeight(ev.target.value)}
          //                         className={"formBox"}/>
          //                     {patientHeightError !== "" ?
          //                         <label className="errorLabel">{patientHeightError}</label> : null}
          //                     {patientHeightError === "" ? <label>Height (cm)</label> : null}
          //                 </div>
          //                 <div className={"formContainer"} style={{width: '48%', float: 'right'}}>
          //                     <input
          //                         value={patientWeight}
          //                         placeholder=" "
          //                         onChange={ev => setPatientWeight(ev.target.value)}
          //                         className={"formBox"}/>
          //                     {patientWeightError !== "" ?
          //                         <label className="errorLabel">{patientWeightError}</label> : null}
          //                     {patientWeightError === "" ? <label>Weight (kg)</label> : null}
          //                 </div>
          //                 <div className={"formContainer"} style={{width: '48%', display: 'inline-grid'}}>
          //                     {/*<input*/}
          //                     {/*    value={patientGender}*/}
          //                     {/*    placeholder=" "*/}
          //                     {/*    onChange={ev => setPatientGender(ev.target.value)}*/}
          //                     {/*    className={"formBox"} />*/}
          //                     <select
          //                         value={patientGender}
          //                         onChange={ev => setPatientGender(ev.target.value)}
          //                         className={"formBox"}>
          //                         <option hidden selected={true} value="">--Select a Gender--</option>
          //                         <option value="Male">Male</option>
          //                         <option value="Female">Female</option>
          //                     </select>
          //                     {/*{patientGenderError !== "" ? <label className="errorLabel" >{patientGenderError}</label>: null}*/}
          //                     {/*{patientGenderError === "" ? <label>Gender</label>: null}*/}
          //                 </div>
          //             </div>
          //         </div>
          //         <div className="divider">.</div>
          //         <div className="patient-contact-information">
          //             <h2 className="section-title">Patient's Contact Information</h2>
          //             <div className="input-group">
          //                 <div className={"formContainer"} style={{width: '48%', float: 'left'}}>
          //                     <input
          //                         value={contactFirstname}
          //                         placeholder=" "
          //                         onChange={ev => setContactFirstname(ev.target.value)}
          //                         className={"formBox"}/>
          //                     <label>Name</label>
          //                 </div>
          //                 <div className={"formContainer"} style={{width: '48%', float: 'right'}}>
          //                     <input
          //                         value={contactLastname}
          //                         placeholder=" "
          //                         onChange={ev => setContactLastname(ev.target.value)}
          //                         className={"formBox"}/>
          //                     <label>Surname</label>
          //                 </div>
          //                 <div className={"formContainer"} style={{width: '48%', display: 'inline-grid'}}>
          //                     <input
          //                         value={contactPhoneNo}
          //                         placeholder=" "
          //                         onChange={ev => setContactPhoneNo(ev.target.value)}
          //                         className={"formBox"}/>
          //                     <label>Phone Number</label>
          //                 </div>
          //             </div>
          //         </div>
          //         <div className="divider">.</div>
          //         <div className="patient-add-button-container">
          //             <button style={{backgroundColor: "#E77169", float: "left"}} onClick={setPatientPageInc}>Back</button>
          //             <button style={{backgroundColor: "#A695CC", float: "right"}} onClick={onAddClick}>Add</button>
          //         </div>
          //     </div>:
          patientPage === 4 ? null:null
      }
  </div>
  );
}

export default PatientAdd;
