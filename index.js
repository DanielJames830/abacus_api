const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/encounter', require('./src/routers/encounterRouter'));
app.use('/map', require('./src/routers/mapRouter'));
app.use('/entity', require('./src/routers/entityRouter'));
app.use('/user', require('./src/routers/userRouter'));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server running on port ${PORT}!`));