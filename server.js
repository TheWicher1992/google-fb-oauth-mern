const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()



app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send("Hello World!")
})

app.use('/api/auth', require('./routes/auth'))


app.listen(5000, () => {
  console.log("Server Running on port 5000")
})
