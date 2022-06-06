import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../Form/Form.module.css';
import Contact from '../ContactElementList/ContactElementList';

export class ContactList extends Component {
  static defaultProps = {
    contacts: [],
  };
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
    handleRemove: PropTypes.func.isRequired,
  };

  render() {
    const { contacts, handleRemove } = this.props;
    return (
      <div className={styles.wrap}>
        {contacts.length
          ? contacts.map(({ id, name, number }) => (
              <Contact
                key={id}
                id={id}
                name={name}
                number={number}
                handleRemove={handleRemove}
              />
            ))
          : 'No contacts'}
      </div>
    );
  }
}

export default ContactList;
