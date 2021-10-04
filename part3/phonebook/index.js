const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config()
const Phone = require('./models/phonebook')

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

// var morgan = require('morgan');
// 使用预定义的格式字符串
// app.use(morgan('tiny'));
// 使用预定义标记的格式字符串
// morgan(':method :url :status - :response-time ms :res[content-length]');

// define the first route
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

// get all info
app.get('/api/persons', (req, res) => {
    Phone.find({}).then(notes => {
        res.json(notes)
    })
})

app.get('/api/info', (req, res) => {
    res.send(`<h3>Phonebook has info for ${phonebook.length} people.</h3>
                \n
               <h3>${new Date()}</h3>`);
})

// get info by id
app.get('/api/persons/:id', (req, res) => {
    Phone.findById(req.params.id).then(phone => {
        if (phone) {
            res.json(phone)
        } else {
            res.status(404).end()
        }
    }).catch(res => {
        res.status(404).end('Current person is not exist');
    })
})

// delete
app.delete('/api/persons/:id', (req, res, next) => {
    Phone.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

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

// add
app.post('/api/persons', (req, res, next) => {
    // const check = checkError(req.body, res);
    // if (check) {
    //     return check;
    // }

    const body = req.body

    const phone = new Phone({
        name: body.name,
        number: body.number
    })

    phone.save()
        .then(savedNote => savedNote.toJSON())
        .then(savedAndFormattedNote => {
            res.json(savedAndFormattedNote)
        })
        .catch(error => {
            // this is the way to access the error message
            // console.log('报错啦-----')
            // console.log(error.errors)
            next(error)
        })
    })

// update
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const phone = {
        name: body.name,
        number: body.number,
    }

    Phone.findByIdAndUpdate(request.params.id, phone, { new: true })
        .then(updatedPhone => {
            response.json(updatedPhone)
        })
        .catch(error => next(error))
})

// unknown end-point
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// errorHandler
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

// 这是最后加载的中间件
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
