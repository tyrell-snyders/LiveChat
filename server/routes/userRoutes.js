const { register } = require('../controllers/userController')

const router = require('express').Router()

router.post('/register', register) //posting the data retrieved from the register to the database

module.exports = router