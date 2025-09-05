import * as React from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { WithContext as ReactTags } from 'react-tag-input';
import Select from '@mui/material/Select';
import { Autocomplete, Chip } from '@mui/material';



import './patients_tab_add.css'
import {useState} from "react";



function PatientAdd({ setGeneralTab, setAddTab }) {

  const [ patientPage, setPatientPage ] = useState(0)

  const vac_options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
  ]

  // region hasta özlük
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
  const [ patientRoom, setPatientRoom ] = useState("")
  const [ deviceID, setDeviceID ] = useState("")
  const [ bloodType, setBloodType ] = useState("")


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
  const [ patientRoomError, setPatientRoomError ] = useState("")
  const [ bloodTypeError, setBloodTypeError ] = useState("")

  // endregion

  // region hasta eğitim
  const [ education, setEducation ] = useState("")
  const [ workStatus, setWorkStatus ] = useState("")
  const [ insurance, setInsurance ] = useState("")
  const [ income, setIncome ] = useState("")
  const [ backgroundInfo, setBackgroundInfo ] = useState("")

  const [ educationError, setEducationError ] = useState("")
  const [ workStatusError, setWorkStatusError ] = useState("")
  const [ insuranceError, setInsuranceError ] = useState("")
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


  const [ contactRelationError, setContactRelationError ] = useState("")
  const [ contactEducationError, setContactEducationError ] = useState("")
  const [ contactWorkStatusError, setContactWorkStatusError ] = useState("")
  const [ contactPhoneError, setContactPhoneError ] = useState("")
  const [ contactAddressError, setContactAddressError ] = useState("")
  const [ contactWorkAddressError, setContactWorkAddressError ] = useState("")
  const [ contactEmailError, setContactEmailError ] = useState("")
  const [ contactApplyError, setContactApplyError ] = useState("")
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
            {'email': user.email,
                    'type': 'new',
                    'patient_personal_info': {
                        "section_1": {
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
                            "income": income,
                            "backgroundInfo": backgroundInfo,
                            "patientRoom": patientRoom,
                            "bloodType": bloodType
                        },
                        "section_2": {
                            "contactFirstname": contactFirstname,
                            "contactLastname": contactLastname,
                            "contactCitizenID": contactCitizenID,
                            "contactMotherName": contactMotherName,
                            "contactFatherName": contactFatherName,
                            "contactDateOfBirth": contactDateOfBirth,
                            "contactBirthPlace": contactBirthPlace,
                            "contactPatientGender": contactPatientGender,
                            "contactCurrentRelationship": contactCurrentRelationship,
                            "contactFirstnameError": contactFirstnameError,
                            "contactLastnameError": contactLastnameError,
                            "contactCitizenIDError": contactCitizenIDError,
                            "contactMotherNameError": contactMotherNameError,
                            "contactFatherNameError": contactFatherNameError,
                            "contactDateOfBirthError": contactDateOfBirthError,
                            "contactBirthPlaceError": contactBirthPlaceError,
                            "contactPatientGenderError": contactPatientGenderError,
                            "contactCurrentRelationshipError": contactCurrentRelationshipError,
                            "contactRelation": contactRelation,
                            "contactEducation": contactEducation,
                            "contactWorkStatus": contactWorkStatus,
                            "contactPhone": contactPhone,
                            "contactAddress": contactAddress,
                            "contactWorkAddress": contactWorkAddress,
                            "contactEmail": contactEmail,
                            "contactApply": contactApply
                        },
                        "section_3": {
                            "onGoingProblems": onGoingProblems,
                            "oldProblems": oldProblems,
                            "doctorContacts": doctorContacts,
                            "oldMedicines": oldMedicines,
                            "onGoingMedicines": onGoingMedicines,
                            "system1": system1,
                            "system2": system2,
                            "system3": system3,
                            "system4": system4
                        },
                        "section_4": {}
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
      console.log("TEst")
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

    // if (error_occurred){
    //     return
    // }

    console.log("Test")
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
          {patientPage === 1 ? <button className="clicked">Danışan Kontağının Özlük Bilgileri</button>:<button onClick={setPatientPage1}>Danışan Kontağının Özlük Bilgileri</button>}
          {patientPage === 2 ? <button className="clicked">Danışan Sağlık Durumu</button>:<button onClick={setPatientPage2}>Danışan Sağlık Durumu</button>}
          {patientPage === 3 ? <button className="clicked">Danışan Bakım Durumu</button>:<button onClick={setPatientPage3}>Danışan Bakım Durumu</button>}
          {patientPage === 4 ? <button className="clicked">Danışan Psikolojik Durumu</button>:<button onClick={setPatientPage4}>Danışan Psikolojik Durumu</button>}
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
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {firstnameError !== "" ? <InputLabel className="outlined-adornment-firstname">{firstnameError}</InputLabel> : null}
                        <InputLabel htmlFor="outlined-adornment-firstname">Adı</InputLabel>
                        <OutlinedInput
                        id="outlined-adornment-firstname"
                        type="text"
                        value={firstname}
                        label="Adı"
                        onChange={(e) => setFirstname(e.target.value)}
                        />
                        </FormControl>
                  </div>
                  <div className={"patienceFormContainer"}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {lastnameError !== "" ? <InputLabel className="outlined-adornment-lastname">{lastnameError}</InputLabel> : null}
                        <InputLabel htmlFor="outlined-adornment-lastname">Soyadı</InputLabel>
                        <OutlinedInput
                        id="outlined-adornment-lastname"
                        type="text"
                        value={lastname}
                        label="Soyadı"
                        onChange={(e) => setLastname(e.target.value)}
                        />
                        </FormControl>
                  </div>
                  <div className={"patienceFormContainer"}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {citizenIDError !== "" ? <InputLabel className="outlined-adornment-citizenID">{citizenIDError}</InputLabel> : null}
                        <InputLabel htmlFor="outlined-adornment-citizenID">TC Kimlik Numarası</InputLabel>
                        <OutlinedInput
                        id="outlined-adornment-citizenID"
                        type="text"
                        value={citizenID}
                        label="TC Kimlik Numarası"
                        onChange={(e) => setCitizenID(e.target.value)}
                        />
                        </FormControl>
                  </div>

                  <div className={"patienceFormContainer"}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {motherNameError !== "" ? <InputLabel className="outlined-adornment-motherName">{motherNameError}</InputLabel> : null}
                        <InputLabel htmlFor="outlined-adornment-motherName">Anne Adı</InputLabel>
                        <OutlinedInput
                        id="outlined-adornment-motherName"
                        type="text"
                        value={motherName}
                        label="Anne Adı"
                        onChange={(e) => setMotherName(e.target.value)}
                        />
                    </FormControl>
                  </div>
                  <div className={"patienceFormContainer"}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {fatherNameError !== "" ? <InputLabel className="outlined-adornment-fatherName">{fatherNameError}</InputLabel> : null}
                        <InputLabel htmlFor="outlined-adornment-fatherName">Baba Adı</InputLabel>
                        <OutlinedInput
                        id="outlined-adornment-fatherName"
                        type="text"
                        value={fatherName}
                        label="Baba Adı"
                        onChange={(e) => setFatherName(e.target.value)}
                        />
                    </FormControl>
                  </div>
                  <div className={"patienceFormContainer"}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {dateOfBirthError !== "" ? <InputLabel className="outlined-adornment-dateOfBirth">{dateOfBirthError}</InputLabel> : null}
                        <InputLabel shrink htmlFor="outlined-adornment-dateOfBirth">Doğum Tarihi</InputLabel>
                        <OutlinedInput
                        id="outlined-adornment-dateOfBirth"
                        type="date"
                        value={dateOfBirth}
                        label="Doğum Tarihi"
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                    </FormControl>
                  </div>

                  <div className={"patienceFormContainer"}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {birthPlaceError !== "" ? <InputLabel className="outlined-adornment-birthPlace">{birthPlaceError}</InputLabel> : null}
                        <InputLabel htmlFor="outlined-adornment-birthPlace">Doğum Yeri</InputLabel>
                        <OutlinedInput
                        id="outlined-adornment-birthPlace"
                        type="text"
                        value={birthPlace}
                        label="Doğum Yeri"
                        onChange={(e) => setBirthPlace(e.target.value)}
                        />
                    </FormControl>
                  </div>
                  <div className={"patienceFormContainer"}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                          {patientGenderError !== "" ? <InputLabel className="outlined-adornment-patientGender">{patientGenderError}</InputLabel> : null}
                          <InputLabel htmlFor="outlined-adornment-patientGender">Cinsiyet</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-patientGender"
                            type="text"
                            value={patientGender}
                            label="Cinsiyet"
                            onChange={ev => setPatientGender(ev.target.value)}
                          />
                        </FormControl>
                  </div>
                  <div className={"patienceFormContainer"}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                                  {currentRelationError !== "" ? <InputLabel className="outlined-adornment-currentRelation">{currentRelationError}</InputLabel> : null}
                                  <InputLabel htmlFor="outlined-adornment-currentRelation">Medeni Durum</InputLabel>
                                  <OutlinedInput
                                    id="outlined-adornment-currentRelation"
                                    type="text"
                                    value={currentRelation}
                                    label="Medeni Durum"
                                    onChange={ev => setCurrentRelation(ev.target.value)}
                                  />
                        </FormControl>
                  </div>

                  <div className={"patienceFormContainer"}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                                  {patientHeightError !== "" ? <InputLabel className="outlined-adornment-height">{patientHeightError}</InputLabel> : null}
                                  <InputLabel htmlFor="outlined-adornment-height">Boy</InputLabel>
                                  <OutlinedInput
                                    id="outlined-adornment-height"
                                    type="number" step="0.01"
                                    value={patientHeight}
                                    endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                                    label="Kilo"
                                    onChange={ev => setPatientHeight(ev.target.value)}
                                  />
                        </FormControl>

                  </div>

                  <div className={"patienceFormContainer"}>
                        <FormControl fullWidth sx={{ m: 1 }}>
                                  {patientWeightError !== "" ? <InputLabel className="outlined-adornment-weight">{patientWeightError}</InputLabel> : null}
                                  <InputLabel htmlFor="outlined-adornment-weight">Kilo</InputLabel>
                                  <OutlinedInput
                                    id="outlined-adornment-weight"
                                    type="number" step="0.01"
                                    value={patientWeight}
                                    endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                                    label="Kilo"
                                    onChange={ev => setPatientWeight(ev.target.value)}
                                  />
                        </FormControl>
                  </div>

                  <div className={"patienceFormContainer"}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                                  {bloodTypeError !== "" ? <InputLabel className="outlined-adornment-bloodType">{bloodTypeError}</InputLabel> : null}
                                  <InputLabel htmlFor="outlined-adornment-bloodType">Kan Grubu</InputLabel>
                                  <Select
                                    labelId="outlined-adornment-bloodType"
                                    id="outlined-adornment-bloodType"
                                    type="text"
                                    value={bloodType}
                                    label="Kan Grubu"
                                    onChange={ev => setBloodType(ev.target.value)}
                                  >
                                      <MenuItem value={"a+"}>A RH+ (Pozitif)</MenuItem>
                                      <MenuItem value={"b+"}>B RH+ (Pozitif)</MenuItem>
                                      <MenuItem value={"ab+"}>AB RH+ (Pozitif)</MenuItem>
                                      <MenuItem value={"0+"}>0 RH+ (Pozitif)</MenuItem>
                                      <MenuItem value={"a-"}>A RH- (Negatif)</MenuItem>
                                      <MenuItem value={"b-"}>A RH- (Negatif)</MenuItem>
                                      <MenuItem value={"ab-"}>A RH- (Negatif)</MenuItem>
                                      <MenuItem value={"0-"}>0 RH- (Negatif)</MenuItem>
                                  </Select>
                        </FormControl>

                  </div>

              </div>

          </div>
          <div className="divider">.</div>
          <div className="information-block">
              <h2 className="section-title">Eğitim/Güvenlik/vb. Bilgileri</h2>
              <div className="input-group">
                  <div className={"patienceFormContainer"}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                                  {educationError !== "" ? <InputLabel className="outlined-adornment-education">{educationError}</InputLabel> : null}
                                  <InputLabel htmlFor="outlined-adornment-education">Öğrenim Durumu</InputLabel>
                                  <OutlinedInput
                                    id="outlined-adornment-education"
                                    type="text"
                                    value={education}
                                    label="Öğrenim Durumu"
                                    onChange={ev => setEducation(ev.target.value)}
                                  />
                        </FormControl>
                  </div>
                  <div className={"patienceFormContainer"}>
                         <FormControl fullWidth sx={{ m: 1 }}>
                                  {workStatusError !== "" ? <InputLabel className="outlined-adornment-workStatus">{workStatusError}</InputLabel> : null}
                                  <InputLabel htmlFor="outlined-adornment-workStatus">Çalışma Durumu</InputLabel>
                                  <OutlinedInput
                                    id="outlined-adornment-workStatus"
                                    type="text"
                                    value={workStatus}
                                    label="Çalışma Durumu"
                                    onChange={ev => setWorkStatus(ev.target.value)}
                                  />
                        </FormControl>
                  </div>
                  <div className={"patienceFormContainer"}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                                  {insuranceError !== "" ? <InputLabel className="outlined-adornment-insurance">{insuranceError}</InputLabel> : null}
                                  <InputLabel htmlFor="outlined-adornment-insurance">Sosyal Güvence</InputLabel>
                                  <OutlinedInput
                                    id="outlined-adornment-insurance"
                                    type="text"
                                    value={insurance}
                                    label="Sosyal Güvence"
                                    onChange={ev => setInsurance(ev.target.value)}
                                  />
                        </FormControl>
                  </div>

                  <div className={"patienceFormContainer"}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                                  {patientRoomError !== "" ? <InputLabel className="outlined-adornment-patientRoom">{patientRoomError}</InputLabel> : null}
                                  <InputLabel htmlFor="outlined-adornment-patientRoom">Danışan Oda Numarası</InputLabel>
                                  <OutlinedInput
                                    id="outlined-adornment-patientRoom"
                                    type="text"
                                    value={patientRoom}
                                    label="Danışan Oda Numarası"
                                    onChange={ev => setPatientRoom(ev.target.value)}
                                  />
                        </FormControl>
                  </div>

                  <div className={"patienceFormContainer"}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                                  {incomeError !== "" ? <InputLabel className="outlined-adornment-income">{incomeError}</InputLabel> : null}
                                  <InputLabel htmlFor="outlined-adornment-income">Aylık Gelir</InputLabel>
                                  <OutlinedInput
                                    id="outlined-adornment-income"
                                    type="number"
                                    value={income}
                                    endAdornment={<InputAdornment position="end">₺</InputAdornment>}
                                    label="Aylık Gelir"
                                    onChange={ev => setIncome(ev.target.value)}
                                  />
                        </FormControl>
                  </div>
                  <div className={"patienceFormContainer"}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                                  {backgroundInfoError !== "" ? <InputLabel className="outlined-adornment-backgroundInfo">{backgroundInfoError}</InputLabel> : null}
                                  <InputLabel htmlFor="outlined-adornment-backgroundInfo">Adli Sicil Kaydı</InputLabel>
                                  <Select
                                    labelId="outlined-adornment-backgroundInfo"
                                    id="outlined-adornment-backgroundInfo"
                                    type="text"
                                    value={backgroundInfo}
                                    label="Adli Sicil Kaydı"
                                    onChange={ev => setBackgroundInfo(ev.target.value)}
                                  >
                                      <MenuItem value={"var"}>Var</MenuItem>
                                      <MenuItem value={"yok"}>Yok</MenuItem>
                                  </Select>
                        </FormControl>

                     {/*{backgroundInfoError !== "" ? <label className="errorLabel">{backgroundInfoError}</label> : null}*/}
                     {/* <label>Adli Sicil Kaydı</label>*/}
                     {/* <Select*/}
                     {/*     defaultValue={backgroundInfo}*/}
                     {/*     options={[*/}
                     {/*             { value: 'var', label: 'Var' },*/}
                     {/*             { value: 'yok', label: 'Yok' }*/}
                     {/*         ]}*/}
                     {/*     onChange={setBackgroundInfo}*/}
                     {/*     className={"patienceFormBox"}*/}
                     {/*     />*/}


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
                   <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {contactFirstnameError !== "" ? (
                          <InputLabel className="outlined-adornment-contactFirstname">{contactFirstnameError}</InputLabel>
                        ) : null}
                        <InputLabel htmlFor="outlined-adornment-contactFirstname">Adı</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-contactFirstname"
                          type="text"
                          value={contactFirstname}
                          label="Adı"
                          onChange={(e) => setContactFirstname(e.target.value)}
                        />
                      </FormControl>
                    </div>

                    <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {contactLastnameError !== "" ? (
                          <InputLabel className="outlined-adornment-contactLastname">{contactLastnameError}</InputLabel>
                        ) : null}
                        <InputLabel htmlFor="outlined-adornment-contactLastname">Soyadı</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-contactLastname"
                          type="text"
                          value={contactLastname}
                          label="Soyadı"
                          onChange={(e) => setContactLastname(e.target.value)}
                        />
                      </FormControl>
                    </div>

                    <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {contactCitizenIDError !== "" ? (
                          <InputLabel className="outlined-adornment-contactCitizenID">{contactCitizenIDError}</InputLabel>
                        ) : null}
                        <InputLabel htmlFor="outlined-adornment-contactCitizenID">TC Kimlik Numarası</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-contactCitizenID"
                          type="text"
                          value={contactCitizenID}
                          label="TC Kimlik Numarası"
                          onChange={(e) => setContactCitizenID(e.target.value)}
                        />
                      </FormControl>
                    </div>

                    <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {contactMotherNameError !== "" ? (
                          <InputLabel className="outlined-adornment-contactMotherName">{contactMotherNameError}</InputLabel>
                        ) : null}
                        <InputLabel htmlFor="outlined-adornment-contactMotherName">Anne Adı</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-contactMotherName"
                          type="text"
                          value={contactMotherName}
                          label="Anne Adı"
                          onChange={(e) => setContactMotherName(e.target.value)}
                        />
                      </FormControl>
                    </div>

                    <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {contactFatherNameError !== "" ? (
                          <InputLabel className="outlined-adornment-contactFatherName">{contactFatherNameError}</InputLabel>
                        ) : null}
                        <InputLabel htmlFor="outlined-adornment-contactFatherName">Baba Adı</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-contactFatherName"
                          type="text"
                          value={contactFatherName}
                          label="Baba Adı"
                          onChange={(e) => setContactFatherName(e.target.value)}
                        />
                      </FormControl>
                    </div>

                    <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {contactDateOfBirthError !== "" ? (
                          <InputLabel className="outlined-adornment-contactDateOfBirth">{contactDateOfBirthError}</InputLabel>
                        ) : null}
                        <InputLabel shrink htmlFor="outlined-adornment-contactDateOfBirth">
                          Doğum Tarihi
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-contactDateOfBirth"
                          type="date"
                          value={contactDateOfBirth}
                          label="Doğum Tarihi"
                          onChange={(e) => setContactDateOfBirth(e.target.value)}
                        />
                      </FormControl>
                    </div>

                    <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {contactBirthPlaceError !== "" ? (
                          <InputLabel className="outlined-adornment-contactBirthPlace">{contactBirthPlaceError}</InputLabel>
                        ) : null}
                        <InputLabel htmlFor="outlined-adornment-contactBirthPlace">Doğum Yeri</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-contactBirthPlace"
                          type="text"
                          value={contactBirthPlace}
                          label="Doğum Yeri"
                          onChange={(e) => setContactBirthPlace(e.target.value)}
                        />
                      </FormControl>
                    </div>

                    <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {contactPatientGenderError !== "" ? (
                          <InputLabel className="outlined-adornment-contactPatientGender">{contactPatientGenderError}</InputLabel>
                        ) : null}
                        <InputLabel htmlFor="outlined-adornment-contactPatientGender">Cinsiyet</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-contactPatientGender"
                          type="text"
                          value={contactPatientGender}
                          label="Cinsiyet"
                          onChange={(e) => setContactPatientGender(e.target.value)}
                        />
                      </FormControl>
                    </div>

                    <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {contactCurrentRelationshipError !== "" ? (
                          <InputLabel className="outlined-adornment-contactCurrentRelationship">{contactCurrentRelationshipError}</InputLabel>
                        ) : null}
                        <InputLabel htmlFor="outlined-adornment-contactCurrentRelationship">Medeni Durum</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-contactCurrentRelationship"
                          type="text"
                          value={contactCurrentRelationship}
                          label="Medeni Durum"
                          onChange={(e) => setContactCurrentRelationship(e.target.value)}
                        />
                      </FormControl>
                    </div>
                  </div>
                </div>

                <div className="divider">.</div>

                <div className="information-block">
                  <h2 className="section-title">İletişim Bilgileri</h2>
                  <div className="input-group">
                    <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {contactEducationError !== "" ? (
                          <InputLabel className="outlined-adornment-contactEducation">{contactEducationError}</InputLabel>
                        ) : null}
                        <InputLabel htmlFor="outlined-adornment-contactEducation">Öğrenim Durumu</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-contactEducation"
                          type="text"
                          value={contactEducation}
                          label="Öğrenim Durumu"
                          onChange={(e) => setContactEducation(e.target.value)}
                        />
                      </FormControl>
                    </div>

                    <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {contactRelationError !== "" ? (
                          <InputLabel className="outlined-adornment-contactRelation">{contactRelationError}</InputLabel>
                        ) : null}
                        <InputLabel htmlFor="outlined-adornment-contactRelation">Yakınlık Derecesi</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-contactRelation"
                          type="text"
                          value={contactRelation}
                          label="Yakınlık Derecesi"
                          onChange={(e) => setContactRelation(e.target.value)}
                        />
                      </FormControl>
                    </div>

                    <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {contactWorkStatusError !== "" ? (
                          <InputLabel className="outlined-adornment-contactWorkStatus">{contactWorkStatusError}</InputLabel>
                        ) : null}
                        <InputLabel htmlFor="outlined-adornment-contactWorkStatus">İşi</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-contactWorkStatus"
                          type="text"
                          value={contactWorkStatus}
                          label="İşi"
                          onChange={(e) => setContactWorkStatus(e.target.value)}
                        />
                      </FormControl>
                    </div>

                    <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {contactPhoneError !== "" ? (
                          <InputLabel className="outlined-adornment-contactPhone">{contactPhoneError}</InputLabel>
                        ) : null}
                        <InputLabel htmlFor="outlined-adornment-contactPhone">Telefon Numarası</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-contactPhone"
                          type="tel"
                          value={contactPhone}
                          label="Telefon Numarası"
                          onChange={(e) => setContactPhone(e.target.value)}
                        />
                      </FormControl>
                    </div>

                    <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {contactAddressError !== "" ? (
                          <InputLabel className="outlined-adornment-contactAddress">{contactAddressError}</InputLabel>
                        ) : null}
                        <InputLabel htmlFor="outlined-adornment-contactAddress">İkamet Adresi</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-contactAddress"
                          type="text"
                          value={contactAddress}
                          label="İkamet Adresi"
                          onChange={(e) => setContactAddress(e.target.value)}
                        />
                      </FormControl>
                    </div>

                    <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {contactWorkAddressError !== "" ? (
                          <InputLabel className="outlined-adornment-contactWorkAddress">{contactWorkAddressError}</InputLabel>
                        ) : null}
                        <InputLabel htmlFor="outlined-adornment-contactWorkAddress">İş Adresi</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-contactWorkAddress"
                          type="text"
                          value={contactWorkAddress}
                          label="İş Adresi"
                          onChange={(e) => setContactWorkAddress(e.target.value)}
                        />
                      </FormControl>
                    </div>

                    <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {contactEmailError !== "" ? (
                          <InputLabel className="outlined-adornment-contactEmail">{contactEmailError}</InputLabel>
                        ) : null}
                        <InputLabel htmlFor="outlined-adornment-contactEmail">E-Posta Adresi</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-contactEmail"
                          type="email"
                          value={contactEmail}
                          label="E-Posta Adresi"
                          onChange={(e) => setContactEmail(e.target.value)}
                        />
                      </FormControl>
                    </div>

                    <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {contactApplyError !== "" ? (
                          <InputLabel className="outlined-adornment-contactApply">{contactApplyError}</InputLabel>
                        ) : null}
                        <InputLabel shrink htmlFor="outlined-adornment-contactApply">Müracaat Tarihi</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-contactApply"
                          type="date"
                          value={contactApply}
                          label="Müracaat Tarihi"
                          onChange={(e) => setContactApply(e.target.value)}
                        />
                      </FormControl>
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
          <h1 className="page-title">Danışan Sağlık Durumu</h1>
          <h1 className="page-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent finibus ipsum ac nibh bibendum, quis sodales orci elementum. Fusce gravida vel quam eleifend ultrices. </h1>
          <div className="information-block">
              <h2 className="section-title">Hastalıklar & İlaçlar</h2>
              <div className="input-group-2">
                  <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {onGoingProblemsError !== "" ? (
                          <InputLabel className="outlined-adornment-onGoingProblems">{onGoingProblemsError}</InputLabel>
                        ) : null}

                        <Autocomplete
                          multiple
                          freeSolo
                          options={[]}
                          value={onGoingProblems}
                          onChange={(e, newValue) => {
                            const cleaned = Array.from(
                              new Set((newValue || []).map(v => (typeof v === 'string' ? v.trim() : '')).filter(Boolean))
                            ).slice(0, 30);
                            setOnGoingProblems(cleaned);
                          }}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Devam Eden Hastalıklar"
                              placeholder=" "
                              error={Boolean(onGoingProblemsError)}
                              helperText={onGoingProblemsError || " "}
                              onPaste={(e) => {
                                const parts = e.clipboardData.getData('text').split(/[,\n;]+/).map(s => s.trim()).filter(Boolean);
                                if (parts.length) {
                                  e.preventDefault();
                                  const next = Array.from(new Set([...(onGoingProblems || []), ...parts])).slice(0, 30);
                                  setOnGoingProblems(next);
                                }
                              }}
                            />
                          )}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') e.stopPropagation();
                          }}
                        />
                      </FormControl>
                    </div>

                    {/* Geçirmiş Olduğu Hastalıklar ve Operasyonlar */}
                    <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {oldProblemsError !== "" ? (
                          <InputLabel className="outlined-adornment-oldProblems">{oldProblemsError}</InputLabel>
                        ) : null}

                        <Autocomplete
                          multiple
                          freeSolo
                          options={[]}
                          value={oldProblems}
                          onChange={(e, newValue) => {
                            const cleaned = Array.from(
                              new Set((newValue || []).map(v => (typeof v === 'string' ? v.trim() : '')).filter(Boolean))
                            ).slice(0, 30);
                            setOldProblems(cleaned);
                          }}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Geçirmiş Olduğu Hastalıklar ve Operasyon Var Mı?"
                              placeholder=" "
                              error={Boolean(oldProblemsError)}
                              helperText={oldProblemsError || " "}
                              onPaste={(e) => {
                                const parts = e.clipboardData.getData('text').split(/[,\n;]+/).map(s => s.trim()).filter(Boolean);
                                if (parts.length) {
                                  e.preventDefault();
                                  const next = Array.from(new Set([...(oldProblems || []), ...parts])).slice(0, 30);
                                  setOldProblems(next);
                                }
                              }}
                            />
                          )}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') e.stopPropagation();
                          }}
                        />
                      </FormControl>
                    </div>

                    {/* Hastane/Doktor İletişim Bilgileri */}
                    <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {doctorContactsError !== "" ? (
                          <InputLabel className="outlined-adornment-doctorContacts">{doctorContactsError}</InputLabel>
                        ) : null}

                        <Autocomplete
                          multiple
                          freeSolo
                          options={[]}
                          value={doctorContacts}
                          onChange={(e, newValue) => {
                            const cleaned = Array.from(
                              new Set((newValue || []).map(v => (typeof v === 'string' ? v.trim() : '')).filter(Boolean))
                            ).slice(0, 30);
                            setDoctorContacts(cleaned);
                          }}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Hastayı Tanıyan/Takip Eden Hastane-Doktor Adı ve İletişim Bilgileri Var Mı?"
                              placeholder=" "
                              error={Boolean(doctorContactsError)}
                              helperText={doctorContactsError || " "}
                              onPaste={(e) => {
                                const parts = e.clipboardData.getData('text').split(/[,\n;]+/).map(s => s.trim()).filter(Boolean);
                                if (parts.length) {
                                  e.preventDefault();
                                  const next = Array.from(new Set([...(doctorContacts || []), ...parts])).slice(0, 30);
                                  setDoctorContacts(next);
                                }
                              }}
                            />
                          )}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') e.stopPropagation();
                          }}
                        />
                      </FormControl>
                    </div>

                    {/* Daha önce kesilen ilaçlar */}
                    <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {oldMedicinesError !== "" ? (
                          <InputLabel className="outlined-adornment-oldMedicines">{oldMedicinesError}</InputLabel>
                        ) : null}

                        <Autocomplete
                          multiple
                          freeSolo
                          options={[]}
                          value={oldMedicines}
                          onChange={(e, newValue) => {
                            const cleaned = Array.from(
                              new Set((newValue || []).map(v => (typeof v === 'string' ? v.trim() : '')).filter(Boolean))
                            ).slice(0, 30);
                            setOldMedicines(cleaned);
                          }}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Daha önce kullandığı fakat şu anda kesilen İlacı var mı?"
                              placeholder=" "
                              error={Boolean(oldMedicinesError)}
                              helperText={oldMedicinesError || " "}
                              onPaste={(e) => {
                                const parts = e.clipboardData.getData('text').split(/[,\n;]+/).map(s => s.trim()).filter(Boolean);
                                if (parts.length) {
                                  e.preventDefault();
                                  const next = Array.from(new Set([...(oldMedicines || []), ...parts])).slice(0, 30);
                                  setOldMedicines(next);
                                }
                              }}
                            />
                          )}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') e.stopPropagation();
                          }}
                        />
                      </FormControl>
                    </div>

                    {/* Kullanmakta Olduğu İlaçlar */}
                    <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {onGoingMedicinesError !== "" ? (
                          <InputLabel className="outlined-adornment-onGoingMedicines">{onGoingMedicinesError}</InputLabel>
                        ) : null}

                        <Autocomplete
                          multiple
                          freeSolo
                          options={[]}
                          value={onGoingMedicines}
                          onChange={(e, newValue) => {
                            const cleaned = Array.from(
                              new Set((newValue || []).map(v => (typeof v === 'string' ? v.trim() : '')).filter(Boolean))
                            ).slice(0, 30);
                            setOnGoingMedicines(cleaned);
                          }}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Kullanmakta Olduğu İlaçlar"
                              placeholder=" "
                              error={Boolean(onGoingMedicinesError)}
                              helperText={onGoingMedicinesError || " "}
                              onPaste={(e) => {
                                const parts = e.clipboardData.getData('text').split(/[,\n;]+/).map(s => s.trim()).filter(Boolean);
                                if (parts.length) {
                                  e.preventDefault();
                                  const next = Array.from(new Set([...(onGoingMedicines || []), ...parts])).slice(0, 30);
                                  setOnGoingMedicines(next);
                                }
                              }}
                            />
                          )}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') e.stopPropagation();
                          }}
                        />
                      </FormControl>
                    </div>

                    {/* System notes (multiline) */}
                    <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {system1Error !== "" ? (
                          <InputLabel className="outlined-adornment-system1">{system1Error}</InputLabel>
                        ) : null}
                        <TextField
                          label="Solunum Sistemi"
                          placeholder=" "
                          value={system1}
                          onChange={(e) => setSystem1(e.target.value)}
                          multiline
                          minRows={3}
                          error={Boolean(system1Error)}
                          helperText={system1Error || " "}
                        />
                      </FormControl>
                    </div>

                    <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {system2Error !== "" ? (
                          <InputLabel className="outlined-adornment-system2">{system2Error}</InputLabel>
                        ) : null}
                        <TextField
                          label="Kardiyovasküler Sistem"
                          placeholder=" "
                          value={system2}
                          onChange={(e) => setSystem2(e.target.value)}
                          multiline
                          minRows={3}
                          error={Boolean(system2Error)}
                          helperText={system2Error || " "}
                        />
                      </FormControl>
                    </div>

                    <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {system3Error !== "" ? (
                          <InputLabel className="outlined-adornment-system3">{system3Error}</InputLabel>
                        ) : null}
                        <TextField
                          label="Sindirim Sistemi"
                          placeholder=" "
                          value={system3}
                          onChange={(e) => setSystem3(e.target.value)}
                          multiline
                          minRows={3}
                          error={Boolean(system3Error)}
                          helperText={system3Error || " "}
                        />
                      </FormControl>
                    </div>

                    <div className="patienceFormContainer">
                      <FormControl fullWidth sx={{ m: 1 }}>
                        {system4Error !== "" ? (
                          <InputLabel className="outlined-adornment-system4">{system4Error}</InputLabel>
                        ) : null}
                        <TextField
                          label="Genitoüriner Sistem"
                          placeholder=" "
                          value={system4}
                          onChange={(e) => setSystem4(e.target.value)}
                          multiline
                          minRows={3}
                          error={Boolean(system4Error)}
                          helperText={system4Error || " "}
                        />
                      </FormControl>
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
          patientPage === 3 ? <div className="container-add-patient">
          <h1 className="page-title">Danışan Bakım Durumu</h1>
          <h1 className="page-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent finibus ipsum ac nibh bibendum, quis sodales orci elementum. Fusce gravida vel quam eleifend ultrices. </h1>
          <div className="information-block">
              <h2 className="section-title">Hastalıklar & İlaçlar</h2>
              <div className="input-group-2">
                  <Autocomplete
                      multiple
                      freeSolo
                      options={[]}
                      value={onGoingCare}
                      onChange={(e, newValue) => {
                        // enforce max 3 and remove empties/duplicates
                        const cleaned = Array.from(
                          new Set(
                            (newValue || [])
                              .map(v => (typeof v === 'string' ? v.trim() : ''))
                              .filter(Boolean)
                          )
                        ).slice(0, 30);
                        setOnGoingCare(cleaned);
                      }}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Devam Eden Bakım Durumu"
                          placeholder=" "
                          error={Boolean(onGoingCareError)}
                          helperText={onGoingCareError || " "}
                          onPaste={(e) => {
                            const text = e.clipboardData.getData('text');
                            const parts = text
                              .split(/[,\n;]+/)
                              .map(s => s.trim())
                              .filter(Boolean);
                            if (parts.length) {
                              e.preventDefault();
                              const next = Array.from(new Set([...onGoingCare, ...parts])).slice(0, 30);
                              setOnGoingCare(next);
                            }
                          }}
                        />
                      )}
                      // prevent Autocomplete from swallowing Enter on parent forms
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.stopPropagation();
                        }
                      }}
                    />
                  <div className={"patienceFormContainer"}>
                      <Autocomplete
                          multiple
                          freeSolo
                          options={[]}
                          value={oldCare}
                          onChange={(e, newValue) => {
                            const cleaned = Array.from(
                              new Set(
                                (newValue || [])
                                  .map(v => (typeof v === 'string' ? v.trim() : ''))
                                  .filter(Boolean)
                              )
                            ).slice(0, 30);
                            setOldCare(cleaned);
                          }}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Daha önce Uygulanan fakat şu anda kesilen Bakım var mı?"
                              placeholder=" "
                              error={Boolean(oldCareError)}
                              helperText={oldCareError || " "}
                              onPaste={(e) => {
                                const text = e.clipboardData.getData('text');
                                const parts = text.split(/[,\n;]+/).map(s => s.trim()).filter(Boolean);
                                if (parts.length) {
                                  e.preventDefault();
                                  const next = Array.from(new Set([...(oldCare || []), ...parts])).slice(0, 30);
                                  setOldCare(next);
                                }
                              }}
                            />
                          )}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') e.stopPropagation();
                          }}
                        />
                  </div>
                  <div className={"patienceFormContainer"}>
                      <Autocomplete
                          multiple
                          freeSolo
                          options={[]}
                          value={medicalState}
                          onChange={(e, newValue) => {
                            const cleaned = Array.from(
                              new Set(
                                (newValue || [])
                                  .map(v => (typeof v === 'string' ? v.trim() : ''))
                                  .filter(Boolean)
                              )
                            ).slice(0, 30);
                            setMedicalState(cleaned);
                          }}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Kullanmakta Olduğu Medikal Durumlar"
                              placeholder=" "
                              error={Boolean(medicalStateError)}
                              helperText={medicalStateError || " "}
                              onPaste={(e) => {
                                const text = e.clipboardData.getData('text');
                                const parts = text.split(/[,\n;]+/).map(s => s.trim()).filter(Boolean);
                                if (parts.length) {
                                  e.preventDefault();
                                  const next = Array.from(new Set([...(medicalState || []), ...parts])).slice(0, 30);
                                  setMedicalState(next);
                                }
                              }}
                            />
                          )}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') e.stopPropagation();
                          }}
                        />
                  </div>
                  <div className={"patienceFormContainer"}>
                      <TextField
                          label="Düşme Hikayesi"
                          placeholder=" "
                          value={fallingStory}
                          onChange={(e) => setFallingStory(e.target.value)}
                          multiline
                          minRows={3}
                          error={Boolean(fallingStoryError)}
                          helperText={fallingStoryError || "Düşme Hikayesini Anlatınız (Yoksa boş bırakınız)"}
                    />
                  </div>
                  <div className={"patienceFormContainer"}>
                      <TextField
                          label="Denge ve Yürüme Bozukluğu"
                          placeholder=" "
                          value={balanceState}
                          onChange={(e) => setBalanceState(e.target.value)}
                          multiline
                          minRows={3}
                          error={Boolean(balanceStateError)}
                          helperText={balanceStateError || "Denge ve Yürüme Bozukluklarını Anlatınız (Yoksa boş bırakınız)"}
                        />
                  </div>
              </div>

          </div>
          <div className="divider">.</div>
          <div className="information-block">
              <div className="patient-add-button-container">
                  <button style={{backgroundColor: "#E77169", float: "left"}} onClick={setPatientPageDecr}>Back</button>
                  <button style={{backgroundColor: "#A695CC", float: "right"}} onClick={onAddClick}>Save</button>
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
