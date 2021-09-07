import React from 'react';
import PhoneService from '../../services/phone'

const Persons = ({personsToShow, setPersons, setErrorMessage}) => {
    const deletePerson = (person) => {
        const confirm = window.confirm(`Delete ${person.name}?`)
        if (confirm) {
            PhoneService.remove(person.id).then(res => {
                setPersons(personsToShow.filter(p => p.id !== person.id))
            }).catch(err => {
                setErrorMessage(`Inform of ${person.name} has already been removed from server`);
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
        }

    }

    return (
        personsToShow.map(person =>
            <p key={person.name}>
                {person.name}: {person.number}
                <button onClick={() => deletePerson(person)}>delete</button>
            </p>)
    )
}


export default Persons;
