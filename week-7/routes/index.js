const express = require("express");
const main = require("../controllers/index")
const todolist = require("../controllers/todolistController")
const router = express.Router();

router.get("/", main.home);

router.get('/todolist', todolist.index)
router.get('/todolist/add', todolist.add)
router.get('/todolist/history', todolist.history)
router.post('/todolist', todolist.create)
router.put('/todolist', todolist.update)

module.exports = router;
