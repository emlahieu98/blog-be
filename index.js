require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const connect = require('./config/db')
const postRoute = require('./routers/post')
const commonRoute = require('./routers/common')
const blockchainRoute = require('./routers/blockchain')
const bodyParser = require('body-parser')
const app = express()

app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(
    cors({
        origin: '*',
    })
)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//connect to database
connect()

//router
//app.use('/api')
app.use('/api/v1/posts', postRoute)
app.use('/api/v1/common', commonRoute)
app.use('/api/v1/blockchain', blockchainRoute)

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    // render the error page
    res.status(err.status || 500)
    res.send(err.message)
})
app.get('/', (req, res) => {
    res.send('Back End API Funny Code')
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Connect success with port ${PORT}`)
})
