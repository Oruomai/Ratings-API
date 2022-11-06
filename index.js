import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import {MongoClient} from 'mongodb'

const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const database = client.db('Database')
const MLOutputAVG = database.collection('MLOutputAVG')

const PORT = process.env.PORT

client.connect()
console.log('connected to mongodb')

const app = express()
app.use(cors())
app.use(express.json())

app.listen(PORT, () => console.log('api running'))

app.get('/', async (req, res) => {
    const Ratings = await MLOutputAVG.find().toArray()
    res.json(Ratings)
})