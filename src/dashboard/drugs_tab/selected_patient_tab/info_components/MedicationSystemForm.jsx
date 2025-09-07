import React, { useState } from 'react';
import './medication_system_form.css';
import addDrugIcon from "../../../../assets/dashboard/icons-adddrug-blue.png";

const MedicationSystemForm = ({setNewSystemMedicineContainer}) => {
  const [medications, setMedications] = useState([{ category: '', name: '' }]);
  const user = JSON.parse(localStorage.getItem("user"));
  const addMedication = () => {
    setMedications([...medications, { category: '', name: '' }]);
  };

  const removeMedication = () => {
    if (medications.length > 1) {
      setMedications(medications.slice(0, -1));
    }
  };

  const handleChange = (index, field, value) => {
    const newMedications = [...medications];
    newMedications[index][field] = value;
    setMedications(newMedications);
  };

  const handleCancel = () => {
    setNewSystemMedicineContainer(false)
  };

  const handleSubmit = () => {
    medications.forEach(function (medication, index) {
        fetch("http://localhost:8000/api/medicines/", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(
        {'email': user.email,
                'type': 'new',
                'medicine_data': {
                    "medicine_category": medication.category,
                    "medicine_name": medication.name
            }
        })
    })
    .then(response => response.json())
    .then(data => {
    if ('success' === data['status']) {
        window.alert("İlaç Sisteme Başarıyla Eklendi!")
        handleCancel()
    } else {
        window.alert("İlaç Sisteme Eklenemedi!")
    }
    })
    .catch(error => {
    console.error('Error:', error);
    window.alert("İlaç Sisteme Eklenemedi!");
    });
    })

  };

  return (
    <div className="medication-system-form">
      <h2>Sisteme İlaç Ekle</h2>
      <div className="divider" />

      <div className="form-container">
        {medications.map((medication, index) => (
          <div key={index} className="form-group">
            <div className="form-ingroup" style={{"paddingRight": "10px"}}>
                <label>İlaç Kategorisi</label>
                <input
                  type="text"
                  value={medication.category}
                  onChange={(e) => handleChange(index, 'category', e.target.value)}
                />
            </div>
            <div className="form-ingroup" style={{"paddingRight": "10px"}}>
                <label>İlaç Adı</label>
                <input
                  type="text"
                  value={medication.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                />
            </div>

          </div>
        ))}
      </div>

      <div className="button-group">
           <button className="blue-medic" onClick={addMedication}> <img src={addDrugIcon} alt="addMedicine"/> <div style={{"alignContent": "center", "color": "#16CBE0", "font": "700 14px 'RedHatDisplay'"}}> Yeni İlaç Ekle </div> </button>
           <button className="blue-medic" onClick={removeMedication}>- İlaç Kaldır</button>
      </div>
      <div className="divider" />

      <div className="form-actions">
        <button className="cancel-button" onClick={handleCancel}>İptal Et</button>
        <button className="save-button" onClick={handleSubmit}>Kaydet</button>
      </div>
    </div>
  );
};

export default MedicationSystemForm;