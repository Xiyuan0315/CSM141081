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
      <Part part = {props.parts[0].name} exercise = {props.parts[0].exercise} />
      <Part part = {props.parts[1].name} exercise = {props.parts[1].exercise} />
      <Part part = {props.parts[2].name} exercise = {props.parts[2].exercise} />
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
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercise: 10
    },
    {
      name: 'Using props to pass data',
      exercise: 7
    },
    {
      name: 'State of a component',
      exercise: 14
    }
  ]

  return (
    <div>
      <Header course = {course} />
      <Content parts = {parts}/ >
      <Total exercise1 = {parts[0].exercise} exercise2 = {parts[1].exercise} exercise3 = {parts[2].exercise} />
    </div>
  )
};

export default App