import React from 'react';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import styles from './Form/Form.module.css';
export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  submitHandler = data => {
    const flag = this.state.contacts.find(
      contact => contact.name === data.name
    );
    this.setState(prevState => {
      return flag
        ? alert(`${data.name} is alredy in contacts`)
        : { contacts: [data, ...prevState.contacts] };
    });
  };
  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };
  deleteContacts = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  componentDidMount() {
    const contacts = localStorage.getItem(`contacts`);
    const contactsParse = JSON.parse(contacts);
    if (contactsParse) {
      this.setState({ contacts: contactsParse });
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(`contacts`, JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return (
      <div className={styles.wrap}>
        <h2>Phonebook</h2>
        <Form onSubmit={this.submitHandler} contacts={contacts} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContacts}
          deleteContacts={this.deleteContacts}
        />
      </div>
    );
  }
}
