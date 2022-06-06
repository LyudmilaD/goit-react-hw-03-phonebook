import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../Form/Form.module.css';

export class Contact extends Component {
  static defaultProps = {
    id: '',
    name: '',
    number: '',
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    handleRemove: PropTypes.func.isRequired,
  };

  render() {
    const { id, name, number, handleRemove } = this.props;
    return (
      <li id={id} className={styles.item}>
        {name}: {number}
        <button className={styles.button} onClick={() => handleRemove(id)}>
          Delete
        </button>
      </li>
    );
  }
}

export default Contact;
