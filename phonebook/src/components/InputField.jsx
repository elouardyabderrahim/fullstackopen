const InputField = ({ label, value, onchange }) => {
  
  
    return (
    <span>
      {label}
      <input required value={value} onChange={onchange} />
    </span>
  );
};
export default InputField;
