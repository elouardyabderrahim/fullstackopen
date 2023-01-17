function Course({ course, parts, exercises, total }) {
  return (
    <div>
      <Header course={course} />
      <Content
        parts={parts}
        // exercises1={parts.map((p) => p.exercises)}
      />

      <Total total={total} />
    </div>
  );
}
export default Course;

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <ul>
      {props.parts.map((part, idx) => (
        <Part part={part.name} exercises={part.exercises} key={idx} />
      ))}
    </ul>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.total}</p>;
};

const Part = (props) => {
  return (
    <li>
      {props.part} {props.exercises}
    </li>
  );
};
