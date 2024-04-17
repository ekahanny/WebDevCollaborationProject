const express = require("express");
const router = express.Router();
const kueri = require("../utils/database");

router.get("/", async (req, res) => {
  const tasks = await kueri(
    'SELECT * FROM task WHERE status = "0" ORDER BY deadline'
  );
  const data = {
    layout: "layouts/main",
    msg: req.flash("msg"),
    tasks,
    req,
  };
  res.render("todolist", data);
});

router.get("/add", (req, res) => {
  const data = {
    layout: "layouts/main",
    req,
  };
  res.render("add", data);
});

router.get("/history", async (req, res) => {
  const tasksDone = await kueri(
    'SELECT * FROM task WHERE status = "1" ORDER BY deadline'
  );
  const data = {
    layout: "layouts/main",
    tasksDone,
    req,
  };
  res.render("history", data);
});

router.post("/", (req, res) => {
  // insert data on table
  const values = Object.values(req.body)
    .map((value) => (typeof value === "string" ? `'${value}'` : value))
    .join(", ");
  kueri(
    `INSERT INTO task (nama_tugas, deadline, deskripsi) VALUES (${values})`
  );
  req.flash("msg", "Tugas berhasil ditambahkan!");
  res.redirect("/todolist");
});

router.put("/", (req, res) => {
  kueri(`UPDATE task SET status = "1" WHERE id = ${req.body.id}`);
  req.flash("msg", "Satu tugas telah selesai!");
  res.redirect("/todolist");
});

module.exports = router;
