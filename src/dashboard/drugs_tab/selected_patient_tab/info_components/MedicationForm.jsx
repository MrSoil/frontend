import React, { useState, useEffect } from 'react';
import './medication_form.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { API_BASE_URL } from "../../../../config";

const MedicationForm = ({setSelectedPatient, selectedPatient, newMedicineContainer, setNewMedicineContainer, editingMedicine, setEditingMedicine}) => {
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

  const [endDate, setEndDate] = useState("");

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
    const medicineData = {
      "name": selectedMedicineName,
      "category": selectedMedicineCategory,
      "selected_periods": selectedPeriod,
      "selected_days": selectedDays,
      "fullness_options": fullnessOptions,
      "medicine_dosage": medicineDosage
    };

    // Add end_date if provided
    if (endDate) {
      medicineData.end_date = endDate;
    }

    const requestType = editingMedicine ? 'update_scheduled_medicine' : 'add_scheduled_medicine';
    const requestBody = {
      'email': user.email,
      'type': requestType,
      'patient_id': selectedPatient["patient_id"],
      'medicine_data': medicineData
    };

    // Add medicine_id if editing
    if (editingMedicine) {
      requestBody.medicine_id = editingMedicine.medicine_id;
    }

    fetch(`${API_BASE_URL}/patients/`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
      if ('success' === data['status']) {
        window.alert(editingMedicine ? "İlaç Başarıyla Güncellendi!" : "İlaç Sisteme Başarıyla Eklendi!")
        // Update patient data first, then close the form
        updateSelectedPatient(user.email).then(() => {
          handleCancel()
        })
      } else {
        window.alert(editingMedicine ? "İlaç Güncellenemedi!" : "İlaç Sisteme Eklenemedi!")
      }
    })
    .catch(error => {
      console.error('Error:', error);
      window.alert(editingMedicine ? "İlaç Güncellenemedi!" : "İlaç Sisteme Eklenemedi!");
    });
  };

  const handleCancel = () => {
    if (setEditingMedicine) {
      setEditingMedicine(null);
    }
    setNewMedicineContainer(false)
  };

  const getSystemMedicineList = (email) => {
    fetch(`${API_BASE_URL}/medicines/?email=${email}`, {
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
    return fetch(`${API_BASE_URL}/patients/?email=${email}&patient_id=${selectedPatient.patient_id}`, {
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
        setSelectedPatient(selectedPatientNew);
        return selectedPatientNew;
      }
    }
    )
    .catch(error => {
      console.error('Error updating patient:', error);
    });
  };

  useEffect(() => {
    getSystemMedicineList(user.email);
    }, [selectedPatient]);

  // Pre-fill form when editing
  useEffect(() => {
    if (editingMedicine && editingMedicine.medicine_data) {
      const medData = editingMedicine.medicine_data;
      setSelectedMedicineCategory(medData.category || "");
      setSelectedMedicineName(medData.name || "");
      
      // Set periods
      if (medData.selected_periods) {
        setSelectedPeriod({
          morning: medData.selected_periods.morning || false,
          noon: medData.selected_periods.noon || false,
          evening: medData.selected_periods.evening || false,
        });
      }
      
      // Set days, dosage, and fullness for each period
      if (medData.selected_days) {
        setSelectedDays({
          morning: medData.selected_days.morning || [],
          noon: medData.selected_days.noon || [],
          evening: medData.selected_days.evening || [],
        });
      }
      
      if (medData.medicine_dosage) {
        setMedicineDosage({
          morning: medData.medicine_dosage.morning || 0,
          noon: medData.medicine_dosage.noon || 0,
          evening: medData.medicine_dosage.evening || 0,
        });
      }
      
      if (medData.fullness_options) {
        setFullnessOptions({
          morning: medData.fullness_options.morning || "",
          noon: medData.fullness_options.noon || "",
          evening: medData.fullness_options.evening || "",
        });
      }
      
      // Set end date if exists
      if (medData.end_date) {
        setEndDate(medData.end_date);
      }
      
      // Update medicine names when category is set (only if systemMedicines is loaded)
      if (medData.category && systemMedicines.length > 0) {
        handleMedicineCategory(medData.category);
      }
    } else {
      // Reset form when not editing
      setSelectedMedicineCategory("");
      setSelectedMedicineName("");
      setSelectedPeriod({ morning: false, noon: false, evening: false });
      setSelectedDays({ morning: [], noon: [], evening: [] });
      setMedicineDosage({ morning: 0, noon: 0, evening: 0 });
      setFullnessOptions({ morning: "", noon: "", evening: "" });
      setEndDate("");
    }
  }, [editingMedicine, systemMedicines]);

  if (isLoading) {
   return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
  }

  return (
    <div className="medication-form">
      <h2>{editingMedicine ? "İlaç Düzenle" : "Kişiye İlaç Tanımla"}</h2>
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
      <div className="divider" style={{"marginBottom": "15px"}}/>
      <div className="form-group">
        <div className="form-ingroup" style={{"paddingRight": "10px"}}>
          <label>Bitiş Tarihi (Opsiyonel)</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{width: "100%", padding: "8px"}}
          />
        </div>
      </div>
      <div className="divider" style={{"marginTop": "20px"}}/>
      <div className="form-actions">
        <button className="cancel-button" onClick={handleCancel}>İptal Et</button>
        <button className="save-button" onClick={handleSubmit}>{editingMedicine ? "Güncelle" : "Kaydet"}</button>
      </div>
    </div>
  );
};

export default MedicationForm;