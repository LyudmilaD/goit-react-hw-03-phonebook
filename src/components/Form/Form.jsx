import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import styles from './Form.module.css';

export class Form extends Component {
  state = {
    name: '',
    number: '',
  };
  static propTypes = {
    onSubmitData: PropTypes.func.isRequired,
  };

  handleChange = element => {
    const { name, value } = element.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = element => {
    element.preventDefault();
    const { name, number } = this.state;
    const { onSubmitData } = this.props;

    const data = {
      id: nanoid(),
      name,
      number,
    };
    onSubmitData(data);
    this.inputClean();
  };
  inputClean = () => {
    this.setState({ name: '', number: '' });
  };
  render() {
    const { name, number } = this.state;
    return (
      <div className={styles.form}>
        <form onSubmit={this.handleSubmit}>
          <label className={styles.formlabel}>
            Name
            <input
              className={styles.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={this.handleChange}
            />
          </label>
          <label className={styles.formLabel}>
            Number
            <input
              className={styles.input}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit" className={styles.button}>
            Add contact
          </button>
        </form>
      </div>
    );
  }
}
export default Form;
