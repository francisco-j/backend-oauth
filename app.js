const express = require('express')
const cookieSession = require('cookie-session')
const passport = require('passport')

const { authRoutes } = require('./routes')



const app = express()
app.use( cookieSession({
    maxAge: 2/*hours*/*60*60*1000,
    keys: [process.env.COOKIE_KEY]
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRoutes)


const { mongoose } = require('./config')
const User = mongoose.model('users')
passport.serializeUser((user, done) => {
    console.log('serializeUser() id:', user.id ? user.id : " not given")
    done(null, user.id)
})
passport.deserializeUser((id, done) => {
    console.log('deserializeUser() id:', id ? id : " not given")
    User.findById(id)
        .then(user => {
            console.log('deserializeUser() user:', user ? user : " not given")
            done(null, user)
        })
})

module.exports = app
