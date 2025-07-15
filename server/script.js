import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('Hello this is main page')
})
app.get('/login', (req, res) => {

})
app.get('/signup', (req, res) => {

})
app.get('/logout', (req, res) => {

})

