const Person = ({name, phone, deleteHim}) => (
    <li>
        {name} {phone}
        <button onClick={deleteHim}>delete</button>
    </li>
)

export default Person