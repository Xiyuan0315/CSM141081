import Course from './components/Course'
const Heading = ({text}) => {return <h1>{text}</h1>}
const Total = ({part}) =>{
  const result = part.reduce( ( sum, {exercises} ) => sum + exercises , 0)
  return(
    <div>
      <b>total of {result} exercises</b>
    </div>
  )
}
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      <Heading text = {courses[0].name} />
      {courses[0].parts.map(part => 
      <Course key = {part.id} part = {part} />
      )}
      <Total part = {courses[0].parts} />

      <Heading text = {courses[1].name} />
      {courses[1].parts.map(part => 
      <Course key = {part.id} part = {part} />
      )}
      <Total part = {courses[1].parts} />


    </div>)
}
export default App