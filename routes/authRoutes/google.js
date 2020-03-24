// TODO: refactor Pasport out of here

const { Router } = require('express')
const Passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const { mongoose } = require('../../config')
const User = mongoose.model('users')

Passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_OAUTH,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id })
            .then( existingUser=>{
                console.log(existingUser ? 'existingUser' : 'newUser');
                
                if(existingUser){
                    done(null, existingUser)
                }
                else
                {
                    new User({ googleId: profile.id })
                    .save()
                    .then(newUser=> done(null, newUser))
                }
            })
    }
))

const googleRouter = Router()
googleRouter.get('/', Passport.authenticate(
    'google',
    {
        scope: ['profile', 'email']
    }
))
googleRouter.get('/callback', Passport.authenticate('google'))

module.exports = googleRouter
