const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');

app.use(bodyParser.json());
app.use(logger('dev'));

app.use((req, res, next) => {
    console.log(`${req.method}: ${req.url}`);
    next();
});

app.use((req, res, next) => {
    if (req.query.api_key === '543') {
       next();
   } else {
        res.status(401).send({msg: 'Not authorized'});
    }
});

app.get('/', (req, res) => {
    res.send({msg: 'hello world'});
});

app.get('/accounts', (req, res, next) => {
    console.log('accounts inline middleware');
    next();
    }, (req, res) => {
        res.send({msg: 'accounts'});
});

app.get('/transactions', (req, res) => {
    console.log(req.body);
    res.send({msg: 'transactions'});
});

app.use((error, req, res, next) => {
    res.status(500).send(error);
})

app.listen(process.env.PORT, process.env.IP);