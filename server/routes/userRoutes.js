const { register, login, setAvatar } = require('../controllers/userController')

const router = require('express').Router()

router.post('/register', register) //posting the data retrieved from the register to the database
router.post('/login', login) //posting the data retrieved from the login to the database
router.post('/setAvatar/:id', setAvatar)


module.exports = router;