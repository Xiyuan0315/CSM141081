const Part = (props) =>{
  return(
    <div>
    <p>
      {props.part} {props.exercise}
    </p>
    </div>
  ) 
}
const Header = (props) =>{
  return(
    <div>
    <h1>{props.course}</h1>
    </div>
  )
}
const Content = (props) =>{

  return(
    <div>
      <Part part = {props.parts[0].name} exercise = {props.parts[0].exercises} />
      <Part part = {props.parts[1].name} exercise = {props.parts[1].exercises} />
      <Part part = {props.parts[2].name} exercise = {props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) =>{
  return(
    <div>
      <p>Number of exercises {props.exercise1 + props.exercise2 + props.exercise3}</p>
    </div>
  )
}

const App = () =>{
  const course = {
    name: 'Half Stack application development',
    parts : [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}

  return (
    <div>
      <Header course = {course.name} />
      <Content parts = {course.parts}/ >
      <Total exercise1 = {course.parts[0].exercises} exercise2 = {course.parts[1].exercises} exercise3 = {course.parts[2].exercises} />
    </div>
  )
};

export default App