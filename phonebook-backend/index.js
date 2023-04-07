const express = require("express");
app = express();
// built-in middeleware function in express. json-parser
app.use(express.json());

// npm install --save-dev nodemon
// node_modules/.bin/nodemon index.js
//  after adding dev i scripts in package.json npm run dev
const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  response.send(`<p>PhoneBook has info for ${persons.length} people</p>
    <p>${Date()}<p>
  `);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.statusMessage = `no person with id ${id} is found`;
    response.status(400).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    persons.filter((person) => person.id !== id);
    response.statusMessage = `person with ${JSON.stringify(
      person
    )} deleted successfully`;
    response.status(204).end();
  } else {
    response.statusMessage = `no person with id ${id} is found to be deleted`;
    response.status(400).end();
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  function generatedId() {
    return Math.ceil(Math.random() * 200000000000);
  }
  console.log(JSON.stringify(body.number), JSON.stringify(body.name));
  if (!body.name) {
    return response.status(400).json({
      error: "name is missing",
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: "number is missing",
    });
  } else if (persons.find((p) => p.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }
  const person = {
    id: generatedId(),
    name: body.name,
    number: body.number,
  };
  persons.concat(person);
  response.json(person);
});
