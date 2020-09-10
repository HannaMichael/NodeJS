const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blog = require('./models/blog')
const app = express();
const blogRouter = require('./routes/blogRouters')
const dotenv = require('dotenv').config({ path: './config/.env' })
const db = require('./config/db')
const passport = require('passport')

// dotenv.config({ path: './config/congif.envnpm ' })

app.use(express.urlencoded({ extended: true }))


// passport middleware
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

//use morgan in development mode
if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}

app.use(express.static('public'))

//connect to mongodb
const dbURI = process.env.MONGO_DB
const PORT = process.env.PORT

db.connectDB()
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))

console.log(process.env.NODE_ENV)
app.set('view engine', 'ejs')

//listen
const blogs = [
    { title: 'Story 1', intro: 'This is story #1' },
    { title: 'Story 2', intro: 'This is story #2' },
    { title: 'Story 3', intro: 'This is story #3' }
]

app.get('/', (req, res) => {
    // res.send('<p> Home page </p>')
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    // res.send('<p> about page </p>')
    res.render('about', { title: 'About' })
})

app.get('/login', (req, res) => {
    // res.send('<p> about page </p>')
    res.render('../login/index')
})

//redirext
app.get('about-us', (req, res) => {
    res.redirect('/about')
})

app.use('/blogs', blogRouter)

// 404 error
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' })

})
