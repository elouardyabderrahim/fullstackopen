const Filter = ({ value, onchange }) => {
  return (
    <span>
      search:
      <input value={value} onChange={onchange} />
    </span>
  );
};
export default Filter;
