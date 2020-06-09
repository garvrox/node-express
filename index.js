const debug = require('debug')('app:startup')
const config = require('config')
const morgan = require('morgan')
const helmet = require('helmet')
const mongoose = require('mongoose')
const express = require('express')

// Routes
const home = require('./routes/home')
const genres = require('./routes/genres')

// Main App
const app = express()

// Db Connection
mongoose.connect('mongodb://localhost/netflix')
    .then((resp) => console.log('Mongo Db connected...'))
    .catch((err) => console.log('Unable to connect Mongo Db...')) 

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())

if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    debug('Morgan enabled...')
}

// Routes
app.use('/api/genres', genres)
app.use('/', home)

const port = process.env.port || 6000
app.listen(port, () => console.log(`Server is listening to port...${port}`))