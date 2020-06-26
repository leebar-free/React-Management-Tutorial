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

app.get('/api/customers', (req, res) => {
    res.send([
        {
            'id': '1',
            'image': 'https://placeimg.com/64/64/1',
            'name': '유관순',
            'birthday': '961221',
            'gender': '여자',
            'job': '대학생'
          },
          {
            'id': '2',
            'image': 'https://placeimg.com/64/64/2',
            'name': '홍길동',
            'birthday': '961222',
            'gender': '남자',
            'job': '대학생2'
          },
          {
            'id': '3',
            'image': 'https://placeimg.com/64/64/3',
            'name': '이순신',
            'birthday': '961223',
            'gender': '남자',
            'job': '대학생3'
          }
    ]);
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
