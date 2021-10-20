import React, {useState, useEffect} from 'react';

import Note from "./components/note";
import Notification from "./components/notification";
import Footer from "./components/footer";

import noteService from "./services/note"
import loginService from "./services/login"

function App(props) {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('a new note...');
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState('some error happened...')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    // login
    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('login in with', username, password)
        try {
            const user = await loginService.login({username, password})

            window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
            noteService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (e) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }
    // check if store logged user info
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            noteService.setToken(user.token)
        }
    }, [])

    // get all notes
    const hook = () => {
        console.log('effect');

        const eventHandler = initialNotes => {
            console.log('promise fulfilled')
            setNotes(initialNotes)
        }

        noteService.getAll().then(eventHandler)
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
        noteService.create(newObj).then(returnedNote => {
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

        noteService
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

    // 登录表单
    const loginForm = () => {
        return (
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input type="text"
                           value={username}
                           name="Username"
                           onChange={({target}) => { setUsername(target.value) }}/>
                </div>
                <div>
                    password
                    <input type="password"
                           value={password}
                           name="Password"
                           onChange={({target}) => { setPassword(target.value) }}/>
                </div>
                <button type="submit">login</button>
            </form>
        )
    }

    // 添加note表单
    const noteForm = () => {
        return (
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
        )
    }

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage}/>

            {user === null ?
                loginForm() :
                <div>
                    <p>
                        {user.name} logged-in
                        <button type="submit" onClick={() => window.localStorage.removeItem('loggedNoteappUser')}>logout</button>
                    </p>
                    {noteForm()}
                </div>
            }

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

            <Footer />
        </div>
    )
}

export default App;
