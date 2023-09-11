const express = require('express');
const filmeController = require('./controllers/filmeController');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const port = 3000;
const db = require('./models/db');
const expressLayouts = require('express-ejs-layouts');
const userController = require('./controllers/userController');
const session = require('express-session');
const multer = require('multer');

app.use(session({
    secret: 'l1u2c3a4s5',
    saveUninitialized: true,
    resave: true
}));

app.use(expressLayouts);
app.set('layout', './layouts/default/index');
app.set('view engine', 'ejs');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/') // Diretório onde os arquivos serão salvos
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage
});

app.use((req, res, next) => {
    if (!req.session.user) {
        if (req.originalUrl == '/login' || req.originalUrl == '/autenticar') {
            app.set('layout', './layouts/default/login');
            res.locals.layoutVariables = {
                url: process.env.URL,
                img: "/img/",
                style: "/css/",
                title: "Login",
                user: req.session.user
            };
            next();
        } else {
            res.redirect('/login');
        }
    } else {
        app.set('layout', './layouts/default/index');
        res.locals.layoutVariables = {
            url: process.env.URL,
            img: "/img/",
            style: "/css/",
            title: "filme",
            user: req.session.user
        };
        next();
    }
});

// Rotas



app.get('/cadastrar', (req, res) => {
    res.render('cadastrar');
});

app.get('/login', (req, res) => {
    app.set('layout', './layouts/default/login');
    userController.login(req, res);
});

app.post('/login', (req, res) => {
    userController.autenticar(req, res);
});

app.get('/logout', (req, res) => {
    userController.logout(req, res);
});

app.get('/filme/delete/:id', (req, res) => {
    filmeController.deleteFilme(req, res);
});

app.get('/filme/edit/:id', (req, res) => {
    filmeController.updateFilme(req, res);
});

app.post('/filme', upload.single('filetoupload'), filmeController.addFilme);
app.get('/filme', filmeController.getFilmes);
app.post('/filme', filmeController.addFilme);
app.delete('/filme/:id', filmeController.deleteFilme);
app.put('/filme/:id', filmeController.updateFilme);



app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
