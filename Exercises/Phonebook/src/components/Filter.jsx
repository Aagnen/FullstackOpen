const Filter = ({ query, setQuery }) => (
    <div>
        <h3>Find</h3>
        <input value={query} onChange={e => setQuery(e.target.value)}/>
    </div>
)

export default Filter