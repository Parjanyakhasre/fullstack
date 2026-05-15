import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  
  function fetchNotes() {
    axios.get('http://localhost:3000/api/notes')
    .then((res) => {
      setNotes(res.data.notes)
    });
  }
  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;

    console.log(title.value,description.value)
    axios.post('http://localhost:3000/api/notes', {
      title: title.value,
      description: description.value
    })
    .then((res) => {      console.log(res.data);
      fetchNotes();
    });

  }

  function handleDelete(id) {
    axios.delete(`http://localhost:3000/api/notes/${id}`)
    .then(() => {
      fetchNotes();
    });
  }

  function startEditing(note) {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditDescription(note.description);
  }

  function handleUpdate(e) {
    e.preventDefault();
    axios.patch(`http://localhost:3000/api/notes/${editingId}`, {
      title: editTitle,
      description: editDescription
    })
    .then(() => {
      setEditingId(null);
      fetchNotes();
    });
  }


  return (
    <>

    <form className="note-create-form" onSubmit={handleSubmit}>
      <input type='text' name='title' placeholder='Note Title' />
      <textarea name='description' placeholder='Note Description'></textarea>
      <button type='submit'>Create Note</button>
    </form>

    <div className="notes">
      {
        notes.map((note) => (
          <div key={note._id} className="note">
            {editingId === note._id ? (
              <form onSubmit={handleUpdate}>
                <input 
                  className="textinput"
                  type="text" 
                  value={editTitle} 
                  onChange={(e) => setEditTitle(e.target.value)} 
                  autoFocus
                />
                <textarea 
                  className="textarea"
                  value={editDescription} 
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <div className="button-group">
                  <button className="btnsave" type="submit">Save</button>
                  <button className="btncancel" type="button" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <h1>{note.title}</h1>
                <p>{note.description}</p>
                <button className="deletebtn" onClick={() => handleDelete(note._id)}>Delete</button>
                <button className="updatebtn" onClick={() => startEditing(note)}>Update</button>
              </>
            )}
          </div>
        ))
      }
    </div>
    </>
  )
};

export default App;
