import React, { useState, useEffect } from 'react';
import './medication_table.css';
import addDrugIcon from "../../../../assets/dashboard/icons-adddrug-blue.png";
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CancelIcon from '@mui/icons-material/Cancel';

import CircularProgress from '@mui/material/CircularProgress';
import {
ThemeProvider,
createTheme,
Box,
Typography,
Button,
Checkbox,
} from '@mui/material';

const theme = createTheme({
    palette: {
      secondary: {
        main: 'rgb(166, 149, 204)'
      },
      primary: {
        main: 'rgb(166, 149, 204)'
      }
    }
});


const getNextDates = () => {
    const dates = [];
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const day = start.getDay();

    for (let i = 0; i <= 7; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        dates.push(d.toString());
    }
    return dates;
};

function isDateInCurrentWeek(date) {
  if (!date) return false;
  const now = new Date();
  // Start of current week (Sunday)
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  // End of current week (Saturday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const inputDate = new Date(date);
  return inputDate >= startOfWeek && inputDate <= endOfWeek;
}

function getTodayForDjango() {
  const today = new Date();
  return today.toString();
}

function reformatDjangoDate(djangoDateString) {
  const d = new Date(djangoDateString);

  // pull out zero-padded components
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yy = String(d.getFullYear() % 100).padStart(2, '0');

  return `${dd}-${mm}-${yy}`;
}

const MedicationTable = ({setNewMedicineContainer, selectedPatient, setSelectedPatient, setNewSystemMedicineContainer}) => {
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

  const today = getTodayForDjango();

  const [preparedMeds, setPreparedMeds] = useState(new Set());

  const [selectedPreparedMeds, setSelectedPreparedMeds] = useState(new Set());
  const [selectedPreparedMedsDelete, setSelectedPreparedMedsDelete] = useState(new Set());


  const handleAddMedicinePerson = (index) => {
    setNewMedicineContainer(true)
  };

  const handleAddMedicineSystem = (index) => {
    setNewSystemMedicineContainer(true)

  };

   const handlePrepareChange = medId => {
    setSelectedPreparedMeds(prev => {
      const next = new Set(prev);
      if (next.has(medId)) next.delete(medId);
      else next.add(medId);
      return next;
    });
  };

   const handlePrepareDeleteChange = medId => {
    setSelectedPreparedMedsDelete(prev => {
      const next = new Set(prev);
      if (next.has(medId)) next.delete(medId);
      else next.add(medId);
      return next;
    });
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


  const submitGivenMeds = () => {
    setIsLoading(true)
    let fail = false
    const payload = Array.from(selectedPreparedMeds).map(medicine_id =>
        ({
        patient_id: selectedPatient.patient_id,
        email: user.email,
        type: "add_prepared_medicine",
        medicine_id: medicine_id,
        prepared_dates: getNextDates(),
        })
    );

    for (let i = 0; i < payload.length; i++) {
        fetch("http://localhost:8000/api/patients/", {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({
              "patient_id": payload[i]["patient_id"],
              "email": payload[i]["email"],
              "type": payload[i]["type"],
              "medicine_id": payload[i]["medicine_id"],
              "prepared_dates": payload[i]["prepared_dates"]
          })
        })
        .then(r => r.json())
        .then(() => {
          // merge newly given into takenMeds and clear selection
          setPreparedMeds(prev => new Set([...prev, ...selectedPreparedMeds]));
          setSelectedPreparedMeds(new Set());
          window.alert("Hazırlanan İlaçların Bilgisi Başarıyla Kaydedildi!")
        })
        .catch(error => {
            console.error('Error:', error);
            fail = true
        });

    }
    if (fail) {
        window.alert("Hazırlanan İlaçların Bilgisi Kaydedilemedi!");
    }
    else {
        window.alert("Hazırlanan İlaçların Bilgisi Başarıyla Kaydedildi!")
        setIsLoading(false)
    }

  };


  const submitDeletedMeds = () => {
    setIsLoading(true)
    let fail = false
    const payload = {
        patient_id: selectedPatient.patient_id,
        email: user.email,
        type: "delete_medicines",
        medicine_ids: Array.from(selectedPreparedMedsDelete)
    };

    console.log(payload)

    fetch("http://localhost:8000/api/patients/", {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
          "patient_id": payload["patient_id"],
          "email": payload["email"],
          "type": payload["type"],
          "medicine_ids": payload["medicine_ids"]
      })
    })
    .then(r => r.json())
    .then(() => {
      setSelectedPreparedMedsDelete(new Set());
    })
    .catch(error => {
        console.error('Error:', error);
        fail = true
    });

    if (fail) {
        window.alert("İlaçların Bilgisi Kaldırılamadı!");
    }
    else {
        window.alert("İlaçların Bilgisi Başarıyla Kaldırıldı!")
        setIsLoading(false)
    }

  };

  const submitMeds = () => {
    submitGivenMeds()
    submitDeletedMeds()
  };

  const updateSelectedPatient = (email) => {
    setIsLoading(true)
    fetch(`http://localhost:8000/api/patients/?email=${email}&patient_id=${selectedPatient.patient_id}`, {
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
        const values = []

        for (var key in selectedPatientNew.patient_medicines) {
            var medicine = selectedPatientNew.patient_medicines[key];
            if (reformatDjangoDate(getTodayForDjango()) in medicine["medicine_data"]["prepared_dates"]) values.push(key)
        }
        setPreparedMeds(new Set(values))

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
              prepared: getTodayForDjango() in record.medicine_data.prepared_dates,
              period: periodMap[period]
          });


          if (record.medicine_data.selected_periods.morning && record.medicine_data.selected_days.morning.includes(today)) all.push(buildEntry("morning"));
          if (record.medicine_data.selected_periods.noon    && record.medicine_data.selected_days.noon.includes(today))    all.push(buildEntry("noon"));
          if (record.medicine_data.selected_periods.evening && record.medicine_data.selected_days.evening.includes(today)) all.push(buildEntry("evening"));

        });

        setData(all)
        setIsLoading(false)

      }
    }
    )
    .catch(error => {
        setIsLoading(true)
    });
  };

  useEffect(() => {
      updateSelectedPatient(user.email)
    }, [user.email]);

  if (isLoading) {
    return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
  }

  return (
<ThemeProvider theme={theme}>
<Box className="medication-table-container">
<Box className="medication-table">
<Typography className="Typography" variant="h5" >Haftalık İlaç Hazırlama</Typography>
<div className="divider" />

    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography className="Typography" variant="h6" sx={{ flexGrow: 1 }}>
          Tüm İlaçlar
        </Typography>

        <Button
          variant="outlined"
          color="info"
          onClick={handleAddMedicinePerson}
          startIcon={
            <Box component="img" src={addDrugIcon} alt="addMedicine" sx={{ width: 18, height: 18 }} />
          }
          className="blue-medic"
        >
          <Box sx={{ alignContent: "center", color: "#16CBE0", font: "700 14px 'RedHatDisplay'" }}>
            Kişiye İlaç Ekle
          </Box>
        </Button>

        <Button
          variant="outlined"
          color="info"
          onClick={handleAddMedicineSystem}
          startIcon={
            <Box component="img" src={addDrugIcon} alt="addMedicine" sx={{ width: 18, height: 18 }} />
          }
          className="blue-medic"
        >
          <Box sx={{ alignContent: "center", color: "#16CBE0", font: "700 14px 'RedHatDisplay'" }}>
            Sisteme İlaç Ekle
          </Box>
        </Button>
      </Box>
    </Box>

    <div className="scroll-table">
      <table>
        <thead>
          <tr>
            <th>
              <Button onClick={() => requestSort("name")} className="sort-button" variant="text">
                İlaç Adı
              </Button>
            </th>
            <th>
              <Button onClick={() => requestSort("dosage")} className="sort-button" variant="text">
                Dozaj (miligram)
              </Button>
            </th>
            <th>
              <Button onClick={() => requestSort("category")} className="sort-button" variant="text">
                İlaç Kategorisi
              </Button>
            </th>
            <th>
              <Button onClick={() => requestSort("time")} className="sort-button" variant="text">
                İlaç Zamanı
              </Button>
            </th>
            <th><
                Button className="sort-button" variant="text">
                Günler
              </Button>
            </th>
             <th><
                Button className="sort-button" variant="text">
                İşlemler
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => {
            const isPrepared = preparedMeds.has(entry.id);
            const isSelected = selectedPreparedMeds.has(entry.id);
            const isSelectedDelete = selectedPreparedMedsDelete.has(entry.id);
            return (
              <tr key={index}>
                <td>{entry["name"]}</td>
                <td>{entry["dosage"]}</td>
                <td>{entry["category"]}</td>
                <td>{entry["period"]}</td>
                <td style={{ textAlign: "center" }}>
                  {["Pzt", "Sal", "Çar", "Per", "Cum", "Cts", "Paz"].map((day) => (
                    <span
                      key={day}
                      className={entry.days.includes(daysMap[day]) ? "active-day" : "inactive-day"}
                    >
                      {day}
                    </span>
                  ))}
                </td>
                <td style={{ borderRight: "None" }}>
                    <Checkbox
                    disabled={isPrepared}
                    checked={isPrepared || isSelected}
                    onChange={() => handlePrepareChange(entry.id)}
                    color="success"
                    icon={<PlaylistAddRoundedIcon />}
                    checkedIcon={<PlaylistAddCheckCircleIcon />}
                    />
                    <Checkbox
                    checked={isSelectedDelete}
                    onChange={() => handlePrepareDeleteChange(entry.id)}
                    color="error"
                    icon={< CancelOutlinedIcon/>}
                    checkedIcon={<CancelIcon />}
                    />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    <div className="divider" />
    <Button className="Button" variant="contained" color="primary" onClick={submitMeds}>
      İmza
    </Button>
  </Box>
</Box>
</ThemeProvider> )
};
export default MedicationTable;