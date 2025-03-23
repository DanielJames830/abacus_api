const express = require('express');
const http = require('http');
const app = express();
app.use(express.json());

app.use('/encounter', require('./src/routers/encounterRouter'));
app.use('/map', require('./src/routers/mapRouter'));

const hostname = process.env.LOCAL_IP
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server running on port ${PORT}!`));