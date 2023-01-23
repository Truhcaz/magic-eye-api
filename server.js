import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controllers/register.js';
import handleLogin from './controllers/signin.js';
import * as image from './controllers/image.js';
import handleProfil from './controllers/profil.js';

const db = knex({
    client: 'pg',
    connection: {
        host: 'dpg-cf7dal5a499d72p9s980-a',
        user: 'magic_eye_db_user',
        password: 'BNeBdOaqxiaHBp7WdQdXt8mgIB5g4uuU',
        database: 'magic-eye'
    }
});

const app = express();
app.use(bodyParser.json())
app.use(cors());

app.get('/', (req, res) => {res.send('succes');})
app.post('/signin', handleLogin(db, bcrypt))
app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => { handleProfil (req, res, db)})
app.put('/image', (req, res) => { image.default.handleImage ( req, res,db)})
app.post('/imageurl', (req, res) => { image.default.handleApiCall ( req, res)})

app.listen(3000, () => {
    console.log('app is running on port 3000')
})