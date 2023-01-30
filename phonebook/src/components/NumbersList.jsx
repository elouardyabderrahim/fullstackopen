const NumbersList = ({ searchPeron, onRemove }) => {
  return (
    <>
      <h2>Numbers</h2>
      {searchPeron.map((per) => (
        <div key={per.id}>
          {per.name} <strong>number</strong> {per.number}
          <button onClick={() => onRemove(per.id)}> delete </button>
        </div>
      ))}
    </>
  );
};
export default NumbersList;
