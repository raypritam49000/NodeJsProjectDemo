express = require('express');
const app = express();
require('dotenv').config();
require('./dbinfo/dbconfig');
const PORT = 3000 || process.env.PORT;
const HOST = 'localhost' || process.env.HOST;
const routerUser = require('./routes/UserController');
const routerAddress = require('./routes/AddressController');
const routerRoles = require('./routes/RolesController');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors({ origin: '*' }));
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/rest/api',routerUser);
app.use('/',routerAddress);
app.use('/',routerRoles);


app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT,HOST, () =>{
     console.log(`Server are running on ${HOST}:${PORT}`)
})