import "./App.css";
import Course from "./Course";
const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
  const parts = courses[0].parts.map((item) => item.exercises);
  const initialValue = 0;
  const total = parts.reduce((acc, curr) => acc + curr, initialValue);
  courses.forEach(() => {
    console.log(`${courses.name}`);
    return (
      <Course
        course={courses[0].name}
        parts={courses[0].parts}
        exercises={courses[0].parts.exercises}
        total={total}
      />
    );
  });
  return (
    <Course
      course={courses[0].name}
      parts={courses[0].parts}
      exercises={courses[0].parts.exercises}
      total={total}
    />
  );
};

export default App;
