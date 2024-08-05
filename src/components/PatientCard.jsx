function PatientCard({ patient, setGeneralTab, setFunction }) {
  const patientClickHandle = () => {
    setGeneralTab(false)
    setFunction(patient)
    console.log(patient)
  }

  return (
    <div className="patient-card" onClick={patientClickHandle}>
      <div className="patient-info">
        <img src={`data:image/*;base64,${patient.patient_photo}`}  alt={patient.first_name} className="patient-avatar" />
        <div className="patient-details">
          <div className="patient-name">{patient.first_name} {patient.last_name}</div>
          <div className="patient-location">{patient.floor_no}</div>
        </div>
      </div>
    </div>
  );
}

export default PatientCard;