const mongoose = require("mongoose")

const publisherSchema = new mongoose.Schema({
    name: String,
    headQuater: String
}, {timeseries:true})

module.exports = mongoose.model('Publisher', publisherSchema)