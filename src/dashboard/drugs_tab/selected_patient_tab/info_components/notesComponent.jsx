import * as React from "react";
import './notes_component.css'


function PatientNotes({ note }) {
    let date = note["note_date"]
    let title = note["note_title"]
    let data = note["note_data"]
  return (
    <article className="note">
      <time className="note-date">{date}</time>
      <h3 className="note-title">
        {title}
      </h3>
      <p className="note-data">{data}</p>
    </article>
  );
}

function NotesList({ selectedPatient, setNewNoteContainer }) {
  const notes = [
    // {
    //   note_date: "15.09.23",
    //   note_title: "Test1",
    //   note_data: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    // }
  ];

  const handleNewNote = () => {
      setNewNoteContainer(true)
  }

  return (
    <article className="drugs-note-container">
        <header className="note-header">Notlar </header>
        <div className="note-divider" />
        <div style={{"overflow": "scroll", "overflowX": "hidden"}}>
          {notes.map((note, index) => (
            <PatientNotes key={index} note={note} />
          ))}
        </div>
        <div className="note-divider" />
        <div style={{alignSelf: "center", marginLeft: "3%"}}>
            <button className="notes-button"onClick={handleNewNote}>Not Ekle</button>
        </div>
    </article>
  );
}

export default NotesList;
