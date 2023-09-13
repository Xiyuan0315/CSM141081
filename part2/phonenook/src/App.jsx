import { useState } from 'react'
import React from 'react';

const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      filter shown with <input value={searchTerm} onChange={handleSearchChange} />
    </div>
  );
};


const PersonForm = ({
  newName,
  newPhone,
  handleNameChange,
  handlePhoneChange,
  addPerson,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Phone: <input value={newPhone} onChange={handlePhoneChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};


const Persons = ({ filteredPersons }) => {
  return (
    <ul>
      {filteredPersons.map((person, index) => (
        <li key={index}>
          {person.name} {person.phone}
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-1234567' },
    { name: 'Jane Zhang', phone: '040-4620647' },
    { name: 'Milia', phone: '040-3473194' }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already in the phonebook.`);
      return;
    }

    const newPerson = { name: newName, phone: newPhone };
    setPersons([...persons, newPerson]);

    setNewName('');
    setNewPhone('');
  };

  // Filter the list of people based on the search term
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} />
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
