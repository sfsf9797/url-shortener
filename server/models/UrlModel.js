const mongoose = require('mongoose')

// instantiate the schema
const URLSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
})

//  export the model
module.exports = mongoose.model('Url', URLSchema)
