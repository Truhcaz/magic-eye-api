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
    connection: 'postgresql://magiceyedb_owner:HxOq4Y5tlcej@ep-delicate-sky-a2638155.eu-central-1.aws.neon.tech/magiceyedb?sslmode=require'
    }
);

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