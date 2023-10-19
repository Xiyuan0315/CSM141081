const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const Person = require('./models/person')
const PORT = process.env.PORT

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('dev'))

// function getRandomInt(max) {
//   return Math.floor(Math.random() * max);
// }
morgan.token('postData', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return '-'
})
// let persons = [
//     { "id": 1,
//       "name": "Arto Hellas",
//       "number": "040-123456"
//     },
//     {"id": 2,
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523"
//     },
//     {"id": 3,
//       "name": "Dan Abramov",
//       "number": "12-43-234345"
//     },
//     {"id": 4,
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122"
//     },

//     { "id": 5,
//       "name": "xiyuan",
//       "number": "0404620674"
//     }
// ]
app.get('/', (response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (response) => {
  const requestTime = new Date()

  Person.countDocuments({}, (err, count) => {
    if (err) {
      console.error('Error counting documents:', err)
      response.status(500).send('Server error')
      return
    }

    const infoMessage = `
          <p>Phonebook has info for ${count} people</p>
          <p>${requestTime}</p>
      `

    response.send(infoMessage)
  })
})

app.get('/api/persons/:id', (req, res,next) => {
  // const id = Number(req.params.id);
  // const person = persons.find(entry => entry.id === id);


  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).send('Not Found')
    }
  })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  // console.log(error)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

app.delete('/api/persons/:id', (request, response,next) => {
  // const id = Number(request.params.id)
  // persons = persons.filter(note => note.id !== id)

  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))

  // response.status(204).end()
})

app.post('/api/persons', (request, response,next) => {
  // Non-Unique Name
  // if (persons.some(entry => entry.name === person.name)) {
  //   return response.status(400).json({ error: 'name must be unique' });
  // }
  // Missing data(number/name)
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name and number are required.' })
  }
  const person = new Person({
    name: body.name,
    number: body.number
  })
  // person.id = getRandomInt(9000)
  // console.log(person)
  // persons = persons.concat(person)

  // response.json(person)
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
  // Person.findByIdAndUpdate(request.params.id, person, { new: true })
  // .then(updatedPerson => {
  //   response.json(updatedPerson)
  // })
  // .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  // if name or number is not provided, send a 400 status code
  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name and number are required.' })
  }

  const person = {
    name: body.name,
    number: body.number
  }

  // { new: true } ensures that the updated document is returned
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson)
      } else {
      // if no person was found for the given id, send a 404 status code
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
