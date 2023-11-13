import { Component } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';

import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount(){
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts!==null) {
      this.setState({
        contacts: JSON.parse(savedContacts)
      })
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.contacts !== this.state.contacts){
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
      
  }}

  addForm = newForm => {
    const { contacts } = this.state;
    const nameExists = contacts.some(
      (contact) => contact.name.toLowerCase() === newForm.name.toLowerCase()
    );
    if (nameExists) {
      alert(`${newForm.name}' is already in contacts.`);
    } else {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, {id: nanoid(),  ...newForm }],
    }));
    }
  };

  filterContacts = newName => {
    this.setState({
      filter: newName,
    });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = contacts.filter(contact => {
      const nameFilter = filter.toLowerCase();
      return contact.name.toLowerCase().includes(nameFilter);
    });
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAdd={this.addForm} />

        <h2>Contacts</h2>
        <p>Find contacts by name</p>
        <Filter name={filter} filterContacts={this.filterContacts} />
        <ContactList contacts={visibleContacts} onDelete={this.deleteContact} />
      </div>
    );
  }
}
