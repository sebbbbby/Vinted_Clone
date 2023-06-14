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

app.get('/api/likedItems', (req, res) => {
    // const user_email = req.params.user_email
    sql.query('SELECT * FROM liked_items')
        .then((results) => {
            res.send(results.rows)
            // console.log(results.rows)
        })
        .catch((error) => {
            console.error(error)
            res.status(500).send('Internal Server Error')
        })
})
//coundnt get this to work with react, i have it working server
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
app.get('/api/likeditems/:user_id', (req, res) => {
    const newUserid = req.params.user_id
    // const newUserid = userInputObj['user_id']
    console.log(newUserid)
    sql.query(`SELECT * FROM liked_items WHERE user_id = $1 `, [newUserid])
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
app.post('/api/likeditem', (req, res) => {
    //this will be the main req.body with all the items/description of the item to be added
    const likedItemObj = req.body
    //this is where i assign the items to the specific user
    const clothesId = likedItemObj['clothes_id']
    const clothesTitle = likedItemObj['title']
    const clothesPrice = likedItemObj['price']
    const clothesCat = likedItemObj['category']['name']
    const clothesDescription = likedItemObj['description']
    const clothesImg = likedItemObj['category']['image']
    const userIdNum = likedItemObj['user_id']
    sql.query(
        `INSERT INTO liked_items (clothes_id, title, price, category, description, image, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
            clothesId,
            clothesTitle,
            clothesPrice,
            clothesCat,
            clothesDescription,
            clothesImg,
            userIdNum,
        ],
        (error, result) => {
            if (error) {
                console.error(error)
                res.status(500).send('Internal server error.')
                return
            }
            console.log(result.rows[0], 'this')
            const likedItems = result.rows[0]
            console.log(likedItems, 'this??')
            res.status(200).json(likedItems)
        }
    )
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
