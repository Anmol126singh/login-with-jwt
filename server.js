const express= require('express');
const app = express();
const env = require('dotenv');

app.use(express.json());

env.config()
const auth = require('./Router/authrouter.js')
const post = require('./Router/posts.js')

const mongo = require('mongoose');
mongo.connect(process.env.url)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the API</h1>
    <p>Try <a href="/api/users/register">Register</a> or <a href="/api/users/login">Login</a></p>
  `);
});



app.use('/api/users',auth);
app.use('/api/post',post);
app.listen(5000,()=>console.log("server initiated"));
