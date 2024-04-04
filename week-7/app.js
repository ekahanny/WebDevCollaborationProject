const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const mysql = require('mysql')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// konfigurasi database sql
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todolist"
});
con.connect()

// konfigurasi flash
app.use(cookieParser('secret'))
app.use(
    session({
        cookie: { maxAge: 6000 },
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
)
app.use(flash())

function kueri(command) {
    return new Promise((resolve, reject) => {
        con.query(command, (err, result, fields) => {
            if (err) throw err;
            resolve(result)
        })
    })
}

// Main route
app.get('/', (req, res) => {
    const data = {
        layout: 'layouts/main',
        req
    }
    res.render('index', data)
})

app.get('/todolist', async (req, res) => {
    const tasks = await kueri('SELECT * FROM task WHERE status = "0" ORDER BY deadline')
    const data = {
        layout: 'layouts/main',
        msg: req.flash('msg'),
        tasks,
        req
    }
    res.render('todolist', data)
})

app.get('/todolist/add', (req, res) => {
    const data = {
        layout: 'layouts/main',
        req
    }
    res.render('add', data)
})

app.get('/todolist/history', async (req, res) => {
    const tasksDone = await kueri('SELECT * FROM task WHERE status = "1" ORDER BY deadline')
    const data = {
        layout: 'layouts/main',
        tasksDone,
        req
    }
    res.render('history', data)
})

app.post('/todolist', (req, res) => {
    // insert data on table
    const values = Object.values(req.body).map(value => typeof value === 'string' ? `'${value}'` : value).join(', ');
    kueri(`INSERT INTO task (nama_tugas, deadline, deskripsi) VALUES (${values})`)
    req.flash('msg', 'Tugas berhasil ditambahkan!')
    res.redirect('/todolist')
})

app.put('/todolist', (req, res) => {
    kueri(`UPDATE task SET status = "1" WHERE id = ${req.body.id}`)
    req.flash('msg', 'Satu tugas telah selesai!')
    res.redirect('/todolist')
})

app.use((req, res) => {
    res.status(404)
    res.send('<h1>404 Not Found</h1>')
})

// con.end()

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})