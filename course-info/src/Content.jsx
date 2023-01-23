import Part from "./Part";

const Content = (props) => {
  return (
    <ul>
      {props.parts.map((part) => (
        <Part part={part.name} exercises={part.exercises} key={part.id} />
      ))}
    </ul>
  );
};
export default Content;
