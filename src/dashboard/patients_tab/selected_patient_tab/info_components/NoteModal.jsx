import * as React from "react";
import { useState, useEffect } from "react";
import './note_modal.css';
import { API_BASE_URL } from "../../../../config";

const NoteModal = ({ isOpen, onClose, onSave, patientId, userEmail, noteToEdit = null, titleOptions = null }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteData, setNoteData] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (noteToEdit) {
      setNoteTitle(noteToEdit.note_title || "");
      setNoteData(noteToEdit.note_data || "");
    } else {
      setNoteTitle("");
      setNoteData("");
    }
    setErrors({});
  }, [noteToEdit, isOpen]);

  const handleSave = () => {
    const newErrors = {};
    
    if (!noteTitle.trim()) {
      newErrors.title = "Başlık gereklidir";
    }
    
    if (!noteData.trim()) {
      newErrors.data = "Not içeriği gereklidir";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const todayDate = new Date().toString();
    const noteData_payload = {
      email: userEmail,
      type: noteToEdit ? "update_note" : "add_note",
      patient_id: patientId,
      note_title: noteTitle.trim(),
      note_data: noteData.trim(),
      today_date: todayDate
    };

    if (noteToEdit) {
      noteData_payload.note_id = noteToEdit.note_id;
      noteData_payload.note_date = noteToEdit.note_date;
    }

    fetch(`${API_BASE_URL}/patients/`, {
      method: noteToEdit ? "PUT" : "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(noteData_payload)
    })
    .then(r => r.json())
    .then(resp => {
      if (resp.status === "success") {
        onSave();
        onClose();
        setNoteTitle("");
        setNoteData("");
        setErrors({});
      } else {
        setErrors({ submit: "Not kaydedilemedi. Lütfen tekrar deneyin." });
      }
    })
    .catch(error => {
      console.error("Error saving note:", error);
      setErrors({ submit: "Bir hata oluştu. Lütfen tekrar deneyin." });
    });
  };

  if (!isOpen) return null;

  return (
    <div className="note-modal-overlay" onClick={onClose}>
      <div className="note-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="note-modal-header">
          <h3 className="note-modal-title">{noteToEdit ? "Notu Düzenle" : "Yeni Not Ekle"}</h3>
          <button className="note-modal-close" onClick={onClose}>×</button>
        </div>
        <div className="note-modal-body">
          <div className="note-input-group">
            <label htmlFor="note-title">Başlık <span className="required">*</span></label>
            {titleOptions && titleOptions.length > 0 ? (
              <select
                style={{"height": "45px"}}
                id="note-title"
                value={noteTitle}
                onChange={(e) => {
                  setNoteTitle(e.target.value);
                  if (errors.title) setErrors({ ...errors, title: null });
                }}
                className={errors.title ? "error" : ""}
              >
                <option value="">Başlık Seçiniz</option>
                {titleOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                id="note-title"
                type="text"
                value={noteTitle}
                onChange={(e) => {
                  setNoteTitle(e.target.value);
                  if (errors.title) setErrors({ ...errors, title: null });
                }}
                placeholder="Not başlığını giriniz"
                className={errors.title ? "error" : ""}
              />
            )}
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>
          <div className="note-input-group">
            <label htmlFor="note-content">Not İçeriği <span className="required">*</span></label>
            <textarea
              id="note-content"
              value={noteData}
              onChange={(e) => {
                setNoteData(e.target.value);
                if (errors.data) setErrors({ ...errors, data: null });
              }}
              placeholder="Not içeriğini giriniz..."
              rows="8"
              className={errors.data ? "error" : ""}
            />
            {errors.data && <span className="error-message">{errors.data}</span>}
          </div>
          {errors.submit && <span className="error-message submit-error">{errors.submit}</span>}
        </div>
        <div className="note-modal-footer">
          <button className="btn-cancel" onClick={onClose}>İptal</button>
          <button className="btn-save" onClick={handleSave}>{noteToEdit ? "Güncelle" : "Kaydet"}</button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;


