const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true})

const { UserSchema } = require('../schemas')

// models
mongoose.model('users', UserSchema)

module.exports = mongoose
