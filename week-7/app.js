const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const db = require('./config/db')
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const app = express();
const port = 3000;

async function conDb() {
  try {
    await db.authenticate()
    console.log('Database connected!')
  } catch (error) {
    console.log(error)
  }
}
conDb()

const router = require("./routes/index")

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// konfigurasi flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// Routes
app.use(router)

app.use((req, res) => {
  res.status(404);
  res.send("<h1>404 Not Found</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
