const User = require('../models/index').User
const bcrypt = require('bcrypt')
const generateToken = require("../middleware/auth").generateToken

exports.register = async (req, res) => {
    const { username, email, password } = req.body

    await User.findOne({ where: { email: email } })
    .then(user => {
        if (user) {
            return res.status(400).send({ message: "Email Already Exist" })
        }

        return User.create({ username, email, password })
        .then(user => {
            res.status(201).send({ 
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt
                },
            })
        })
        .catch(e => {
            console.log(e);
            res.status(403).send({ message: "FAILED TO REGISTER", error: e.message })
        })
    })
    .catch(e => {
        console.log(e);
        res.status(503).send({ message: "INTERNAL SERVER ERROR", error: e.message })
    }) 
}

exports.login = async (req, res) => {
    const body = req.body;
    const username = body.username
    const password = body.password

    return User.findOne({
        where: { username: username }
    })
    .then(user => {
        if (!user) {
            return res.status(401).send({
                message: "username not found"
            })
        }
        const passwordValid = bcrypt.compareSync(password, user.password)
        if (!passwordValid) {
            return res.status(403).send({
                message: "password and username not match"
            })
        }
        const data = {
            id: user.id,
            email: user.email,
            username: user.username,
        }
        const token = generateToken(data)
        res.status(200).send({
            token: token
        })
    })
    .catch(e => {
        console.log(e);
        res.status(503).send({
            message: "INTERNAL SERVER ERROR",
            error: e.message
        })
    })
}
