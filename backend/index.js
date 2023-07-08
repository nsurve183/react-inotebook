
const connectToMongo = require('./connect');
const cors = require('cors');
const express = require('express');
connectToMongo();

const app = express()
const port = 5000


app.use(cors())
// this is use for use thunderclient body resp
app.use(express.json());

// Avialable Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Inotebook app listening on port http://localhost:${port}`)
})