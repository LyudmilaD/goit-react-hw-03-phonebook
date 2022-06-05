import PropTypes from 'prop-types';
function Contact({ name, number, onClick, id }) {
  return (
    <span>
      {name}: {number}
      {''}
      <button onClick={() => onClick(id)}>Delete</button>{' '}
    </span>
  );
}
export default Contact;
Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
