const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3000

// Middleware
app.use(bodyParser.json())
app.use(cors())

// Conectar a MongoDB
mongoose.connect('mongodb://root:example@crud_mongodb:27017/mydatabase?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('Connected to MongoDB')
})

// Definir un esquema y modelo de Mongoose
const exampleSchema = new mongoose.Schema({
  name: String,
  value: Number
})

const Example = mongoose.model('Example', exampleSchema, 'examples')

// Rutas
app.get('/examples', async (req, res) => {
  try {
    const examples = await Example.find()
    res.json(examples)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.post('/examples', async (req, res) => {
  try {
    const example = new Example(req.body)
    await example.save()
    res.status(201).send(example)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.put('/examples/:id', async (req, res) => {
  try {
    const example = await Example.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(example)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.delete('/examples/:id', async (req, res) => {
  try {
    await Example.findByIdAndDelete(req.params.id)
    res.status(204).send()
  } catch (err) {
    res.status(500).send(err)
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
