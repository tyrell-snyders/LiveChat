const messageModel = require('../model/messageModel')
module.exports.addMsg = async(req, res, next) => {
    try {
        const { from, to, message } = req.body
        const data = await messageModel.create({
            message: { text: message },
            users: [from, to],
            sender: from
        })
        if (data) return res.json({ msg: "Message send successfully." })
        else return res.json({ msg: "Failed to send message" })
    } catch (ex) {
        next(ex)

    }
}

module.exports.getAllMsg = async(req, res, next) => {
    try {
        const { from, to } = req.body
        const messages = await messageModel.find({ //gets all messages from the user
            users: {
                $all: [
                    from,
                    to
                ]
            }
        }).sort({ updatedAt: 1 })

        const showMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from, //converts the user id to string and compares it to the id string that is stored in from
                message: msg.message.text,
            }
        })
        res.json(showMessages)
    } catch (ex) {
        next(ex)
    }
}