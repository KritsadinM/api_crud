const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection(process.env.DATABASE_URL);

app.get('/', (req, res) => {
    res.send('Hello world!!');
});

app.get('/LocationDB', (req, res) => {
    connection.query(
        'SELECT * FROM LocationDB',
        function (err, results, fields) {
            res.send(results);
        }
    );
});

app.get('/LocationDB/:id', (req, res) => {
    const id = req.params.id;
    connection.query(
        'SELECT * FROM LocationDB WHERE id = ?', [id],
        function (err, results, fields) {
            res.send(results);
        }
    );
});

app.post('/LocationDB', (req, res) => {
    const { fname, details, coverImage } = req.body;
    connection.query(
        'INSERT INTO `LocationDB` (`fname`, `details`, `coverImage`) VALUES (?, ?, ?)',
        [fname, details, coverImage],
        function (err, results, fields) {
            if (err) {
                console.error('Error in POST /Location:', err);
                res.status(500).send('Error adding user');
            } else {
                res.status(200).send(results);
            }
        }
    );
});

app.put('/LocationDB', (req, res) => {
    const { id, fname, details, coverImage } = req.body;
    connection.query(
        'UPDATE `LocationDB` SET `fname`=?, `details`=?, `coverImage`=? WHERE id = ?',
        [fname, details, coverImage, id],
        function (err, results, fields) {
            res.send(results);
        }
    );
});

app.delete('/LocationDB', (req, res) => {
    connection.query(
        'DELETE FROM LocationDB WHERE id = ?',
        [req.body.id],
        function (err, results, fields) {
            res.send(results);
        }
    );
});

app.listen(process.env.PORT || 3000, () => {
    console.log('CORS-enabled web server listening on port 3000');
});

module.exports = app;
