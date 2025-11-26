import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './dashboard.css';
import { API_BASE_URL } from "../config";
import patientsImage from "../assets/dashboard/dashboard-patients.png";
import medicinesImage from "../assets/dashboard/dashboard-medicines.png";

// Extract floor from room number like "Oda - 101"
const getFloorFromRoom = (roomString) => {
  if (!roomString) return null;
  const match = roomString.match(/Oda\s*-\s*(\d+)/i);
  if (match) {
    const roomNum = parseInt(match[1]);
    return Math.floor(roomNum / 100); // 101 → 1, 201 → 2
  }
  return null;
};

// Get last 7 days dates in both formats
const getLast7Days = () => {
  const dates = [];
  const dateFormats = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // ISO format (YYYY-MM-DD)
    const isoDate = date.toISOString().split('T')[0];
    dates.push(isoDate);
    
    // Django format (DD-MM-YY)
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yy = String(date.getFullYear() % 100).padStart(2, '0');
    dateFormats.push(`${dd}-${mm}-${yy}`);
  }
  
  return { isoDates: dates, djangoDates: dateFormats };
};

// Convert Django date (DD-MM-YY) to ISO date (YYYY-MM-DD)
const convertDjangoDateToISO = (djangoDate) => {
  if (!djangoDate) return null;
  
  if (djangoDate.includes('-')) {
    const parts = djangoDate.split('-');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      const fullYear = year.length === 2 ? '20' + year : year;
      return `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  }
  
  return null;
};

// Format date for display
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Try parsing as Django date format
      if (dateString.includes('-')) {
        const parts = dateString.split('-');
        if (parts.length === 3) {
          const [day, month, year] = parts;
          const fullYear = year.length === 2 ? '20' + year : year;
          const dateObj = new Date(`${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
          if (!isNaN(dateObj.getTime())) {
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            return dateObj.toLocaleDateString('tr-TR', options);
          }
        }
      }
      return dateString; // Return as-is if can't parse
    }
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('tr-TR', options);
  } catch (e) {
    return dateString;
  }
};

// Format time for display
const formatTime = (dateString) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Try parsing timestamp format like "Tue Apr 23 2024 01:53:24 GMT+0300"
      if (dateString.includes('GMT')) {
        const cleaned = dateString.split(' GMT')[0];
        const parsed = new Date(cleaned);
        if (!isNaN(parsed.getTime())) {
          return parsed.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
        }
      }
      return ''; // Return empty if can't parse
    }
    return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  } catch (e) {
    return '';
  }
};

const Dashboard = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [careTagsByFloor, setCareTagsByFloor] = useState({});
    const [weeklyHistory, setWeeklyHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const type_map = {
        "note": "Not",
        "hc": "Bakım Raporu",
        "medicine": "İ̇laç Raporu"
    }

    useEffect(() => {
        if (user.email) {
            fetchPatients();
        }
    }, [user.email]);

    const fetchPatients = () => {
        setIsLoading(true);
        fetch(`${API_BASE_URL}/patients/?email=${user.email}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(r => r.json())
        .then(resp => {
            if (resp.status === "success") {
                const patientsData = resp.data || [];
                setPatients(patientsData);
                processCareTags(patientsData);
                processWeeklyHistory(patientsData);
            } else {
                setPatients([]);
                setCareTagsByFloor({});
                setWeeklyHistory([]);
            }
            setIsLoading(false);
        })
        .catch(error => {
            console.error("Error fetching patients:", error);
            setPatients([]);
            setCareTagsByFloor({});
            setWeeklyHistory([]);
            setIsLoading(false);
        });
    };

    const processCareTags = (patientsData) => {
        const tagsByFloor = {};
        
        patientsData.forEach(patient => {
            const room = patient.patient_personal_info?.section_1?.patientRoom;
            const floor = getFloorFromRoom(room);
            
            if (floor) {
                // Initialize floor object if it doesn't exist
                if (!tagsByFloor[floor]) {
                    tagsByFloor[floor] = {};
                }
                
                const onGoingCare = patient.patient_personal_info?.section_3?.onGoingCare || [];
                
                onGoingCare.forEach(careType => {
                    if (careType && careType.trim()) {
                        if (!tagsByFloor[floor][careType]) {
                            tagsByFloor[floor][careType] = 0;
                        }
                        tagsByFloor[floor][careType]++;
                    }
                });
            }
        });
        
        setCareTagsByFloor(tagsByFloor);
    };

    const processWeeklyHistory = (patientsData) => {
        const history = [];
        const last7Days = getLast7Days();
        const last7DaysSet = new Set(last7Days.isoDates);
        const last7DaysDjangoSet = new Set(last7Days.djangoDates);
        
        patientsData.forEach(patient => {
            const patientName = `${patient.patient_personal_info?.section_1?.firstname || ''} ${patient.patient_personal_info?.section_1?.lastname || ''}`.trim();
            
            // Process notes
            const patientNotes = patient.patient_notes || {};
            Object.values(patientNotes).forEach(note => {
                if (note.timestamp || note.note_date) {
                    let dateStr = null;
                    let timestamp = note.timestamp || note.note_date;
                    
                    try {
                        const noteDate = new Date(timestamp);
                        if (!isNaN(noteDate.getTime())) {
                            dateStr = noteDate.toISOString().split('T')[0];
                        }
                    } catch (e) {
                        // Try parsing as Django date
                        dateStr = convertDjangoDateToISO(note.note_date);
                    }
                    
                    if (dateStr && last7DaysSet.has(dateStr)) {
                        history.push({
                            timestamp: timestamp,
                            date: dateStr,
                            patientName: patientName,
                            type: 'note',
                            message: `${note.note_title || 'Not'}: ${(note.note_data || '').substring(0, 50)}${(note.note_data || '').length > 50 ? '...' : ''}`,
                            fullMessage: note.note_data || ''
                        });
                    }
                }
            });
            
            // Process medicines - given dates
            const patientMedicines = patient.patient_medicines || {};
            Object.entries(patientMedicines).forEach(([medId, medData]) => {
                const medName = medData.medicine_data?.name || 'İlaç';
                ['morning', 'noon', 'evening'].forEach(period => {
                    const periodNames = { morning: 'Sabah', noon: 'Öğlen', evening: 'Akşam' };
                    const givenDates = medData.medicine_data?.given_dates?.[period] || {};
                    
                    Object.entries(givenDates).forEach(([dateKey, givenValue]) => {
                        // Handle both old format (boolean) and new format (object with timestamp)
                        let timestamp = null;
                        let dateStr = null;
                        
                        // Check if dateKey is in Django format or ISO format
                        if (last7DaysDjangoSet.has(dateKey)) {
                            // It's in Django format, convert to ISO
                            dateStr = convertDjangoDateToISO(dateKey);
                        } else {
                            dateStr = dateKey;
                        }
                        
                        // Extract timestamp from given value
                        if (typeof givenValue === 'object' && givenValue !== null && givenValue.timestamp) {
                            // New format with timestamp
                            timestamp = givenValue.timestamp;
                        } else if (givenValue === true || (typeof givenValue === 'object' && givenValue.given)) {
                            // Old format (boolean) or new format object without timestamp - use date with default time
                            timestamp = new Date(dateStr + 'T12:00:00').toISOString();
                        }
                        
                        if (dateStr && last7DaysSet.has(dateStr) && timestamp) {
                            history.push({
                                timestamp: timestamp,
                                date: dateStr,
                                patientName: patientName,
                                type: 'medicine',
                                message: `${patientName}'in ${periodNames[period]} ilaçları verildi.`,
                                fullMessage: `${medName} - ${periodNames[period]}`
                            });
                        }
                    });
                });
            });
            
            // Process HC reports
            const patientHC = patient.patient_signed_hc || {};
            Object.entries(patientHC).forEach(([dateKey, hcData]) => {
                let dateStr = null;
                if (last7DaysDjangoSet.has(dateKey)) {
                    dateStr = convertDjangoDateToISO(dateKey);
                } else {
                    dateStr = dateKey;
                }
                
                if (dateStr && last7DaysSet.has(dateStr)) {
                    Object.entries(hcData).forEach(([hcType, hcEntries]) => {
                        if (Array.isArray(hcEntries)) {
                            hcEntries.forEach(entry => {
                                // HC reports use insert_ts field for timestamp
                                const entryTimestamp = entry.insert_ts || entry.timestamp || entry.note_date;
                                if (entryTimestamp) {
                                    // Map HC type to Turkish name
                                    const hcTypeNames = {
                                        'day': 'Gündüz Bakım',
                                        'night': 'Gece Bakım'
                                    };
                                    const hcTypeName = hcTypeNames[hcType] || hcType;
                                    
                                    history.push({
                                        timestamp: entryTimestamp,
                                        date: dateStr,
                                        patientName: patientName,
                                        type: 'hc',
                                        message: `${patientName}'in ${hcTypeName} raporu güncellendi.`,
                                        fullMessage: entry.signed_hc_data ? JSON.stringify(entry.signed_hc_data) : ''
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
        
        // Sort by timestamp (newest first)
        history.sort((a, b) => {
            try {
                const dateA = new Date(a.timestamp);
                const dateB = new Date(b.timestamp);
                if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
                    return 0;
                }
                return dateB - dateA;
            } catch (e) {
                return 0;
            }
        });
        
        // Limit to most recent entries
        setWeeklyHistory(history.slice(0, 50));
    };

    const handlePatientsNavigation = () => {
        navigate("/dashboard/patients");
    };

    const handleDrugsNavigation = () => {
        navigate("/dashboard/drugs");
    };

    const handleFloorNavigation = (floorNumber) => {
        navigate(`/dashboard/patients?floor=${floorNumber}`);
    };

    // Calculate unique floors from patients
    const getFloorsWithPatients = () => {
        const floorsWithPatients = new Set();
        patients.forEach(patient => {
            const room = patient.patient_personal_info?.section_1?.patientRoom;
            const floor = getFloorFromRoom(room);
            if (floor) {
                floorsWithPatients.add(floor);
            }
        });
        return Array.from(floorsWithPatients).sort((a, b) => a - b);
    };

    const sortedFloors = getFloorsWithPatients();

    return (
        <div className="dashboard-content-background">
            <div className="dashboard-cards-container">
                {/* Danışan Yönetimi Card */}
                <div className="dashboard-card">
                    <h2 className="dashboard-card-title">Danışan Yönetimi</h2>
                    <img src={patientsImage} alt="Danışan Yönetimi" className="dashboard-card-image" />
                    <div className="dashboard-card-actions">
                        <button 
                            className="dashboard-card-primary-button"
                            onClick={handlePatientsNavigation}
                        >
                            DANIŞAN YÖNETİMİ
                        </button>
                    </div>
                    <div className="dashboard-card-floors">
                        {sortedFloors.map(floor => {
                            const floorTags = careTagsByFloor[floor] || {};
                            const tagEntries = Object.entries(floorTags);
                            
                            return (
                                <button 
                                    key={floor}
                                    className="dashboard-floor-button"
                                    onClick={() => handleFloorNavigation(floor)}
                                >
                                    <span className="dashboard-floor-button-label">Kat {floor}</span>
                                    {tagEntries.length > 0 && (
                                        <div className="dashboard-floor-button-tags">
                                            {tagEntries.map(([careType, count]) => (
                                                <span
                                                    key={careType}
                                                    className="dashboard-floor-button-tag"
                                                >
                                                    {careType} ({count})
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Sağlık Yönetimi Card */}
                <div className="dashboard-card">
                    <h2 className="dashboard-card-title">Sağlık Yönetimi</h2>
                    <img src={medicinesImage} alt="Sağlık Yönetimi" className="dashboard-card-image" />
                    <div className="dashboard-card-actions">
                        <button 
                            className="dashboard-card-primary-button"
                            onClick={handleDrugsNavigation}
                        >
                            İLAÇ YÖNETİMİ
                        </button>
                    </div>
                    <div className="dashboard-history-container">
                        {isLoading ? (
                            <div className="dashboard-history-loading">Yükleniyor...</div>
                        ) : weeklyHistory.length === 0 ? (
                            <div className="dashboard-history-empty">Henüz kayıt yok</div>
                        ) : (
                            weeklyHistory.map((entry, index) => {
                                const timestamp = entry.timestamp;
                                const timeStr = formatTime(timestamp);
                                const dateStr = formatDate(timestamp);
                                
                                return (
                                    <div key={index} className="dashboard-history-item">
                                        <div className="dashboard-history-header">
                                            <span className="dashboard-history-name">{type_map[entry.type]}: {entry.patientName}</span>
                                            <span className="dashboard-history-time">
                                                {timeStr && dateStr ? `${timeStr}, ${dateStr}` : dateStr || timestamp}
                                            </span>
                                        </div>
                                        <div className="dashboard-history-message">{entry.message}</div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
    </div>
);
}

export default Dashboard;