import React, { useState, useEffect } from 'react';
import './medication_table.css';
import addDrugIcon from "../../../../assets/dashboard/icons-adddrug-blue.png";

const initialData = [
  {
    name: 'Amoklavin-BID',
    dosage: '1000 mg',
    category: 'Antibiyotik',
    time: 'Öğle İlaçları',
    days: ['Pzt', 'Sal', 'Çar'],
    prepared: false,
  },
  {
    name: 'Amoklavin-BID',
    dosage: '1000 mg',
    category: 'Antibiyotik',
    time: 'Akşam İlaçları',
    days: ['Per', 'Cum'],
    prepared: false,
  },
  {
    name: 'B İlacı',
    dosage: '200 mg',
    category: 'Şeker İlacı',
    time: 'Öğle İlaçları',
    days: ['Pzt', 'Sal', 'Paz'],
    prepared: false,
  },
    {
    name: 'Amoklavin-BID',
    dosage: '1000 mg',
    category: 'Antibiyotik',
    time: 'Öğle İlaçları',
    days: ['Pzt', 'Sal', 'Çar'],
    prepared: false,
  },
  {
    name: 'Amoklavin-BID',
    dosage: '1000 mg',
    category: 'Antibiyotik',
    time: 'Akşam İlaçları',
    days: ['Per', 'Cum'],
    prepared: false,
  },
  {
    name: 'B İlacı',
    dosage: '200 mg',
    category: 'Şeker İlacı',
    time: 'Öğle İlaçları',
    days: ['Pzt', 'Sal', 'Paz'],
    prepared: false,
  },
    {
    name: 'Amoklavin-BID',
    dosage: '1000 mg',
    category: 'Antibiyotik',
    time: 'Öğle İlaçları',
    days: ['Pzt', 'Sal', 'Çar'],
    prepared: false,
  },
  {
    name: 'Amoklavin-BID',
    dosage: '1000 mg',
    category: 'Antibiyotik',
    time: 'Akşam İlaçları',
    days: ['Per', 'Cum'],
    prepared: false,
  },
  {
    name: 'B İlacı',
    dosage: '200 mg',
    category: 'Şeker İlacı',
    time: 'Öğle İlaçları',
    days: ['Pzt', 'Sal', 'Paz'],
    prepared: false,
  },
    {
    name: 'Amoklavin-BID',
    dosage: '1000 mg',
    category: 'Antibiyotik',
    time: 'Öğle İlaçları',
    days: ['Pzt', 'Sal', 'Çar'],
    prepared: false,
  },
  {
    name: 'Amoklavin-BID',
    dosage: '1000 mg',
    category: 'Antibiyotik',
    time: 'Akşam İlaçları',
    days: ['Per', 'Cum'],
    prepared: false,
  },
  {
    name: 'B İlacı',
    dosage: '200 mg',
    category: 'Şeker İlacı',
    time: 'Öğle İlaçları',
    days: ['Pzt', 'Sal', 'Paz'],
    prepared: false,
  },{
    name: 'Amoklavin-BID',
    dosage: '1000 mg',
    category: 'Antibiyotik',
    time: 'Öğle İlaçları',
    days: ['Pzt', 'Sal', 'Çar'],
    prepared: false,
  },
  {
    name: 'Amoklavin-BID',
    dosage: '1000 mg',
    category: 'Antibiyotik',
    time: 'Akşam İlaçları',
    days: ['Per', 'Cum'],
    prepared: false,
  },
  {
    name: 'B İlacı',
    dosage: '200 mg',
    category: 'Şeker İlacı',
    time: 'Öğle İlaçları',
    days: ['Pzt', 'Sal', 'Paz'],
    prepared: false,
  },

];

const MedicationTable = ({setNewMedicineContainer, selectedPatient, setNewSystemMedicineContainer}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const [sortConfig, setSortConfig] = useState(null);

  const daysMap = {
    'Paz':"Pazar",
    'Pzt':"Pazartesi",
    'Sal':"Salı",
    'Çar':"Çarşamba",
    'Per':"Perşembe",
    'Cum':"Cuma",
    'Cts':"Cumartesi"
  }

  const handleAddMedicinePerson = (index) => {
    setNewMedicineContainer(true)
  };

  const handleAddMedicineSystem = (index) => {
    setNewSystemMedicineContainer(true)

  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    setData((prevData) => {
      return [...prevData].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    });
  };

  const getSystemMedicineList = (email) => {
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
        const meds = resp.data[0]["patient_medicines"];
        const daysShort = ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'];
        const periodMap = {
          "morning": "Sabah",
          "noon": "Öğlen",
          "evening": "Akşam"
        };

        const today     = daysShort[new Date().getDay()];

        const all = [];

        Object.entries(meds).forEach(([medId, record]) => {
          const buildEntry = (period) => ({
              id: medId,
              name: record.medicine_data.name,
              category: record.medicine_data.category,
              dosage: record.medicine_data.medicine_dosage[period],
              fullness: record.medicine_data.fullness_options[period],
              days: record.medicine_data.selected_days[period],
              prepared: record.medicine_data.prepared[period],
              period: periodMap[period]
          });

          if (record.medicine_data.selected_period.morning && record.medicine_data.selected_days.morning.includes(today)) all.push(buildEntry("morning"));
          if (record.medicine_data.selected_period.noon    && record.medicine_data.selected_days.noon.includes(today))    all.push(buildEntry("noon"));
          if (record.medicine_data.selected_period.evening && record.medicine_data.selected_days.evening.includes(today)) all.push(buildEntry("evening"));
        });

        setData(all)
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

  useEffect(() => {
      getSystemMedicineList(user.email)
    }, [selectedPatient]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="medication-table-container">
      <div className="medication-table">
      <h2>Haftalık İlaç Hazırlama</h2>
      <div className="divider" />
      <div>
        <div style={{"display": "flex"}}>
        <h3>Tüm İlaçlar</h3>
        <button className="blue-medic" onClick={handleAddMedicinePerson}> <img src={addDrugIcon} alt="addMedicine"/> <div style={{"alignContent": "center", "color": "#16CBE0", "font": "700 14px 'RedHatDisplay'"}}> Kişiye İlaç Ekle </div> </button>
        <button className="blue-medic" onClick={handleAddMedicineSystem}> <img src={addDrugIcon} alt="addMedicine"/> <div style={{"alignContent": "center", "color": "#16CBE0", "font": "700 14px 'RedHatDisplay'"}}> Sisteme İlaç Ekle </div> </button>
        </div>

      </div>
        <div className="scroll-table">
        <table>
          <thead>
          <tr>
              <th>
                <button onClick={() => requestSort('name')} className="sort-button">
                  İlaç Adı
                </button>
              </th>
              <th>
                <button onClick={() => requestSort('dosage')} className="sort-button">
                  Dozaj (miligram)
                </button>
              </th>
              <th>
                <button onClick={() => requestSort('category')} className="sort-button">
                  İlaç Kategorisi
                </button>
              </th>
              <th>
                <button onClick={() => requestSort('time')} className="sort-button">
                  İlaç Zamanı
                </button>
              </th>
              <th>Günler</th>
              <th style={{"borderRight": "None"}}>İşlemler</th>
            </tr>
          </thead>
            <tbody>
            {data.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry["name"]}</td>
                    <td>{entry["dosage"]}</td>
                    <td>{entry["category"]}</td>
                    <td>{entry["period"]}</td>
                    <td style={{"textAlign": "center"}}>
                      {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cts', 'Paz'].map((day) => (
                          <span key={day} className={entry.days.includes(daysMap[day]) ? 'active-day' : 'inactive-day'}>
                      {day}
                    </span>
                      ))}
                    </td>
                    <td style={{"borderRight": "None"}}>
                      {"prepared" in entry ? "İlaç Hazırlandı" : null}
                      {"prepared" in entry ? <input type="checkbox" checked={entry["prepared"]} readOnly/> : null}
                    </td>
                  </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>

  );
};
export default MedicationTable;