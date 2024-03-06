const express = require('express')
const dotenv = require('dotenv')
const connectDatabase = require('./config/dataBase')
const cors = require('cors')
const app = express()
dotenv.config()
connectDatabase()

app.use(cors())
app.use(express.json());

// router imports
const authRouters = require('./routes/authRouter');
const todoListRouters = require('./routes/todoListRouter');


app.use('/auth/v1', authRouters)
app.use('/todolist/v1', todoListRouters)

app.all('*', (req, res, next) => {
    res.status(404).json({
        status: "Fail",
        message: `Can't find ${req.originalUrl} on this server!`
    })

    const err = new Error(`Can't find ${req.originalUrl} on this server!`)
    err.status = 'Fail',
        err.statusCode = 404

    next(err);

    // next(new appError(`Can't find ${req.originalUrl} on this server!`))
})

const PORT = process.env.PORT || 2004
app.listen(PORT, () => {
    console.log(`Server is up and running in the port: ${PORT}`);
})
