const { Router } = require('express')
const { googleRouter } = require('./authRoutes')

const router = Router()

router.use('/google', googleRouter)
router.get('/current-user', (req, res)=>{
    const response = req.user || {user:null}
    res.send(response)
})
router.get('/logout', (req, res)=>{
    console.log("logout():", req.logOut ? "present" : "not present")
    req.logOut()
    const response = req.user || {user:null}
    res.send(response)
})

module.exports = router
