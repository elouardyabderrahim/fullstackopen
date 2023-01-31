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
    // get all
    phonebookService.getAll().then((response) => {
      console.log("🚀 ~ file: Form.jsx:15 ~ useEffect ~ response", response);
      return setPersons(response);
    });
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

  // adding New Person
  const addingNewPeron = () => {
    const obj = { name: newName, number: newNumber };

    phonebookService.add(obj).then((addedPerson) => {
      // added to the person array
      setPersons(persons.concat(addedPerson));
      console.log("added method Form", addedPerson);
      setNewName("");
      setNewNumber("");
    });
  };

  const verifyOrAdd = (event) => {
    event.preventDefault();
    const exist = verifyIfExistInList(newName);
    if (exist) {
      if (
        window.confirm(
          `${newName} already exist in contacts are you sure you want to replace this number with the new one ?`
        )
      ) {
        update(newName);
      }
    } else {
      addingNewPeron();
    }
  };
  // remove a person from the list
  const remove = (id) => {
    if (window.confirm("are you sure you want to delete ?")) {
      phonebookService.remove(id).then(() => {
        setPersons((prev) => prev.filter((p) => p.id !== id));
      });
    }
  };

  /*
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

   notesService.update(id, changedNote).then((updatedNote) => {
      // if n.id!==id is true take the same note and add it the the new array else add the updated note
      setNotes(notes.map((n) => (n.id !== id ? n : updatedNote)));
    });
  
  */
  // update
  const update = (newName) => {
    const updatedPerson = persons.find((p) => p.name == newName);
    console.log("updated person", updatedPerson);
    const personUpdatedObject = {
      ...updatedPerson,
      number: newNumber,
    };
    console.log(
      "🚀 ~ file: Form.jsx:97 ~ update ~ personUpdatedObject",
      personUpdatedObject
    );

    phonebookService
      .update(updatedPerson.id, personUpdatedObject)
      .then((response) => {
        console.log("🚀 ~ file: Form.jsx:103 ~ .then ~ response", response);

        setPersons((previousState) => {
          const tempPersons = previousState.map((p) =>
            p.name !== newName ? p : response
          );
          return tempPersons;
        });
        console.log("after map inside update", persons);
      });
  };

  return (
    <div>
      <form onSubmit={verifyOrAdd}>
        <div>
          <Filter value={searchedName} onchange={onchangeHandler} />

          <br></br>
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
