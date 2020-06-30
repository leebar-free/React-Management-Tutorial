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

const multer = require('multer');
const upload = multer({dest: './upload'});

app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
        (err, rows, fileds) => {
            res.send(rows);
        }
    );
});

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
    let image = '/image/' + req.file.filename;
    let username = req.body.username;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;

    console.log('image', image);
    console.log('username', username);
    console.log('birthday', birthday);
    console.log('gender', gender);
    console.log('job', job);

    let params = [image, username, birthday, gender, job];
    connection.query(sql, params,
        (err, rows, fileds) => {
            res.send(rows);
        }
    );
});

app.delete('/api/customers/:id', (req, res) => {
    let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE ID = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fileds) => {
            res.send(rows);
        }
    );

});


app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
