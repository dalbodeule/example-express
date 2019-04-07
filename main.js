const Express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const log4js = require('log4js')
const onFinished = require('on-finished')
require('express-async-errors')

const auth = require('./router/auth')

const http = require('http')

// express generate
const app = Express()
// log4js generate
const logger = log4js.getLogger()
logger.level = 'DEBUG'

// express module initializing
app.set('view engine', 'pug')
app.use(session({
    secret: 'usesecret',
    resave: false,
    saveUninitialized: true
}))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// logger setup
app.use((req, res, next) => {
    onFinished(res, (err, response) => {
        if (err) {
            logger.error(err)

            return
        }

        const { statusCode } = response
        const { protocol, method, ip, originalUrl } = req
        const message = [
            protocol,
            method,
            statusCode,
            ip.replace('::ffff:', ''),
            originalUrl
        ].join(' ')

        logger.info(message)
    })

    next()
})

// router setting
app.get('/', async (req, res) => {
    res.render('index', {
        session: req.session
    })
})

app.use('/auth', auth)

// create web server
http.createServer(app).listen(3000, () => {
    logger.info('http listen on port 3000')
})