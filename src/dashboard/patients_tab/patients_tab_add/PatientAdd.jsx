import * as React from "react";
import './patients_tab_add.css'
import {useState} from "react";


function PatientAdd({ setGeneralTab, setAddTab }) {
  const [ firstname, setFirstname ] = useState("")
  const [ lastname, setLastname ] = useState("")
  const [ deviceID, setDeviceID ] = useState("")
  const [ citizenID, setCitizenID ] = useState("")
  const [ floorNo, setFloorNo ] = useState("")
  const [ careCategory, setCareCategory ] = useState("")
  const [ dateOfBirth, setDateOfBirth ] = useState("")
  const [ bloodType, setBloodType ] = useState("")
  const [ patientHeight, setPatientHeight ] = useState("")
  const [ patientWeight, setPatientWeight ] = useState("")
  const [ patientGender, setPatientGender ] = useState("")
  const [ contactFirstname, setContactFirstname ] = useState("")
  const [ contactLastname, setContactLastname ] = useState("")
  const [ contactPhoneNo, setContactPhoneNo ] = useState("")
  const [ image, setImage ] = useState("")


  const [ firstnameError, setFirstnameError ] = useState("")
  const [ lastnameError, setLastnameError ] = useState("")
  const [ deviceIDError, setDeviceIDError ] = useState("")
  const [ citizenIDError, setCitizenIDError ] = useState("")
  const [ floorNoError, setFloorNoError ] = useState("")
  const [ careCategoryError, setCareCategoryError ] = useState("")
  const [ dateOfBirthError, setDateOfBirthError ] = useState("")
  const [ bloodTypeError, setBloodTypeError ] = useState("")
  const [ patientHeightError, setPatientHeightError ] = useState("")
  const [ patientWeightError, setPatientWeightError ] = useState("")
  const [ patientGenderError, setPatientGenderError ] = useState("")

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
                'first_name': firstname,
                'last_name': lastname,
                'device_id': deviceID,
                'patient_id': citizenID,
                'floor_no': floorNo,
                'care_category': careCategory,
                'date_of_birth': dateOfBirth,
                'blood_type': bloodType,
                'height': patientHeight,
                'weight': patientWeight,
                'gender': patientGender,
                'contact_first_name': contactFirstname,
                'contact_last_name': contactFirstname,
                'contact_phone_no': contactPhoneNo,
                'patient_photo': base64Image.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
            })
        })
        .then(response => response.json())
        .then(data => {
        if ('success' === data['status']) {
            window.alert("Patient is successfully saved.")
            onBackClick()
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
    setDeviceIDError("")
    setCitizenIDError("")
    setBloodTypeError("")
    setCareCategoryError("")
    setPatientHeightError("")
    setPatientWeightError("")
    setCitizenIDError("")
    setFloorNoError("")
    setDateOfBirthError("")
    setPatientGenderError("")


    if ("" === firstname) {
        setFirstnameError("Please enter a name")
        error_occurred = true
    }

    if ("" === lastname) {
        setLastnameError("Please enter a lastname")
        error_occurred = true
    }

    if ("" === deviceID) {
        setDeviceIDError("Please enter a device ID")
        error_occurred = true
    }

    if ("" === citizenID) {
        setCitizenIDError("Please enter a citizen ID")
        error_occurred = true
    }

    if ("" === floorNo) {
        setFloorNoError("Please enter a citizen ID")
        error_occurred = true
    }

    if ("" === careCategory) {
        setCareCategoryError("Please enter a care category")
        error_occurred = true
    }

    if ("" === dateOfBirth) {
        setDateOfBirthError("Please enter a birthday")
        error_occurred = true
    }

    if ("" === bloodType) {
        setBloodTypeError("Please enter a blood type")
        error_occurred = true
    }

    if ("" === patientHeight) {
        setPatientHeightError("Please enter a height")
        error_occurred = true
    }

    if ("" === patientWeight) {
        setPatientWeightError("Please enter a weight")
        error_occurred = true
    }

    if ("" === patientGender) {
        setPatientWeightError("Please enter a gender")
        error_occurred = true
    }


    if (error_occurred){
        return
    }

    addPatient()

    }

  const onBackClick = () => {
      setAddTab(false)
      setGeneralTab(true)
  }


  return (
  <div className="container">
    <h1 className="page-title">Add Patient</h1>
    <div className="divider">.</div>
    <div className="patient-personal-information">
      <h2 className="section-title">Patient's Personal Information</h2>
      <div className="photograph-container">
        <label for="file-input" className="photograph-label">
          {!image ? <div><img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e5168a45362de20f7f0b317084f0918f3bb13f3a77ad5e08dfd70c170e760f86?apiKey=873db62e82664057a5c151e6201a84f6&"
                  alt={"addPhotographAlt"} className="photograph"/>
              <p>Add Photograph</p></div>
              : <img for="file-input" src={URL.createObjectURL(image)} alt="Uploaded"/>
          }
          </label>
        <input id="file-input" type="file" accept="image/*" onChange={(e) => handleImageChange(e)} style={{display: "None"}}/>
      </div>

      <div className="input-group">
        <div className={"formContainer"} style={{ width: '48%', float: 'left' }}>
            <input
                value={firstname}
                placeholder=" "
                onChange={ev => setFirstname(ev.target.value)}
                className={"formBox"} />
            {firstnameError !== "" ? <label className="errorLabel">{firstnameError}</label>: null}
            {firstnameError === "" ? <label>Name</label>: null}
        </div>
        <div className={"formContainer"} style={{ width: '48%', float: 'right' }}>
        <input
            value={lastname}
            placeholder=" "
            onChange={ev => setLastname(ev.target.value)}
            className={"formBox"} />
        {lastnameError !== "" ? <label className="errorLabel" >{lastnameError}</label>: null}
        {lastnameError === "" ? <label>Surname</label>: null}
    </div>
      </div>
      <div className="input-group">
        <div className={"formContainer"} style={{ width: '48%', float: 'left' }}>
            <input
                value={deviceID}
                placeholder=" "
                onChange={ev => setDeviceID(ev.target.value)}
                className={"formBox"} />
            {deviceIDError !== "" ? <label className="errorLabel">{deviceIDError}</label>: null}
            {deviceIDError === "" ? <label>Device ID</label>: null}
        </div>
        <div className={"formContainer"} style={{ width: '48%', float: 'right' }}>
        <input
            value={citizenID}
            placeholder=" "
            onChange={ev => setCitizenID(ev.target.value)}
            className={"formBox"} />
        {citizenIDError !== "" ? <label className="errorLabel" >{citizenIDError}</label>: null}
        {citizenIDError === "" ? <label>Citizen ID</label>: null}
      </div>
      </div>
      <div className="input-group">
        <div className={"formContainer"} style={{ width: '48%', float: 'left' }}>
            <input
                value={careCategory}
                placeholder=" "
                onChange={ev => setCareCategory(ev.target.value)}
                className={"formBox"} />
            {careCategoryError !== "" ? <label className="errorLabel">{careCategoryError}</label>: null}
            {careCategoryError === "" ? <label>Care Category</label>: null}
        </div>
        <div className={"formContainer"} style={{ width: '48%', float: 'right' }}>
        <input
            value={dateOfBirth}
            placeholder=" "
            onChange={ev => setDateOfBirth(ev.target.value)}
            className={"formBox"} />
        {dateOfBirthError !== "" ? <label className="errorLabel" >{dateOfBirthError}</label>: null}
        {dateOfBirthError === "" ? <label>Date of Birth</label>: null}
      </div>
      </div>
      <div className="input-group">
        <div className={"formContainer"} style={{ width: '48%', float: 'left' }}>
            <input
                value={floorNo}
                placeholder=" "
                onChange={ev => setFloorNo(ev.target.value)}
                className={"formBox"} />
            {floorNoError !== "" ? <label className="errorLabel" >{floorNoError}</label>: null}
            {floorNoError === "" ? <label>Floor</label>: null}
        </div>
        <div className={"formContainer"} style={{ width: '48%', float: 'right' }}>
        <input
            value={bloodType}
            placeholder=" "
            onChange={ev => setBloodType(ev.target.value)}
            className={"formBox"} />
        {bloodTypeError !== "" ? <label className="errorLabel" >{bloodTypeError}</label>: null}
        {bloodTypeError === "" ? <label>Blood Type</label>: null}
      </div>
      </div>
      <div className="input-group">
        <div className={"formContainer"} style={{ width: '48%', float: 'left' }}>
            <input
                value={patientHeight}
                placeholder=" "
                onChange={ev => setPatientHeight(ev.target.value)}
                className={"formBox"} />
            {patientHeightError !== "" ? <label className="errorLabel">{patientHeightError}</label>: null}
            {patientHeightError === "" ? <label>Height</label>: null}
        </div>
        <div className={"formContainer"} style={{ width: '48%', float: 'right' }}>
        <input
            value={patientWeight}
            placeholder=" "
            onChange={ev => setPatientWeight(ev.target.value)}
            className={"formBox"} />
        {patientWeightError !== "" ? <label className="errorLabel" >{patientWeightError}</label>: null}
        {patientWeightError === "" ? <label>Weight</label>: null}
      </div>
        <div className={"formContainer"} style={{ width: '48%', display: 'inline-grid' }}>
        <input
            value={patientGender}
            placeholder=" "
            onChange={ev => setPatientGender(ev.target.value)}
            className={"formBox"} />
        {patientGenderError !== "" ? <label className="errorLabel" >{patientGenderError}</label>: null}
        {patientGenderError === "" ? <label>Gender</label>: null}
        </div>
      </div>
    </div>
    <div className="divider">.</div>
    <div className="patient-contact-information">
      <h2 className="section-title">Patient's Contact Information</h2>
      <div className="input-group">
        <div className={"formContainer"} style={{ width: '48%', float: 'left' }}>
            <input
                value={contactFirstname}
                placeholder=" "
                onChange={ev => setContactFirstname(ev.target.value)}
                className={"formBox"} />
            <label>Name</label>
        </div>
        <div className={"formContainer"} style={{ width: '48%', float: 'right' }}>
        <input
            value={contactLastname}
            placeholder=" "
            onChange={ev => setContactLastname(ev.target.value)}
            className={"formBox"} />
        <label>Surname</label>
    </div>
        <div className={"formContainer"} style={{ width: '48%', display: 'inline-grid'}}>
            <input
                value={contactPhoneNo}
                placeholder=" "
                onChange={ev => setContactPhoneNo(ev.target.value)}
                className={"formBox"} />
            <label>Phone Number</label>
        </div>
      </div>
    </div>
    <div className="divider">.</div>
    <div className="patient-add-button-container">
      <button style={{backgroundColor: "#E77169", float: "left"}} onClick={onBackClick}>Back</button>
      <button style={{backgroundColor: "#A695CC", float: "right"}} onClick={onAddClick}>Add</button>
    </div>
  </div>
  );
}

export default PatientAdd;
