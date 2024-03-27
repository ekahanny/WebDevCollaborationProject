const express = require("express");
const fs = require("node:fs")
const api = express();
const HOST = "localhost";
const PORT = 3000;

api.use(express.json());

const loadData = () => {
  const data = fs.readFileSync('data.json', "utf8")
  return JSON.parse(data)
}

const addData = (task) => {
  const tasks = loadData()
  task.id = tasks.length + 1
  tasks.push(task)
  fs.writeFileSync('data.json', JSON.stringify(tasks))
}

// Menampilkan semua tugas
api.get("/tasks", (req, res) => {
  const data = loadData()
  res.status(200).json(data);
});

// Menampilkan tugas berdasarkan parameter id
api.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const data = loadData()
  const task = data.filter(task => task.id == id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(200).json(task);
});

// Menambahkan tugas baru
api.post("/tasks", (req, res) => {
  addData(req.body);
  res.status(201).json(loadData());
});

api.listen(PORT, () => console.log(`API running at ${HOST}:${PORT}!`));
