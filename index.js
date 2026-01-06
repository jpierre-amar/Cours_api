import { Client } from 'pg'
import express from 'express'
const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
})

const app = express()
const port = 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World')
})
app.get('/users', async (req, res) => {
    await client.connect()
    const result = await client.query('SELECT * FROM "user"')
    await client.end()
    console.log(result.rows)
    res.send(result.rows)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })