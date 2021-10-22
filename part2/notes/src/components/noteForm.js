import React, {useState} from "react";

const NoteForm = ({ createNote }) => {
    const [newNote, setNewNote] = useState('a new note...');

    const handleNoteChange = (event) => {
        // console.log(event.target.value);
        setNewNote(event.target.value);
    }

    // creat a note
    const addNote = (event) => {
        event.preventDefault(); // 阻止提交表单的默认操作
        createNote({
            content: newNote,
            important: Math.random() > 0.5
        })
        setNewNote('')
    }

    return (
        <div>
            <h2>Create a new note</h2>

            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default NoteForm
