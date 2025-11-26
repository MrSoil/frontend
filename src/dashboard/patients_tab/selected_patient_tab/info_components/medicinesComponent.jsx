import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Stack
} from '@mui/material';
import * as XLSX from 'xlsx';
import './medicines_component.css'
import { API_BASE_URL } from "../../../../config";

function getTodayForDjango() {
  const today = new Date();
  return today.toString();
}

function formatDateDDMMYYYY(dateString) {
  const d = new Date(dateString);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

function getTurkishMonthName(monthIndex) {
  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  return months[monthIndex];
}

function getWeeksInMonth(year, month) {
  const weeks = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  let currentWeekStart = new Date(firstDay);
  // Find the first Sunday of the month or the first day if it's Sunday
  const firstDayOfWeek = firstDay.getDay();
  if (firstDayOfWeek !== 0) {
    currentWeekStart.setDate(firstDay.getDate() - firstDayOfWeek);
  }
  
  while (currentWeekStart <= lastDay) {
    const weekEnd = new Date(currentWeekStart);
    weekEnd.setDate(currentWeekStart.getDate() + 6);
    
    const startDate = currentWeekStart < firstDay ? firstDay : currentWeekStart;
    const endDate = weekEnd > lastDay ? lastDay : weekEnd;
    
    if (startDate <= lastDay) {
      weeks.push({
        start: new Date(startDate),
        end: new Date(endDate),
        label: `${formatDateDDMMYYYY(startDate.toString())} - ${formatDateDDMMYYYY(endDate.toString())}`
      });
    }
    
    currentWeekStart.setDate(currentWeekStart.getDate() + 7);
  }
  
  return weeks;
}

function getDaysInWeekRange(startDate, endDate) {
  const daysOfWeek = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const days = [];
  const current = new Date(startDate);
  
  while (current <= endDate) {
    days.push({
      string_date: daysOfWeek[current.getDay()] + ' Listesi',
      date: current.toString(),
      formattedDate: formatDateDDMMYYYY(current.toString())
    });
    current.setDate(current.getDate() + 1);
  }
  
  return days;
}

function reformatDjangoDate(djangoDateString) {
  const d = new Date(djangoDateString);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yy = String(d.getFullYear() % 100).padStart(2, '0');
  return `${dd}-${mm}-${yy}`;
}

function MedicineList({ selectedPatient, setNewMedicineContainer, medicinesDate, setMedicinesDate }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    
    const currentDate = new Date();
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
    
    const weeks = useMemo(() => getWeeksInMonth(selectedYear, selectedMonth), [selectedYear, selectedMonth]);
    
    // Find current week index
    const currentWeekIndex = useMemo(() => {
      const today = new Date();
      return weeks.findIndex(week => {
        return today >= week.start && today <= week.end;
      });
    }, [weeks]);
    
    const [selectedWeekIndex, setSelectedWeekIndex] = useState(currentWeekIndex >= 0 ? currentWeekIndex : 0);
    
    const selectedWeek = weeks[selectedWeekIndex] || weeks[0];
    const daysInWeek = useMemo(() => {
      if (selectedWeek) {
        return getDaysInWeekRange(selectedWeek.start, selectedWeek.end);
      }
      return [];
    }, [selectedWeek]);

    const handleExportExcel = async () => {
      if (!selectedPatient || !selectedPatient.patient_id) {
        window.alert("Hasta seçilmedi.");
        return;
      }

      try {
        // Fetch latest patient data
        const response = await fetch(`${API_BASE_URL}/patients/?email=${user.email}&patient_id=${selectedPatient.patient_id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const resp = await response.json();
        
        if (resp.status !== "success" || !resp.data || resp.data.length === 0) {
          window.alert("Hasta verisi alınamadı.");
          return;
        }

        const patientData = resp.data[0];
        const meds = patientData.patient_medicines || {};
        
        if (Object.keys(meds).length === 0) {
          window.alert("Dışa aktarılacak ilaç bulunmuyor.");
          return;
        }

        const daysOfWeek = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
        const periodMap = {
          "morning": "Sabah",
          "noon": "Öğlen",
          "evening": "Akşam"
        };

        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Process each day in the week
        daysInWeek.forEach((dayInfo) => {
          const dayDate = new Date(dayInfo.date);
          const dayName = daysOfWeek[dayDate.getDay()];
          const dateKey = reformatDjangoDate(dayInfo.date);
          
          // Collect medicines for this day
          const dayMedicines = [];
          
          Object.entries(meds).forEach(([medId, record]) => {
            const medicineData = record.medicine_data;
            
            // Check each period (morning, noon, evening)
            ['morning', 'noon', 'evening'].forEach((period) => {
              if (medicineData.selected_periods && medicineData.selected_periods[period] && 
                  medicineData.selected_days && medicineData.selected_days[period] && 
                  medicineData.selected_days[period].includes(dayName)) {
                
                // Handle both old format (boolean) and new format (object with timestamp)
                const givenDateValue = medicineData.given_dates && 
                                      medicineData.given_dates[period] && 
                                      medicineData.given_dates[period][dateKey];
                const given = givenDateValue ? 
                    (typeof givenDateValue === 'object' ? (givenDateValue.given ? "Evet" : "Hayır") : "Evet") : 
                    "Hayır";
                
                dayMedicines.push({
                  "İlaç Adı": medicineData.name || "",
                  "Kategori": medicineData.category || "",
                  "Dozaj": medicineData.medicine_dosage && medicineData.medicine_dosage[period] ? medicineData.medicine_dosage[period] : "",
                  "Zaman": periodMap[period] || period,
                  "Doluluk": medicineData.fullness_options && medicineData.fullness_options[period] ? medicineData.fullness_options[period] : "",
                  "Verildi mi?": given
                });
              }
            });
          });

          // Create worksheet data
          const worksheetData = [
            ["İlaç Adı", "Kategori", "Dozaj", "Zaman", "Doluluk", "Verildi mi?"],
            ...dayMedicines.map(med => [
              med["İlaç Adı"],
              med["Kategori"],
              med["Dozaj"],
              med["Zaman"],
              med["Doluluk"],
              med["Verildi mi?"]
            ])
          ];

          // Create worksheet
          const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
          
          // Set column widths
          worksheet['!cols'] = [
            { wch: 25 }, // İlaç Adı
            { wch: 20 }, // Kategori
            { wch: 15 }, // Dozaj
            { wch: 12 }, // Zaman
            { wch: 15 }, // Doluluk
            { wch: 12 }  // Verildi mi?
          ];

          // Add worksheet to workbook with day name as sheet name
          const sheetName = dayName.substring(0, 10); // Excel sheet names are limited to 31 chars
          XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        });

        // Generate Excel file
        const fileName = `hasta_${selectedPatient.patient_id}_ilac_listesi_${formatDateDDMMYYYY(selectedWeek.start.toString())}_${formatDateDDMMYYYY(selectedWeek.end.toString())}.xlsx`;
        XLSX.writeFile(workbook, fileName);

        window.alert("Excel dosyası başarıyla oluşturuldu.");
      } catch (error) {
        console.error("Excel export error:", error);
        window.alert("Excel dosyası oluşturulurken bir hata oluştu.");
      }
    };

  const handleNewMedicine = (new_date = getTodayForDjango()) => {
      setMedicinesDate(new_date)
      setNewMedicineContainer(true)
  }

  const handleEditMedicine = () => {
    navigate("/dashboard/drugs/patient/" + selectedPatient.patient_id)
  }

  const handleEditDay = (date) => {
    setMedicinesDate(date)
    setNewMedicineContainer(true)
  }

  const handleMonthChange = (event) => {
    const newMonth = event.target.value;
    setSelectedMonth(newMonth);
    // Reset week to first week of new month
    setSelectedWeekIndex(0);
  };

  const handleWeekChange = (event) => {
    setSelectedWeekIndex(event.target.value);
  };

  // Generate month options for current year and previous year
  const monthOptions = [];
  for (let year = currentDate.getFullYear() - 1; year <= currentDate.getFullYear(); year++) {
    for (let month = 0; month < 12; month++) {
      monthOptions.push({
        value: month,
        year: year,
        label: `${getTurkishMonthName(month)} ${year}`
      });
    }
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '24px' }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, fontFamily: 'RedHatDisplay' }}>
          Sağlık Raporları
        </Typography>
        
        <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel style={{'zIndex': 0}}>Ay</InputLabel>
            <Select
              value={selectedMonth}
              label="Ay"
              onChange={handleMonthChange}
            >
              {monthOptions
                .filter(opt => opt.year === selectedYear)
                .map((option) => (
                  <MenuItem key={`${option.year}-${option.value}`} value={option.value}>
                    {getTurkishMonthName(option.value)}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel style={{'zIndex': 0}}>Hafta</InputLabel>
            <Select
              value={selectedWeekIndex}
              label="Hafta"
              onChange={handleWeekChange}
            >
              {weeks.map((week, index) => (
                <MenuItem key={index} value={index}>
                  {week.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Divider sx={{ mb: 1 }} />

        <Box sx={{ flexGrow: 1, overflow: 'auto', height: '170px' }}>
          <List sx={{ p: 0 }}>
            {daysInWeek.map((day, index) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#F6F0F6' : '#FFFFFF',
                    py: 0,
                    px: 2
                  }}
                  secondaryAction={
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleEditDay(day.date)}
                      sx={{
                        borderColor: '#A695CC',
                        color: '#A695CC',
                        textTransform: 'none',
                        fontFamily: 'RedHatDisplay',
                        fontWeight: 500,
                        '&:hover': {
                          borderColor: '#8B7BA8',
                          backgroundColor: 'rgba(166, 149, 204, 0.1)'
                        }
                      }}
                    >
                      İNCELE
                    </Button>
                  }
                >
                  <ListItemText
                    primary={day.string_date}
                    secondary={day.formattedDate}
                    primaryTypographyProps={{
                      fontFamily: 'RedHatDisplay',
                      fontWeight: 600,
                      fontSize: '16px',
                      color: '#343738'
                    }}
                    secondaryTypographyProps={{
                      fontFamily: 'RedHatDisplay',
                      fontSize: '15px',
                      color: '#717070'
                    }}
                  />
                </ListItem>
                {index < daysInWeek.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 0 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, pt: 1 }}>
          <Button
            variant="outlined"
            onClick={() => handleEditMedicine()}
            sx={{
              borderColor: '#1976D2',
              color: '#1976D2',
              backgroundColor: '#FFFFFF',
              textTransform: 'none',
              fontFamily: 'RedHatDisplay',
              fontWeight: 500,
              borderRadius: '24px',
              px: 3,
              py: 1,
              '&:hover': {
                borderColor: '#1565C0',
                backgroundColor: '#F5F5F5'
              }
            }}
          >
            İlaçları Yönet
          </Button>
          <Button
            variant="outlined"
            onClick={handleExportExcel}
            sx={{
              borderColor: '#4CAF50',
              color: '#4CAF50',
              backgroundColor: '#FFFFFF',
              textTransform: 'none',
              fontFamily: 'RedHatDisplay',
              fontWeight: 500,
              borderRadius: '24px',
              px: 3,
              py: 1,
              '&:hover': {
                borderColor: '#45a049',
                backgroundColor: '#F5F5F5'
              }
            }}
          >
            Excel
          </Button>
          <Button
            variant="contained"
            onClick={() => handleNewMedicine()}
            sx={{
              backgroundColor: '#1976D2',
              color: '#FFFFFF',
              textTransform: 'none',
              fontFamily: 'RedHatDisplay',
              fontWeight: 500,
              borderRadius: '24px',
              px: 3,
              py: 1,
              '&:hover': {
                backgroundColor: '#1565C0'
              }
            }}
          >
            Günlük Uygulamalar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MedicineList;
