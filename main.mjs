import Express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import 'express-async-errors'

import * as http from 'http'

const app = Express()

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

app.get('/', async (req, res) => {
    res.render('index')
})

http.createServer(app).listen(3000, () => {
    console.log('http listen on port 3000')
})