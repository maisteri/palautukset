const Course = ({courses}) => {
  return (
    courses.map( course =>
      <div key={course.id}>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  )
}

const Content = ({parts}) => {
  return (
    parts.map(part => 
      <Part key={part.id} part={part.name} exercise={part.exercises} />
      )
  )
}

const Header = ({course}) => <h1>{course.name}</h1>;
const Part = ({part, exercise}) => <p>{part} {exercise}</p>;
const Total = ({parts}) => {
  const sum = parts.reduce((total, part) => total + part.exercises, 0)
  return (
    <b>total of {sum} exercises</b>
  )
}

export default Course;