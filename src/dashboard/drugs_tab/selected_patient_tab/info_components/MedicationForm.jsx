import React, { useState, useEffect } from 'react';
import './medication_form.css';

const MedicationForm = ({setSelectedPatient, selectedPatient, newMedicineContainer, setNewMedicineContainer}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(true);

  const [systemMedicines, setSystemMedicines] = useState([])
  const [systemMedicineNames, setSystemMedicineNames] = useState([])
  const [systemMedicineCategories, setSystemMedicineCategories] = useState([])

  const [selectedMedicineName, setSelectedMedicineName] = useState("")
  const [selectedMedicineCategory, setSelectedMedicineCategory] = useState("")


  const handleMedicineCategory = (category) => {
    const names = systemMedicines.filter(m => m.medicine_data.medicine_category === category).map(m => m.medicine_data.medicine_name);

    setSystemMedicineNames(names);
    setSelectedMedicineCategory(category)
    console.log(systemMedicines)
    console.log(names)
  };



  const [selectedPeriod, setSelectedPeriod] = useState({
    morning: false,
    noon: false,
    evening: false,
  });

  const [selectedDays, setSelectedDays] = useState({
    morning: [],
    noon: [],
    evening: [],
  });

const [fullnessOptions, setFullnessOptions] = useState({
    morning: [],
    noon: [],
    evening: [],
  });

  const [medicineDosage, setMedicineDosage] = useState({
    morning: 0,
    noon: 0,
    evening: 0,
  });

  const toggleDay = (period, day) => {
    setSelectedDays((prev) => {
      const days = prev[period];
      return {
        ...prev,
        [period]: days.includes(day) ? days.filter(d => d !== day) : [...days, day],
      };
    });
  };

  const togglePeriod = (period) => {
    setSelectedPeriod((prev) => ({
      ...prev,
      [period]: !prev[period],
    }));
  };

  const daysOfWeek = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

  const handleFullnessChange = (period, value) => {
    setFullnessOptions((prev) => ({
      ...prev,
      [period]: value,
    }));
  };

  const handleDosageChange = (period, value) => {
    setMedicineDosage((prev) => ({
      ...prev,
      [period]: value,
    }));
  };

  const handleSubmit = () => {
    fetch("http://localhost:8000/api/patients/", {
    method: "PUT",
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(
        {'email': user.email,
                'type': 'add_scheduled_medicine',
                'patient_id': selectedPatient["patient_id"],
                'medicine_data': {
                    "name": selectedMedicineName,
                    "category": selectedMedicineCategory,
                    "selected_periods": selectedPeriod,
                    "selected_days": selectedDays,
                    "fullness_options": fullnessOptions,
                    "medicine_dosage": medicineDosage
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
  };

  const handleCancel = () => {
    updateSelectedPatient(user.email)
    setNewMedicineContainer(false)
  };

  const getSystemMedicineList = (email) => {
    fetch(`http://localhost:8000/api/medicines/?email=${email}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(resp => {
      // Assuming the backend sends back a JSON response indicating success or failure
      if (resp.status === "success") {
        const meds = resp.data;
        setSystemMedicines(resp.data)

        const names = meds.map(m => m.medicine_data.medicine_name);
        const categories = Array.from(
          new Set(meds.map(m => m.medicine_data.medicine_category))
        );

        setSystemMedicineNames(names);
        setSystemMedicineCategories(categories);
        setIsLoading(false);

      } else {
        setIsLoading(true);
      }
    }
    )
    .catch(error => {
        setIsLoading(true);
    });
  };

  const updateSelectedPatient = (email) => {
    fetch(`http://localhost:8000/api/patients/?email=${email}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(resp => {
      // Assuming the backend sends back a JSON response indicating success or failure
      if (resp.status === "success") {
        const selectedPatientNew = resp.data[0];
        if (selectedPatient !== selectedPatientNew){
          setSelectedPatient(selectedPatientNew);
        }
      }
    }
    )
    .catch(error => {
    });
  };

  useEffect(() => {
    getSystemMedicineList(user.email);
    }, [selectedPatient]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="medication-form">
      <h2>Kişiye İlaç Tanımla</h2>
      <div className="divider" />

      <div className="form-group">
        <div className="form-ingroup" style={{"paddingRight": "10px"}}>
          <label>İlaç Kategorisi</label>
          <select
              value={selectedMedicineCategory}
              onChange={(e) => handleMedicineCategory(e.target.value)}>
            <option value="" selected disabled hidden>Kategori Seçiniz</option>
            {systemMedicineCategories.map((each_category, index) => (
              <option key={index}>{each_category}</option>
            ))}
          </select>
        </div>
        <div className="form-ingroup" style={{"paddingLeft": "10px"}}>
          <label>İlaç</label>
          <select
            value={selectedMedicineName}
            onChange={(e) => setSelectedMedicineName(e.target.value)}
            >
            <option value="" selected disabled hidden>İlaç Seçiniz</option>
            {systemMedicineNames.map((each_name, index) => (
              <option key={index}>{each_name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="divider" style={{"marginBottom": "15px"}}/>
      <div style={{"overflowY": "auto", "maxHeight": "500px"}}>
        {['morning', 'noon', 'evening'].map((period, index) => {
        const periodNames = {
          morning: 'Sabah İçin Tanımla',
          noon: 'Öğle İçin Tanımla',
          evening: 'Akşam İçin Tanımla',
        };

        return (
          <div key={index} className="form-period">
            <button
              className={`period-toggle ${selectedPeriod[period] ? 'active' : ''}`}
              onClick={() => togglePeriod(period)}
            >
              {periodNames[period]}
            </button>
            {selectedPeriod[period] && (
              <div className="details">
                <div className="form-ingroup">
                  <div style={{"display": "flex"}}>
                    <div style={{"display": "grid"}} multiple={true}>
                      <label>Açlık/Tokluk</label>
                      <select style={{"marginRight": "20px"}}
                        value={fullnessOptions[period]}
                        onChange={(e) => handleFullnessChange(period, e.target.value)}>
                        <option>Aç İçilecek</option>
                        <option>Tok İçilecek</option>
                      </select>
                      <label style={{"marginTop": "5px"}}>İlaç Dozu</label>
                      <input value={medicineDosage[period]} onChange={(e) => handleDosageChange(period, e.target.value)}/>
                    </div>
                    <div style={{"marginLeft": "10px"}}>
                      <label>Günler</label>
                      <div className="days">
                    </div>
                  {daysOfWeek.map((day) => (
                    <span
                      key={day}
                      className={selectedDays[period].includes(day) ? 'active-day' : 'inactive-day'}
                      onClick={() => toggleDay(period, day)}
                    >
                      {day}
                    </span>
                  ))}
                </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        );
      })}
      </div>
      <div className="divider" style={{"marginTop": "20px"}}/>
      <div className="form-actions">
        <button className="cancel-button" onClick={handleCancel}>İptal Et</button>
        <button className="save-button" onClick={handleSubmit}>Kaydet</button>
      </div>
    </div>
  );
};

export default MedicationForm;