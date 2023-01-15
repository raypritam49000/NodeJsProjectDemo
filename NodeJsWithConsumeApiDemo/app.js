const express = require('express');
const app = express();
require('dotenv').config();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000;
const axios = require('axios').default;;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', async (req, res) => {
    try {
        const response = await axios({
            method: 'get', 
            url: 'http://localhost:9999/rest/api/users', 
            responseType: 'application/json; charset=utf-8'
        })
        return res.send(response.data);
    } catch (error) {
        return res.json({ message: error.message, isSuccess: 501, isSuccess: false });
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const response = await axios({ 
            method: 'get', 
            url: `http://localhost:9999/rest/api/users/${req.params.id}`, 
            responseType: 'application/json; charset=utf-8'
        })
        return res.send(response.data);
    } catch (error) {
        return res.json({ message: error.message, isSuccess: 501, isSuccess: false });
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const response = await axios({ 
            method: 'delete', 
            url: `http://localhost:9999/rest/api/users/${req.params.id}`, 
            responseType: 'application/json; charset=utf-8'
        })
        return res.send(response.data);
    } catch (error) {
        return res.json({ message: error.message, isSuccess: 501, isSuccess: false });
    }
})

app.put('/users/:id',async (req, res) => {
    
        try {
            const { name, city, salary } = req.body;
    
            const response = await axios({
                method: 'put',
                url: `http://localhost:9999/rest/api/users/${req.params.id}`,
                headers: { 'Content-Type': 'application/json' },
                data: { name, city, salary },
                responseType: 'application/json; charset=utf-8'
            });
    
            return res.send(response.data)
        }
        catch (err) {
            return res.json({ message: err.message, isSuccess: 501, isSuccess: false });
        }
})

app.post('/users', async (req, res) => {
    try {
        const { name, city, salary } = req.body;

        const response = await axios({
            method: 'post',
            url: 'http://localhost:9999/rest/api/users',
            headers: { 'Content-Type': 'application/json' },
            data: { name, city, salary },
            responseType: 'application/json; charset=utf-8'
        });

        return res.send(response.data)
    }
    catch (err) {
        return res.json({ message: err.message, isSuccess: 501, isSuccess: false });
    }
})



app.listen(PORT, HOST, () => {
    console.log(`Server are running at http://${HOST}:${PORT}`);
});