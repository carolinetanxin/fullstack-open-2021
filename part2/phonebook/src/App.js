import React, {useState, useEffect} from 'react';
import PhoneService from "./services/phone"

import Filter from "./components/Filter/Filter";
import PersonForm from "./components/PersonForm/PersonForm";
import Persons from "./components/Persons/Persons";
import Notification from "./components/Notification/Notification";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilterName, setNewFilterName] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)


    const hook = () => {
        console.log('effect');

        const eventHandler = InitialPhone => {
            console.log('promise fulfilled')
            setPersons(InitialPhone)
        }

        PhoneService.getAll().then(eventHandler)
    };
    useEffect(hook, [])


    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    const addName = (event) => {
        event.preventDefault();
        if (checkRepeatName()) {
            const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
            if (confirm) {
                const person = persons.find(p => p.name === newName);
                const changedPerson = {... person, number: newNumber};
                PhoneService.update(changedPerson).then(returnedPerson => {
                    setPersons(personsToShow.map(p => p.id !== person.id ? p : returnedPerson))
                    setNewName('');
                    setNewNumber('');
                })
            }
            return;
        }
        const newObj = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }
        PhoneService.create(newObj).then(returnedPhone => {
            setSuccessMessage(`Added ${returnedPhone.name}`);
            setTimeout(() => {
                setSuccessMessage(null);
            }, 5000)
            setPersons(persons.concat(returnedPhone));
            setNewName('');
            setNewNumber('');
        })
    }

    const checkRepeatName = () => {
        const namelist = persons.map(person => person.name);
        return namelist.indexOf(newName) > -1;
    }

    const filterNameChange = (event) => {
        setShowAll(event.target.value === '');
        setNewFilterName(event.target.value);
    }

    const personsToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().indexOf(newFilterName.toLowerCase()) > -1)

    return (
        <div>
            <h2>Phonebook</h2>

            <Notification successMessage={successMessage} errorMessage={errorMessage}/>

            <Filter newFilterName={newFilterName} filterNameChange={filterNameChange} />

            <h2>add a new</h2>
            <PersonForm addName={addName}
                        newName={newName} handleNameChange={handleNameChange}
                        newNumber={newNumber} handleNumberChange={handleNumberChange}/>

            <h2>Numbers</h2>
            <Persons personsToShow={personsToShow} setPersons={setPersons} setErrorMessage={setErrorMessage}/>
        </div>
    )
}


export default App;
