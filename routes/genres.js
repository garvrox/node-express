const express = require('express')
const router = express.Router()
const { Genre, validate } = require('../Model/genres')

// API: Get all records
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name')
    res.send(JSON.stringify(genres))
})

// API: Create a new record
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    let genre = new Genre({name: req.body.name})
        genre = await genre.save()
    res.send(genre)
})

// API: Update a existing record
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!genre) return res.status(404).send('Genre is not available.')
    
    res.send(genre)
})

// API: Delete a existing record
router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id)
    if (!genre) return res.status(404).send('Genre is not available.')

    res.send(genre)
})

// API: GET Selected Record
router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id)
    if (!genre) return res.status(404).send('Genre is not available.')
    res.send(genre)
})

module.exports = router