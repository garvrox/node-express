const Joi = require('joi');

// Step 1: Include Mongoose
const mongoose = require('mongoose')

// Step 2: Create collection schema
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    }
})

// Step 3: Create or Map modal
const Genre = mongoose.model('Genre', genreSchema)

const validator = (data) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(10).required()
    })
    return Joi.validate(data, schema);
}

exports.Genre = Genre
exports.validate = validator