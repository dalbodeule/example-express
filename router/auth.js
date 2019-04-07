const Express = require('express')
const users = require('../user.json')

const app = Express.Router()

app.get('/login', async(req, res) => {
    res.render('auth/login', {
        session: req.session
    })
})

app.post('/login', async(req, res) => {
    const { id, pw } = req.body

    if (users.indexOf({ id, pw })) {
        req.session.userId = id
        req.session.isLogin = true

        res.redirect(302, '/')
    } else {
        res.redirect(302, '/auth/login')
    }
})

app.get('/logout', async(req, res) => {
    req.session.destroy()
    res.redirect(302, '/')
})

module.exports = app