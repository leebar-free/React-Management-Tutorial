const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// const port = precess.env.PORT || 5000;
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
    res.send({message: 'Hello Express!'});
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
