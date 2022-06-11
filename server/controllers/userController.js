const User = require('../model/userModel')
const bcrypt = require('bcrypt')

module.exports.register = async(req, res, next) => {
    try {
        const { username, email, password } = req.body
            //username
        const userNameCheck = await User.findOne({ username })
        if (userNameCheck)
            return res.status(400).json({ msg: 'Username already exists', status: false })

        //email
        const emailCheck = await User.findOne({ email })
        if (emailCheck)
            res.status(400).json({ msg: 'Email already exists', status: false })

        //password
        const hashedPass = await bcrypt.hash(password, 10)
        const user = await User.create({
            email,
            username,
            password: hashedPass,
        })

        delete username.password
        return res.json({ status: true, user })
    } catch (error) {
        next(error)
    }
}

module.exports.login = async(req, res, next) => {
    try {
        const { username, password } = req.body

        //username
        const user = await User.findOne({ username })
        if (!user)
            return res.status(400).json({ msg: 'Problem with username or password', status: false })

        //password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
            return res.status(400).json({ msg: 'Problem with username or password', status: false })

        delete username.password
        return res.json({ status: true })
    } catch (error) {
        next(error)
    }
}