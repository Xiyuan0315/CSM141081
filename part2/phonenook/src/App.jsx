import React from 'react';
import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      filter shown with <input value={searchTerm} onChange={handleSearchChange} />
    </div>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='noti'>
      {message}
    </div>
  )
}

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='err'>
      {message}
    </div>
  )
}

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addPerson,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};


const Persons = ({ filteredPersons ,deletePerson}) => {
  return (
    <ul>
      {filteredPersons.map((person, index) => (
        <li key={index}>
          {person.name} {person.number} <button onClick = {() => deletePerson(person)} >delete</button>
        </li>
      ))}
    </ul>
  );
};


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);
  const [errormessage, setErrorMessage] = useState(null)
  useEffect(() => {
    personService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])

  const showNotification = (message) => {
    setNotification(message);

    setTimeout(() => {
      setNotification(null);
    }, 5000); // Hide the notification after 5 seconds
  };

  const showErrorMessage = (message) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage(null);
    }, 5000); // Hide the notification after 5 seconds
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    // Check if the person already exists by name
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook. Do you want to update the phone number?`
      );

      if (confirmUpdate) {
        // Use the HTTP PUT method to update the phone number on the backend
        personService.update
        (existingPerson.id, {
          name: newName,
          number: newNumber
        })
          .then((response) => {
            // Update the state with the response data
            setPersons((prevPersons) =>
              prevPersons.map((person) =>
                person.id === existingPerson.id ? response.data : person
              )
            );
            setNewName('');
            setNewPhone('');
          })
          .catch((error) => {
            console.error('Error updating person number:', error)
            showErrorMessage(
              `Note '${existingPerson.name}' was already removed from server`)
              setPersons(persons.filter((person) => person.id !== existingPerson.id))
          })
      }
    } else {
      
      const newPerson = { name: newName, number: newNumber }

      personService
      .create(newPerson)
        .then((response) => {
          setPersons([...persons, response.data]);
          setNewName('');
          setNewNumber('');
        })
        .catch((error) => {
          console.error('Error adding person:', error);
        })
        showNotification(`Added ${newName} `);
    }
  };


  // Filter the list of people based on the search term
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const deletePerson = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService.remove(personToDelete.id)
        .then(() => {
          const updatedPersons = persons.filter((person) => person !== personToDelete);
          setPersons(updatedPersons);
        })
        .catch((error) => {
          setNotification(
            `Note '${personToDelete.name}' was already removed from server`
          )
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <ErrorMessage message={errormessage} />
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};


// const App = () => {
//   const initialPersons = [
//     { name: 'Arto Hellas', phone: '040-1234567' },
//     { name: 'Jane Zhang', phone: '040-4620647' },
//     { name: 'Milia', phone: '040-3473194' },
//   ];

//   const [persons, setPersons] = useState(initialPersons) 
//   const [newName, setNewName] = useState('')
//   const [newPhone, setNewPhone] = useState('')
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleNameChange = (event) => {
//     setNewName(event.target.value)
  
//   } 
//   const handlePhoneChange = (event) => {
//     setNewPhone(event.target.value);
//   }
//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   }
//   const addPerson = (event) => {
//     event.preventDefault()
//     if (persons.some((person) => person.name === newName)) {
//       alert(`${newName} is already in the phonebook.`);
//       return;
//     }
//     const personObject = {
//       name: newName,
//       phone:newPhone
//     }
//     setPersons(persons.concat(personObject))
//     setNewName('')
//     setNewPhone('')
//   }
    
//   const filteredPersons = persons.filter((person) =>
//   person.name.toLowerCase().includes(searchTerm.toLowerCase())
// );

//   const Persons = () =>{
//     return( filteredPersons.map((person, index) => (
//       <li key={index}>
//         {person.name}: {person.phone}
//       </li>
//     )))
//   }
//   const Filter = ({ searchTerm, handleSearchChange }) => {
//     return (
//       <div>
//         Search: <input value={searchTerm} onChange={handleSearchChange} />
//       </div>
//     )}

//   return (
//     <div>
//       <h2>Phonebook</h2>
//       <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
//       <h2>add a new</h2>
//       <form onSubmit={addPerson}>
//       <div>
//         name: <input value={newName} onChange={handleNameChange} />
//       </div>
//       <div>
//         phone: <input value={newPhone} onChange={handlePhoneChange} />
//       </div>
//       <div>
//         <button type="submit">add</button>
//       </div>
//     </form>
//       <h2>Numbers</h2>
//       <Persons persons={persons} />
//     </div>
//   )
// }

export default App

// const App = (props) => {
//   const [notes, setNotes] = useState(props.notes)
//   const [newNote, setNewNote] = useState('') 
//   const [showAll, setShowAll] = useState(true)

//   const notesToShow = showAll
//     ? notes
//     : notes.filter(note => note.important === true)
//   const addNote = (event) => {
//     event.preventDefault()
//     const noteObject = {
//       content: newNote,
//       important: Math.random() < 0.5,
//       id: notes.length + 1,
//     }
  
//     setNotes(notes.concat(noteObject))
//     setNewNote('')
//   }
//   const handleNoteChange = (event) => {
//     console.log(event.target.value)
//     setNewNote(event.target.value)
//   }
//   return (
//     <div>
//       <h1>Notes</h1>
//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? 'important' : 'all' }
//         </button>
//       </div>
//       <ul>
//         {notesToShow.map(note =>
//           <Note key={note.id} note={note} />
//         )}
//       </ul>
//       {/* <ul>
//         {notes.map(note => 
//           <Note key={note.id} note={note} />
//         )}
//       </ul>
//       <form onSubmit={addNote}>
//         <input value={newNote} onChange={handleNoteChange}/>
//         <button type="submit">save</button>
//       </form> */}
//     </div>
//   )
// }
