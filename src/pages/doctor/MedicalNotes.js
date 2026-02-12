import React, { useEffect, useState } from "react";
import { getMedicalNotes, addMedicalNote } from "../../services/doctorService";

function MedicalNotes({ patient }) {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!patient) return;
    async function fetchNotes() {
      const data = await getMedicalNotes(patient.id);
      setNotes(data);
    }
    fetchNotes();
  }, [patient]);

  const handleAdd = async () => {
    if (!note) return;
    await addMedicalNote(patient.id, note);
    setNote("");
    const updated = await getMedicalNotes(patient.id);
    setNotes(updated);
  };

  return (
    <div>
      <h1>Medical Notes for {patient?.name}</h1>
      <div className="mb-4 flex gap-2">
        <textarea placeholder="Add note..." value={note} onChange={e => setNote(e.target.value)} className="p-2 border rounded flex-1" rows="3" />
        <button onClick={handleAdd} className="bg-green-600 text-white py-2 px-4 rounded">Add Note</button>
      </div>
      <ul>
        {notes.map(n => (
          <li key={n.id}>{new Date(n.date).toLocaleString()} — {n.note}</li>
        ))}
      </ul>
    </div>
  );
}

export default MedicalNotes;
