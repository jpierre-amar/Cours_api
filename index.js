const express = require('express')
const app = express()
const port = 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/user', (req, res) => {
    console.log(req.body)
    if(req.body.email.length === 0) {
        console.log('Email is required')
        return res.status(204).send('Email is required')
    }
    res.send('Ok message recu par l\'api')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })