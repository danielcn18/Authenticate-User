const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const User = require('./models/user');
const bcrypt = require('bcryptjs');

const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('views', './views');
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({extended: true}));

app.use(express.static('./public'));

mongoose.connect('mongodb+srv://dchiquete2019:97Ap4KcvLRfmz6Hs@cluster0.nr0zix5.mongodb.net/AuthenticateUser')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error(err);
    });

app.get('/', async (req, res) => {
    const users = await User.find();
    res.render('index', {users});
});

app.get('/register', async (req, res) => {
    const users = new User(req.body);
    // users.save();
    res.render('register', {users});
});

app.post('/register', async (req, res) => {
    const users = new User(req.body);
    bcrypt.hash(users.password, 10).then(function(hash) {
        // Store hash in your password DB.
        users.password = hash;
        // users.confirmpassword = hash;
        users.save();
    });
    res.send('Thanks for registering!');
});

app.get('/login', async (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const users = new User(req.body);
    /* bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(users.password, salt, (err, hash) => {

        });
    }); */
    /* bcrypt.compare(plaintextPassword, ) */
})

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});