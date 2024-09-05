const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const userRoutes = require('./routes/users')

app.use(express.json())

app.use('/user', userRoutes)

if (process.env.PORT != "test") {
    app.listen(port, () => console.log(`server running on port ${port}`))
}

module.exports = app