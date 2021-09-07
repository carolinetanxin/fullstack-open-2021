import React, {useState, useEffect} from 'react';
import Note from "./components/note";
import NoteService from "./services/note"
import Notification from "./components/notification";
import Footer from "./components/footer";

function App(props) {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('a new note...');
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState('some error happened...')

    // get all notes
    const hook = () => {
        console.log('effect');

        const eventHandler = initialNotes => {
            console.log('promise fulfilled')
            setNotes(initialNotes)
        }

        NoteService.getAll().then(eventHandler)
    }
    useEffect(hook, [])
    console.log(`render ${notes.length} notes`);

    // creat a note
    const addNote = (event) => {
        event.preventDefault(); // 阻止提交表单的默认操作
        const newObj = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notes.length + 1
        }
        NoteService.create(newObj).then(returnedNote => {
            setNotes(notes.concat(returnedNote));
            setNewNote('');
        })
    }

    const handleNoteChange = (event) => {
        // console.log(event.target.value);
        setNewNote(event.target.value);
    }

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important);

    // update note
    const toggleImportanceOf = (id) => {
        console.log(`importance of ${id} needs to be toggled`)

        const url = `http://localhost:3001/notes/${id}`
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        NoteService
            .update(changedNote).then(returnedNote => {
                // 捕捉并替换修改项数据
                setNotes(notesToShow.map(note => note.id !== id ? note : returnedNote))
            })
            .catch((e) => {
                setErrorMessage(`the note '${note.content}' was already deleted from server`);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000)
                setNotes(notesToShow.filter(note => note.id !== id))
            })
    }

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage}/>

            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>

            <ul>
                {notesToShow.map(note =>
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}/>
                )}
            </ul>

            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>

            <Footer />
        </div>
    )
}

export default App;
