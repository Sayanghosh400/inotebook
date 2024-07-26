import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Added Successfully", "success");
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className="container my-3">
                <h1>Add Notes</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className={`form-control bg-${props.mode}`} id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={3} required style={{color: props.mode === 'light' ? 'black' : 'white'}}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Note</label>
                        <input type="text" className={`form-control bg-${props.mode}`}  id="description" name="description" value={note.description} onChange={onChange} minLength={5} required style={{color: props.mode === 'light' ? 'black' : 'white'}} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className={`form-control bg-${props.mode}`}  id="tag" name="tag" value={note.tag} onChange={onChange} style={{color: props.mode === 'light' ? 'black' : 'white'}}/>
                    </div>
                    <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
