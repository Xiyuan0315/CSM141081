import { useState } from 'react'


// exercise 1.12-1.14
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const Button = ({handleClick, text}) =>  (<button onClick={handleClick}>{text}</button>)

const App = () => {
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const zeros = new Array(anecdotes.length).fill(0)
  const [points, setPoints] = useState(zeros)
  const [selected, setSelected] = useState(0)
  const updatePoints = () => {
    const copy = [...points]
    copy[selected] += 1
    console.log('copy',copy)
    setPoints(copy)
  }
  console.log(points, 'points')
  return (
    <div>
      <h1>Anecdots of the day</h1>
      {anecdotes[selected]}
      <br/>
      has {points[selected]} votes
      <br/>
      <Button handleClick={() => setSelected(getRandomInt(anecdotes.length))} text={'next anecdotes'}/>
      <Button handleClick={updatePoints} text = {'vote'} />
      <h1>Anecdots with the most votes</h1> 
      {anecdotes[points.indexOf(Math.max(...points))]} 
      <br/>
      has {Math.max(...points)} votes
    </div>
  )
}

export default App


// exercise 1.6-1.11
// const Header = ({text}) =>{
//   return(
//     <div>
//     <h1>{text}</h1>
//     </div>
//   )
// }
// const Display = ({counter,text}) => {
//   return (
//     <tr>
//     <td>{text}</td> <td> {counter} </td>
//     </tr>
//   )
// }
// const Button = ({handleClick, text}) =>  (<button onClick={handleClick}>{text}</button>)

// const Statistics = ({good, neutral, bad}) => {
//   const all = good + bad + neutral
//   const postive = (good/(good + bad + neutral)).toLocaleString("en", {
//     style: "percent"
//   })
//   const average = (good - bad)/(good + bad + neutral)
//   if (good+neutral+bad > 0) {
//     return(
//       <div>
//         <Display text={'good'} counter={good}  />
//         <Display text={'neutral'} counter={neutral} />
//         <Display text={'bad'} counter={bad} /> 
//         <Display text ={'all'} counter={all} />
//         <Display text ={'average'} counter={average} />
//         <Display text ={'postive'} counter={postive} /> 
//       </div>
//     )
//   } else {return (<p>No feedback given</p>)}
  
// }

// const App = () => {
//   const [good, setGood] = useState(0)
//   const [neutral, setNeutral] = useState(0)
//   const [bad, setBad] = useState(0)

//   const rategood = () => {
//     console.log('good +1', good)
//     setGood(good + 1)
//   }

//   const rateneutral = () => { 
//     console.log('neutral +1', neutral)
//     setNeutral(neutral + 1)
//   }

//   const ratebad = () => {
//     console.log('bad + 1', bad)
//     setBad(bad +1)
//   }

//   return (
//     <div>
//       <Header text='give feedback for xiling' />
//       <Button handleClick={rategood} text="good" />
//       <Button handleClick={rateneutral} text="neutral" />
//       <Button handleClick={ratebad} text="bad" />
//       <Header text='statistics' /> 
//       <Statistics good={good} neutral={neutral} bad={bad} />
//     </div>
//   )
// } 

// export default App

// const App = (props) => {
//   const {counter} = props
//   return (
//     <div>{counter}</div>
//   )
// }
// export default App
// --------------------------------

// exercise 1.1-1.5
// const Part = (props) =>{
//   return(
//     <div>
//     <p>
//       {props.part} {props.exercise}
//     </p>
//     </div>
//   ) 
// }
// const Header = (props) =>{
//   return(
//     <div>
//     <h1>{props.course}</h1>
//     </div>
//   )
// }
// const Content = (props) =>{

//   return(
//     <div>
//       <Part part = {props.parts[0].name} exercise = {props.parts[0].exercises} />
//       <Part part = {props.parts[1].name} exercise = {props.parts[1].exercises} />
//       <Part part = {props.parts[2].name} exercise = {props.parts[2].exercises} />
//     </div>
//   )
// }

// const Total = (props) =>{
//   return(
//     <div>
//       <p>Number of exercises {props.exercise1 + props.exercise2 + props.exercise3}</p>
//     </div>
//   )
// }

// const App = () =>{
//   const course = {
//     name: 'Half Stack application development',
//     parts : [
//     {
//       name: 'Fundamentals of React',
//       exercises: 10
//     },
//     {
//       name: 'Using props to pass data',
//       exercises: 7
//     },
//     {
//       name: 'State of a component',
//       exercises: 14
//     }
//   ]
// }

//   return (
//     <div>
//       <Header course = {course.name} />
//       <Content parts = {course.parts}/ >
//       <Total exercise1 = {course.parts[0].exercises} exercise2 = {course.parts[1].exercises} exercise3 = {course.parts[2].exercises} />
//     </div>
//   )
// };

// export default App