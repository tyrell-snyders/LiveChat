const mongoose = require('mongoose')

const msgSchema = new Schema({
    message: {
        text: {
            type: String,
            required: true
        },
    },
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, {
    timeStamps: true,
})

module.exports = mongoose.model('Messages', msgSchema)