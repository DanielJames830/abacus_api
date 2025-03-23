const express = require('express');
const app = express();
app.use(express.json());

app.use('/encounter', require('./routers/encounterRouter'));


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));