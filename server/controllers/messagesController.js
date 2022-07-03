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

}