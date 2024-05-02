import PropTypes from 'prop-types';

const Person = ({name, number, deleteHim}) => (
    <li>
        {name} {number}
        <button onClick={deleteHim}>delete</button>
    </li>
)
Person.propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    deleteHim: PropTypes.func.isRequired,
  };

export default Person