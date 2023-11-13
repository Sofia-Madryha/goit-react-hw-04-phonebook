import { useEffect, useState } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';

import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      return JSON.parse(savedContacts);
    }
    return [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [filter, contacts]);

  const addForm = newForm => {
    const nameExists = contacts.some(
      contact => contact.name.toLowerCase() === newForm.name.toLowerCase()
    );
    if (nameExists) {
      alert(`${newForm.name}' is already in contacts.`);
    } else {
      setContacts(prevState => [...prevState, { id: nanoid(), ...newForm }]);
    }
  };

  const filterContacts = newName => {
    setFilter(newName);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const visibleContacts = contacts.filter(contact => {
    const nameFilter = filter.toLowerCase();
    return contact.name.toLowerCase().includes(nameFilter);
  });
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addForm} />

      <h2>Contacts</h2>
      <p>Find contacts by name</p>
      <Filter name={filter} filterContacts={filterContacts} />
      <ContactList contacts={visibleContacts} onDelete={deleteContact} />
    </div>
  );
};
