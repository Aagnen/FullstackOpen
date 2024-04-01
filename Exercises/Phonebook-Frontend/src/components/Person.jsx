const Person = ({name, number, deleteHim}) => (
    <li>
        {name} {number}
        <button onClick={deleteHim}>delete</button>
    </li>
)

export default Person