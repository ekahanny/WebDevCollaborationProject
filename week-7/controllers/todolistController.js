// const todolist = require('../models/todolistModel')
const ToDoList = require('../models/todolist')

const index = async (req, res) => {
  const tasks = await ToDoList.findAll({
    where: {
      status: 0
    },
    order: [['deadline', 'ASC']]
  })
  const data = {
    layout: "layouts/main",
    msg: req.flash("msg"),
    tasks,
    req,
  };
  res.render("todolist", data);
};

const add = (req, res) => {
  const data = {
    layout: "layouts/main",
    req,
  };
  res.render("add", data);
};

const history = async (req, res) => {
  const tasksDone = await ToDoList.findAll({
    where: {
      status: 1
    },
    order: [['updatedAt', 'DESC']]
  })
  const data = {
    layout: "layouts/main",
    tasksDone,
    req,
  };
  res.render("history", data);
};

const create = async (req, res) => {
  // insert data on table
  await ToDoList.create({
    nama_tugas: req.body.nama_tugas,
    deadline: req.body.deadline,
    deskripsi: req.body.deskripsi,
    status: 0
  })
  req.flash("msg", "Tugas berhasil ditambahkan!");
  res.redirect("/todolist");
};

const update = async (req, res) => {
  await ToDoList.update(
    {
      status: 1
    },
    {
      where: {
        id: req.body.id
      }
    }
  )
  req.flash("msg", "Satu tugas telah selesai!");
  res.redirect("/todolist");
};

module.exports = {
  index, add, history, create, update
}
