const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.static('build'))
app.use(cors())
app.use(express.json());

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)

var morgan = require('morgan');
// 使用预定义的格式字符串
app.use(morgan('tiny'));
// 使用预定义标记的格式字符串
morgan(':method :url :status - :response-time ms :res[content-length]');

let db = require('./db');
let phonebook = db.phonebook;

// define the first route
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(phonebook);
})

app.get('/api/info', (req, res) => {
    res.send(`<h3>Phonebook has info for ${phonebook.length} people.</h3>
                \n
               <h3>${new Date()}</h3>`);
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = phonebook.find(person => person.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).end('Current person is not exist');
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    phonebook = phonebook.filter(person => person.id !== id);

    res.status(204).end();
})

const generateId = () => {
    const maxId = phonebook.length > 0
        ? Math.random().toString(36).substr(2)
        : 0
    return Number(maxId)
}

const checkError = (body, res) => {
    console.log(body);
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    }
    const exitsName = phonebook.find(phone => phone.name === body.name);
    if (exitsName) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    return null;
}

app.post('/api/persons', (req, res) => {
    const check = checkError(req.body, res);
    if (check) {
        return check;
    }

    const body = req.body

    const phone = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    phonebook = phonebook.concat(phone);

    res.json(phone)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
