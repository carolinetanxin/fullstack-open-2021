import React, {useState, useEffect} from 'react';
import axios from "axios";

import Filter from "./Filter/Filter";
import PersonForm from "./PersonForm/PersonForm";
import Persons from "./Persons/Persons";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilterName, setNewFilterName] = useState('')
    const [showAll, setShowAll] = useState(true);

    const hook = () => {
        console.log('effect');

        const eventHandler = response => {
            console.log('promise fulfilled')
            setPersons(response.data)
        }

        axios
            .get('http://localhost:3001/persons')
            .then(eventHandler)
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
            return alert(`${newName} is already added to phonebook`);
        }
        const newObj = {
            name: newName,
            number: newNumber
        }
        setPersons(persons.concat(newObj));
        setNewName('');
        setNewNumber('');
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

            <Filter newFilterName={newFilterName} filterNameChange={filterNameChange}  />

            <h2>add a new</h2>
            <PersonForm addName={addName}
                        newName={newName} handleNameChange={handleNameChange}
                        newNumber={newNumber} handleNumberChange={handleNumberChange}/>

            <h2>Numbers</h2>
            <Persons personsToShow={personsToShow}/>
        </div>
    )
}


export default App;
