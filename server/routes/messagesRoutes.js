const { addMsg, getAllMsg } = require('../controllers/messagesController')

const router = require('express').Router()

router.post('/addmsg/', addMsg) //posting the message that was sent
router.get('/getmsg/', getAllMsg) //getting all messages sent from other users

module.exports = router