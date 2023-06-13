import express from 'express'
// import postgres from 'postgres'
import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config({ path: '../.env' })

const PORT = process.env.PORT
const sql = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
})
console.log(PORT)
const app = express()
app.use(express.json())

app.get('/api/users', (req, res) => {
    // const user_email = req.params.user_email
    sql.query('SELECT * FROM users')
        .then((results) => {
            res.send(results.rows)
            // console.log(results.rows)
        })
        .catch((error) => {
            console.error(error)
            res.status(500).send('Internal Server Error')
        })
})
//coundnt get this to work
app.get('/api/:user_email', (req, res) => {
    const newUserEmail = req.params.user_email
    // const newUserEmail = userInputObj['user_email']
    console.log(newUserEmail)
    sql.query(`SELECT * FROM users WHERE user_email = $1 `, [newUserEmail])
        .then((results) => {
            res.send(results.rows)
            console.log(results.rows)
        })
        .catch((error) => {
            console.error(error)
            res.status(500).send('Internal Server Error')
        })
})
app.post('/api/newuser', (req, res) => {
    const userInputObj = req.body
    console.log(userInputObj)
    const newUserEmail = userInputObj['user_email']
    console.log(newUserEmail, 'it sent')
    sql.query(
        'SELECT * FROM users WHERE user_email = $1',
        [newUserEmail],
        (error, result) => {
            if (error) {
                console.error(error)
                res.status(500).send('Internal server error.')
                return
            }
            // If email already exists send an error
            if (result.rows.length > 0) {
                res.status(400).send('Email already exists.')
                return
            }

            console.log('this is results ' + JSON.stringify(result.rows))
            sql.query(
                'INSERT INTO users (user_email) VALUES ($1)',
                [newUserEmail],
                (error, result) => {
                    if (error) {
                        console.error(error)
                        res.status(500).send('Internal server error.')
                        return
                    }
                    res.status(201).send('User Created!')
                }
            )
        }
    )
})
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
