const App = () => {
  
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  
  const Content = (props) => {
    return (
      <div>
        <Part part={props.part1.name} exercise={props.part1.exercises} />
        <Part part={props.part2.name} exercise={props.part2.exercises} />
        <Part part={props.part3.name} exercise={props.part3.exercises} /> 
      </div>
    )
  }

  const Header = ({course}) => <h1>{course}</h1>;
  const Part = ({part, exercise}) => <p>{part} {exercise}</p>;
  const Total = (props) => <p>Number of exercises {props.sum}</p>;

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total sum={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}
  
  export default App