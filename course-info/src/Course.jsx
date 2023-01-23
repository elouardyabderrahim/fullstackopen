import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

function Course({ course, parts }) {
  const total = parts.reduce((acc, curr) => acc + curr.exercises, 0);

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={total} />
    </div>
  );
}
export default Course;
