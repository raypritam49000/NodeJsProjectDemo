const express = require('express');
const app = express();
require('dotenv').config();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000;
const fetch = require('node-fetch');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/userList', (req, res) => {
    fetch('http://localhost:9999/rest/api/users')
        .then(response => response.json())
        .then(data => res.send(data));
})

app.get('/userList/:id', (req, res) => {
    fetch('http://localhost:9999/rest/api/users/' + req.params.id)
        .then(response => response.json())
        .then(data => res.send(data));
})

app.delete('/delete/user/:id', (req, res) => {
    fetch('http://localhost:9999/rest/api/users/' + req.params.id, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => res.send(data));
})

app.put('/update/user/:id', (req, res) => {
    fetch('http://localhost:9999/rest/api/users/' + req.params.id, {
        method: 'put',
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => res.send(data));
})

app.post('/users', async (req, res) => {
    try {
        const { name, city, salary } = req.body;

        console.log(name + " : " + city + " : " + salary);
        const response = await fetch('http://localhost:9999/rest/api/users', {
            method: 'post',
            body: JSON.stringify({ name, city, salary }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return res.send(data)
    }
    catch (err) {
        return res.json({ message: err.message, isSuccess: 501, isSuccess: false });
    }
})



app.listen(PORT, HOST, () => {
    console.log(`Server are running at http://${HOST}:${PORT}`);
});