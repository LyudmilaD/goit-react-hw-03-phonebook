import React, { Component } from 'react';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import styles from './Form/Form.module.css';
import Notiflix from 'notiflix';

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
  componentDidMount() {
    const contacts = localStorage.getItem(`Contacts`);
    const contactsParse = JSON.parse(contacts);
    if (contactsParse) {
      this.setState({ contacts: contactsParse });
    }
  }
  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem(`Contacts`, JSON.stringify(this.state.contacts));
    }
  }
  addContacts = ({ id, name, number }) => {
    const { contacts } = this.state;
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    )
      return Notiflix.Notify.failure(`${name} is already in phonebook`);
    this.setState(prevState => {
      return { contacts: [...prevState.contacts, { id, name, number }] };
    });
  };
  getContacts = () => {
    const { filter, contacts } = this.state;
    const filterNormalize = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterNormalize)
    );
  };

  deleteContacts = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  changeFilter = element => {
    this.setState({ filter: element.currentTarget.value });
  };

  render() {
    const { filter } = this.state;
    return (
      <div className={styles.wrap}>
        <h1>Phonebook</h1>
        <Form onSubmitData={this.addContacts} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={this.getContacts()}
          handleRemove={this.deleteContacts}
        />
      </div>
    );
  }
}

export default App;
