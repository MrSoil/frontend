import * as React from "react";
import { useState, useEffect } from "react";
import './notes_component.css'
import NoteModal from './NoteModal';
import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { API_BASE_URL } from "../../../../config";

function PatientNotes({ note, onEdit, onDelete }) {
    let date = note["note_date"]
    let title = note["note_title"]
    let data = note["note_data"]
  return (
    <article className="note">
      <div className="note-header-row">
        <time className="note-date">{date}</time>
        <div className="note-actions">
          <IconButton 
            size="small" 
            onClick={() => onEdit(note)}
            className="note-action-btn"
            title="Düzenle"
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={() => onDelete(note)}
            className="note-action-btn delete"
            title="Sil"
          >
            <Delete fontSize="small" />
          </IconButton>
        </div>
      </div>
      <div className="note-header-row">
      <h3 className="note-title">
        {title}
      </h3>
      </div>
      <div className="note-header-row">
      <p className="note-data">{data}</p>

      </div>


    </article>
  );
}

function NotesList({ selectedPatient, setNewNoteContainer }) {
  const [notes, setNotes] = useState([]);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchNotes = () => {
    if (!selectedPatient || !selectedPatient.patient_id) return;
    
    setIsLoading(true);
    fetch(`${API_BASE_URL}/patients/?email=${user.email}&patient_id=${selectedPatient.patient_id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(resp => {
      if (resp.status === "success" && resp.data && resp.data.length > 0) {
        const patientData = resp.data[0];
        const patientNotes = patientData.patient_notes || {};
        
        // Convert notes object to array, sorted by date (newest first)
        const notesArray = [];
        Object.keys(patientNotes).forEach(date => {
          Object.keys(patientNotes[date]).forEach(noteId => {
            notesArray.push(patientNotes[date][noteId]);
          });
        });
        
        // Sort by timestamp (newest first)
        notesArray.sort((a, b) => {
          const dateA = new Date(a.timestamp || a.note_date);
          const dateB = new Date(b.timestamp || b.note_date);
          return dateB - dateA;
        });
        
        setNotes(notesArray);
      } else {
        setNotes([]);
      }
      setIsLoading(false);
    })
    .catch(error => {
      console.error("Error fetching notes:", error);
      setIsLoading(false);
      setNotes([]);
    });
  };

  useEffect(() => {
    fetchNotes();
  }, [selectedPatient]);

  const handleNewNote = () => {
    setNoteToEdit(null);
    setShowNoteModal(true);
  };

  const handleEditNote = (note) => {
    setNoteToEdit(note);
    setShowNoteModal(true);
  };

  const handleDeleteNote = (note) => {
    if (!window.confirm("Bu notu silmek istediğinize emin misiniz?")) {
      return;
    }

    fetch(`${API_BASE_URL}/patients/`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        type: "delete_note",
        patient_id: selectedPatient.patient_id,
        note_id: note.note_id,
        note_date: note.note_date
      })
    })
    .then(r => r.json())
    .then(resp => {
      if (resp.status === "success") {
        fetchNotes();
      } else {
        alert("Not silinirken bir hata oluştu.");
      }
    })
    .catch(error => {
      console.error("Error deleting note:", error);
      alert("Not silinirken bir hata oluştu.");
    });
  };

  const handleNoteSaved = () => {
    fetchNotes();
  };

  const titleOptions = [
    "Hijyen Gereksinimleri",
    "Beslenme Takibi",
    "Pozisyon Takibi",
    "Pansuman ve Katater Bakımı",
    "Ödem Takibi",
    "Misafir Güvenliği"
  ];

  return (
    <article className="note-container">
        <header className="note-header">Notlar</header>
        <div className="note-divider" />
        <div className="notes-list-container" style={{"overflow": "auto", "overflowX": "hidden"}}>
          {isLoading ? (
            <div className="notes-loading">Yükleniyor...</div>
          ) : notes.length === 0 ? (
            <div className="notes-empty">Henüz not eklenmemiş</div>
          ) : (
            notes.map((note, index) => (
              <PatientNotes 
                key={note.note_id || index} 
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ))
          )}
        </div>
        <div className="note-divider" />
        <div style={{alignSelf: "center", marginLeft: "3%"}}>
            <button className="notes-button" onClick={handleNewNote}>Not Ekle</button>
        </div>
        <NoteModal
          isOpen={showNoteModal}
          onClose={() => {
            setShowNoteModal(false);
            setNoteToEdit(null);
          }}
          onSave={handleNoteSaved}
          patientId={selectedPatient?.patient_id}
          userEmail={user.email}
          noteToEdit={noteToEdit}
          titleOptions={titleOptions}
        />
    </article>
  );
}

export default NotesList;
