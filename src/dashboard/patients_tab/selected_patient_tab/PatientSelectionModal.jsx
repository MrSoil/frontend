import * as React from "react";
import { useState, useEffect } from "react";
import './patient_selection_modal.css';

const PatientSelectionModal = ({ isOpen, onClose, patientsList, selectedPatient, onSelectPatient }) => {
  const [searchInput, setSearchInput] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setSearchInput("");
      setFilteredPatients(patientsList);
    }
  }, [isOpen, patientsList]);

  useEffect(() => {
    let filtered = [...patientsList];

    // Apply search filter
    if (searchInput) {
      filtered = filtered.filter((patient) => {
        const fullName = `${patient.patient_personal_info.section_1.firstname} ${patient.patient_personal_info.section_1.lastname}`;
        return (
          patient.patient_personal_info.section_1.firstname.toLowerCase().startsWith(searchInput.toLowerCase()) ||
          patient.patient_personal_info.section_1.lastname.toLowerCase().startsWith(searchInput.toLowerCase()) ||
          fullName.toLowerCase().startsWith(searchInput.toLowerCase()) ||
          patient.patient_personal_info.section_1.patientRoom.toLowerCase().startsWith(searchInput.toLowerCase())
        );
      });
    }

    // Apply sort
    filtered.sort((a, b) => {
      if (sortOption === "name") {
        const nameA = `${a.patient_personal_info.section_1.firstname} ${a.patient_personal_info.section_1.lastname}`;
        const nameB = `${b.patient_personal_info.section_1.firstname} ${b.patient_personal_info.section_1.lastname}`;
        return nameA.localeCompare(nameB);
      }
      return 0;
    });

    setFilteredPatients(filtered);
  }, [searchInput, sortOption, patientsList]);

  const handlePatientClick = (patient) => {
    onSelectPatient(patient);
    onClose();
  };

  const getPatientRoom = (patient) => {
    return patient.patient_personal_info?.section_1?.patientRoom || "N/A";
  };

  if (!isOpen) return null;

  return (
    <div className="patient-selection-modal-overlay" onClick={onClose}>
      <div className="patient-selection-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="patient-selection-modal-header">
          <h2 className="patient-selection-modal-title">Danışan Değiştir</h2>
          <button className="patient-selection-modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="patient-selection-modal-controls">
          <div className="patient-selection-search-container">
            <svg className="patient-selection-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#28252F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 14L11.1 11.1" stroke="#28252F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              className="patient-selection-search-input"
              type="text"
              placeholder="Danışan Ara"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          
          <div className="patient-selection-sort-container">
            <span className="patient-selection-sort-label">Sırala</span>
            <svg className="patient-selection-sort-icon" width="9" height="5" viewBox="0 0 9 5" fill="none">
              <path d="M1 1L4.5 4L8 1" stroke="rgba(40, 37, 47, 0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="patient-selection-grid">
          {filteredPatients.map((patient, index) => {
            const isSelected = selectedPatient && selectedPatient.patient_id === patient.patient_id;
            return (
              <div
                key={patient.patient_id || index}
                className={`patient-selection-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handlePatientClick(patient)}
              >
                <div className="patient-selection-card-info">
                  <img
                    src={`data:image/*;base64,${patient.patient_personal_info.section_1.image}`}
                    alt={`${patient.patient_personal_info.section_1.firstname} ${patient.patient_personal_info.section_1.lastname}`}
                    className="patient-selection-avatar"
                  />
                  <div className="patient-selection-card-details">
                    <div className="patient-selection-card-name">
                      {patient.patient_personal_info.section_1.firstname} {patient.patient_personal_info.section_1.lastname}
                    </div>
                    <div className="patient-selection-card-location">
                      {getPatientRoom(patient)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PatientSelectionModal;

