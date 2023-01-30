import { useEffect, useState } from "react";
import phonebookService from "../service/phonebookService";
import Filter from "./Filter";
import InputField from "./InputField";
import NumbersList from "./NumbersList";

const Form = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchedName, setSearchedName] = useState("");
  useEffect(() => {
    // axios.get(" http://localhost:3001/persons").then((response) => {
    //   console.log(response.data);
    //   setPersons(response.data);
    // });

    // get all
    phonebookService.getAll().then((response) => setPersons(response));
  }, []);
  const onchangeHandler = (event) => {
    event.preventDefault();
    setSearchedName(event.target.value);
  };
  // search person
  const searchPeron = persons.filter((per) =>
    per.name.toLowerCase().includes(searchedName)
  );
  // handler functions
  const handlingNameOnChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handlingNumberOnChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  // verifying
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
    phonebookService.add(obj).then((addedpersone) => {
      // added to the person array
      setPersons(persons.concat(addedpersone));
      console.log("added method Form", addedpersone);
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
  const remove = (id) => {
    if (window.confirm("are you sure you want to delete ?")) {
      phonebookService.remove(id).then(() => {
        setPersons((prev) => prev.filter((p) => p.id !== id));
      });
    }
  };
  // update
  const update=(id)=>{
    phonebookService.update();
    
      }

  return (
    <div>
      <form onSubmit={verifyOrAdd}>
        <div>
          <Filter value={searchedName} onchange={onchangeHandler} />
          <InputField
            label="Name:"
            value={newName}
            onchange={handlingNameOnChange}
          />
          <InputField
            label="Number:"
            value={newNumber}
            onchange={handlingNumberOnChange}
          />
        </div>
        <button type="submit"> Add </button>
      </form>
      <NumbersList searchPeron={searchPeron} onRemove={remove} />
    </div>
  );
};
export default Form;
