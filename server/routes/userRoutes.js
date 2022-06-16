const { register, login, setAvatar, getAllUsers } = require('../controllers/userController')

const router = require('express').Router()

router.post('/register', register) //posting the data retrieved from the register to the database
router.post('/login', login) //posting the data retrieved from the login to the database
router.post('/setAvatar/:id', setAvatar)
router.get('/allusers/:id', getAllUsers)


module.exports = router;