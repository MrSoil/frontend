import * as React from "react";
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
import './hc_component.css';
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

function HCList({ selectedPatient, setNewHCContainer, hcDate, setHcDate }) {
  const user = JSON.parse(localStorage.getItem("user"));
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
      const hcData = patientData.patient_signed_hc || {};
      
      if (Object.keys(hcData).length === 0) {
        window.alert("Dışa aktarılacak bakım kaydı bulunmuyor.");
        return;
      }

      const daysOfWeek = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
      
      // Care category mappings
      const hygieneCheckDailyMap = {
        mouthCare: "Ağız Bakımı",
        handFaceCare: "El-Yüz Bakımı",
        earNoseCare: "Kulak-Burun Bakımı",
        bottomCare: "Alt Bakımı",
        bodyCare: "Vücut Bakımı",
        rashCare: "Döküntü Bakımı",
        moistureCare: "Nemlendirme Bakımı"
      };

      const hygieneCheckWeeklyMap = {
        bathCare: "Banyo",
        handFootCare: "El-Ayak Bakımı",
        bodyHairCare: "Vücut Kılı Bakımı",
        hairCare: "Saç Bakımı",
        bedBathCare: "Yatak Banyosu/Vücut Silme/Yatakta Saç Yıkama",
        bedSheetCare: "Yatak Takımlarının Değiştirilmesi"
      };

      const mealCheckMap = {
        breakfastCare: "Kahvaltı",
        lunchCare: "Öğle Yemeği",
        midCare: "Ara Öğün",
        dinnerCare: "Akşam Yemeği",
        liquidCare: "Su ve Diğer Sıvı Alımı"
      };

      const postureCheckMap = {
        walkable: "Mobil/Yürüyen Misafir"
      };

      const dressingCheckMap = {
        isInjured: "Bası Yarası var mı?",
        stage: "Kaçıncı Evre?",
        dailyDressing: "Günlük Bası Yarası Pansumanı Yapıldı mı?",
        needDressing: "Pansuman gerektiren bir durum var mı?",
        isDressed: "Pansuman Yapıldı mı?",
        catheter: "Katater Bakımı Yapıldı mı?"
      };

      const edemaCheckMap = {
        liquidCheck: "Sıvı takibi yapıldı mı?",
        liquidCheckML: "İdrar Çıkışı (ml)"
      };

      const securityCheckMap = {
        reason1: "Yerde takılacağı kablo vs. herhangi bir şey var mı? Giymiş olduğu terlik ve oda zemini güvenli mi?",
        reason2: "Hemşire çağrı zilinin kullanıldı mı?",
        reason3: "Gözlük kullanıyor ise erişebileceği bir yere konuldu mu?",
        reason4: "Kenarlık koruması gerekli mi?",
        reason5: "Düşme riski oluştu mu?"
      };

      const urineCheckMap = {
        urine: "İdrar Çıkışı (ml)",
        stool: "Gaita Çıkışı Var mı?"
      };

      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Process each day in the week
      daysInWeek.forEach((dayInfo) => {
        const dayDate = new Date(dayInfo.date);
        const dayName = daysOfWeek[dayDate.getDay()];
        const dateKey = reformatDjangoDate(dayInfo.date);
        
        // Collect care items for this day
        const careRows = [];
        
        // Get HC data for this date
        if (dateKey in hcData) {
          const dayHcData = hcData[dateKey];
          
          // Process both day and night care
          ['day', 'night'].forEach((hcType) => {
            if (hcType in dayHcData && dayHcData[hcType].length > 0) {
              // Get the latest entry for this type
              const latestHc = dayHcData[hcType][dayHcData[hcType].length - 1];
              const hcDataEntry = latestHc.signed_hc_data || {};
              
              const typeLabel = hcType === 'day' ? 'Gündüz' : 'Gece';
              
              // Hygiene Check Daily
              if (hcDataEntry.hygieneCheckDaily) {
                Object.entries(hcDataEntry.hygieneCheckDaily).forEach(([key, value]) => {
                  if (hygieneCheckDailyMap[key]) {
                    careRows.push({
                      "Kategori": "Günlük Hijyen",
                      "Alt Kategori": typeLabel,
                      "Bakım Türü": hygieneCheckDailyMap[key],
                      "Durum": value ? "Yapıldı" : "Yapılmadı",
                      "Değer": ""
                    });
                  }
                });
              }
              
              // Hygiene Check Weekly
              if (hcDataEntry.hygieneCheckWeekly) {
                Object.entries(hcDataEntry.hygieneCheckWeekly).forEach(([key, value]) => {
                  if (hygieneCheckWeeklyMap[key]) {
                    careRows.push({
                      "Kategori": "Haftalık Hijyen",
                      "Alt Kategori": typeLabel,
                      "Bakım Türü": hygieneCheckWeeklyMap[key],
                      "Durum": value ? "Yapıldı" : "Yapılmadı",
                      "Değer": ""
                    });
                  }
                });
              }
              
              // Meal Check
              if (hcDataEntry.mealCheck) {
                Object.entries(hcDataEntry.mealCheck).forEach(([key, value]) => {
                  if (mealCheckMap[key]) {
                    careRows.push({
                      "Kategori": "Beslenme",
                      "Alt Kategori": typeLabel,
                      "Bakım Türü": mealCheckMap[key],
                      "Durum": value ? "Yapıldı" : "Yapılmadı",
                      "Değer": ""
                    });
                  }
                });
              }
              
              // Posture Check
              if (hcDataEntry.postureCheck) {
                Object.entries(hcDataEntry.postureCheck).forEach(([key, value]) => {
                  if (postureCheckMap[key]) {
                    careRows.push({
                      "Kategori": "Pozisyon",
                      "Alt Kategori": typeLabel,
                      "Bakım Türü": postureCheckMap[key],
                      "Durum": value ? "Evet" : "Hayır",
                      "Değer": ""
                    });
                  }
                });
              }
              
              // Dressing Check
              if (hcDataEntry.dressingCheck) {
                Object.entries(hcDataEntry.dressingCheck).forEach(([key, value]) => {
                  if (dressingCheckMap[key]) {
                    let displayValue = "";
                    if (key === 'stage' && typeof value === 'number') {
                      displayValue = value.toString();
                    } else if (key === 'injuredParts' && Array.isArray(value)) {
                      displayValue = value.join(", ");
                    } else if (typeof value === 'boolean') {
                      displayValue = value ? "Evet" : "Hayır";
                    } else {
                      displayValue = value ? String(value) : "";
                    }
                    
                    careRows.push({
                      "Kategori": "Pansuman ve Katater",
                      "Alt Kategori": typeLabel,
                      "Bakım Türü": dressingCheckMap[key],
                      "Durum": typeof value === 'boolean' ? (value ? "Evet" : "Hayır") : "",
                      "Değer": displayValue
                    });
                  }
                });
              }
              
              // Edema Check
              if (hcDataEntry.edemaCheck) {
                Object.entries(hcDataEntry.edemaCheck).forEach(([key, value]) => {
                  if (edemaCheckMap[key]) {
                    careRows.push({
                      "Kategori": "Ödem Takibi",
                      "Alt Kategori": typeLabel,
                      "Bakım Türü": edemaCheckMap[key],
                      "Durum": typeof value === 'boolean' ? (value ? "Evet" : "Hayır") : "",
                      "Değer": typeof value === 'number' ? value.toString() : (value ? String(value) : "")
                    });
                  }
                });
              }
              
              // Security Check
              if (hcDataEntry.securityCheck) {
                Object.entries(hcDataEntry.securityCheck).forEach(([key, value]) => {
                  if (securityCheckMap[key]) {
                    careRows.push({
                      "Kategori": "Güvenlik",
                      "Alt Kategori": typeLabel,
                      "Bakım Türü": securityCheckMap[key],
                      "Durum": value ? "Evet" : "Hayır",
                      "Değer": ""
                    });
                  }
                });
              }
              
              // Urine Check
              if (hcDataEntry.urineCheck) {
                Object.entries(hcDataEntry.urineCheck).forEach(([key, value]) => {
                  if (urineCheckMap[key]) {
                    careRows.push({
                      "Kategori": "İdrar ve Gaita",
                      "Alt Kategori": typeLabel,
                      "Bakım Türü": urineCheckMap[key],
                      "Durum": typeof value === 'boolean' ? (value ? "Evet" : "Hayır") : "",
                      "Değer": typeof value === 'number' ? value.toString() : (value ? String(value) : "")
                    });
                  }
                });
              }
            }
          });
        }

        // Create worksheet data
        const worksheetData = [
          ["Kategori", "Alt Kategori", "Bakım Türü", "Durum", "Değer"],
          ...careRows.map(care => [
            care["Kategori"],
            care["Alt Kategori"],
            care["Bakım Türü"],
            care["Durum"],
            care["Değer"]
          ])
        ];

        // If no care data for this day, add a message
        if (careRows.length === 0) {
          worksheetData.push(["Bu gün için bakım kaydı bulunmamaktadır.", "", "", "", ""]);
        }

        // Create worksheet
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        
        // Set column widths
        worksheet['!cols'] = [
          { wch: 20 }, // Kategori
          { wch: 15 }, // Alt Kategori
          { wch: 50 }, // Bakım Türü
          { wch: 15 }, // Durum
          { wch: 15 }  // Değer
        ];

        // Add worksheet to workbook with day name as sheet name
        const sheetName = dayName.substring(0, 10); // Excel sheet names are limited to 31 chars
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      });

      // Generate Excel file
      const fileName = `hasta_${selectedPatient.patient_id}_bakim_listesi_${formatDateDDMMYYYY(selectedWeek.start.toString())}_${formatDateDDMMYYYY(selectedWeek.end.toString())}.xlsx`;
      XLSX.writeFile(workbook, fileName);
      
      window.alert("Excel dosyası başarıyla oluşturuldu.");
    } catch (error) {
      console.error("Excel export error:", error);
      window.alert("Excel dosyası oluşturulurken bir hata oluştu.");
    }
  };

  const handleNewHc = (new_date = getTodayForDjango()) => {
      setHcDate(new_date)
      setNewHCContainer(true)
  }

  const handleEditDay = (date) => {
    setHcDate(date)
    setNewHCContainer(true)
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
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, fontFamily: 'RedHatDisplay' }}>
          Bakım Raporları
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

        <Box sx={{ flexGrow: 1, overflow: 'auto', height: '180px' }}>
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

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, pt: 1 }}>
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
            onClick={() => handleNewHc()}
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

export default HCList;
