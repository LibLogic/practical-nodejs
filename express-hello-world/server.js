const express = require('express');
const app = express();

app.get('/', (req, res) => {
 res.send('Hello world\n');
});

app.listen(process.env.PORT, process.env.IP);
