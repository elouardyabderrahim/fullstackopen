import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchedName, setSearchedName] = useState("");
  useEffect(() => {
    axios.get(" http://localhost:3001/persons").then((response) => {
      console.log(response.data);
      setPersons(response.data);
    });
  }, []);
  const onchangeHandler = (event) => {
    event.preventDefault();
    setSearchedName(event.target.value);
  };
  const searchPeron = persons.filter((per) =>
    per.name.toLowerCase().includes(searchedName)
  );

  const handlingNameOnChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handlingNumberOnChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const verifyIfExistInList = () => {
    console.log("persons", persons);
    const exist = persons.some((per) => per.name === newName);
    console.log("exist", exist);
    return exist;
  };
  const addingNewPeron = () => {
    const obj = { name: newName, number: newNumber };
    /*setPersons(persons.concat(obj));
    console.log(persons);
    setNewName("");
    setNewNumber("");*/
    axios.post("http://localhost:3001/persons", obj).then((response) => {
    // added to the person array 
    setPersons(persons.concat(response.data));
      console.log(response);
      setNewName("");
      setNewNumber("");
    });
  };
  const verifyOrAdd = (event) => {
    event.preventDefault();
    const exist = verifyIfExistInList(newName);
    if (exist) {
      alert(newName);
    } else {
      addingNewPeron();
    }
  };
  return (
    <div>
      <h1>PhoneBook</h1>
      <form onSubmit={verifyOrAdd}>
        <div>
          <span>
            search:
            <input value={searchedName} onChange={onchangeHandler} />
          </span>
          <span>
            name:
            <input required value={newName} onChange={handlingNameOnChange} />
          </span>
          <span>
            number:
            <input
              required
              value={newNumber}
              onChange={handlingNumberOnChange}
            />
          </span>
        </div>
        <button type="submit"> Add </button>
      </form>
      <h2>Numbers</h2>
      {searchPeron.map((per) => (
        <div key={per.name}>
          {per.name} <strong>number</strong> {per.number}
        </div>
      ))}
    </div>
  );
}

export default App;
