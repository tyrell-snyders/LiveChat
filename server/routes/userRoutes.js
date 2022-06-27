const { register, login, setAvatar, getAllUsers, getUserAvatar } = require('../controllers/userController')

const router = require('express').Router()

router.post('/register', register) //posting the data retrieved from the register to the database
router.post('/login', login) //posting the data retrieved from the login to the database
router.post('/setAvatar/:id', setAvatar) //posting the aatar to its respective user
router.get('/allusers/:id', getAllUsers) //gets all users from the db
router.get('/getUserAvatar/:id', getUserAvatar) //gets a user's avatar from the db

module.exports = router;