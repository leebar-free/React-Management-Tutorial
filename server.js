const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// const port = precess.env.PORT || 5000;
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/api/hello', (req, res) => {
//     res.send({message: 'Hello Express!'});
// });

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER",
        (err, rows, fileds) => {
            res.send(rows);
        }
    );
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
