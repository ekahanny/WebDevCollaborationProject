const express = require('express')
const fs = require('node:fs')
const api = express()
const HOST = 'localhost'
const PORT = 3000

api.use(express.json())

const loadData = () => {
	const data = fs.readFileSync('data.json', 'utf8')
	return JSON.parse(data)
}

// Menampilkan semua tugas
api.get('/tasks', (req, res) => {
	const data = loadData()
	res.status(200).json(data)
})

// Menampilkan tugas berdasarkan parameter id
api.get('/tasks/:id', (req, res) => {
	const id = parseInt(req.params.id)
	const data = loadData()
	const task = data.filter((task) => task.id == id)

	if (task.length === 0) {
		return res.status(404).json({ error: 'Task not found' })
	}

	res.status(200).json(task)
})

// Menambahkan tugas baru
const addData = (task) => {
	const data = loadData()
	task.id = data.length + 1
	data.push(task)
	fs.writeFileSync('data.json', JSON.stringify(data))
}

api.post('/tasks', (req, res) => {
	addData(req.body)
	res.status(201).json(loadData())
})

// Update task berdasarkan ID
api.put('/tasks/:id', (req, res) => {
	const id = parseInt(req.params.id)
	const data = loadData()
	let taskIndex = -1

	// Mencari index task berdasarkan ID
	for (let i = 0; i < data.length; i++) {
		if (data[i].id === id) {
			taskIndex = i
			break
		}
	}

	if (taskIndex === -1) {
		return res.status(404).json({ error: 'Task not found' })
	}

  // Periksa apakah ID yang dikirim oleh pengguna sesuai dengan ID asli
  if (id !== req.body.id) {
    return res.status(400).json({ error: 'ID cannot be modified' });
}

	// Memperbarui task dengan data baru
	data[taskIndex] = { ...data[taskIndex], ...req.body }

	// Menulis kembali data ke file
	fs.writeFileSync('data.json', JSON.stringify(data))

	res.status(200).json(data[taskIndex])
})

// Delete task berdasarkan ID
api.delete('/tasks/:id', (req, res) => {
	const id = parseInt(req.params.id)
	let data = loadData()

	// Menghapus task dengan ID yang sesuai
	tasks = data.filter((task) => task.id !== id)

	if (tasks.length === data.length) {
		return res.status(404).json({ error: 'Task not found' })
	}

	// Menulis kembali data ke file
	fs.writeFileSync('data.json', JSON.stringify(tasks))

	res.status(200).json({ message: 'Task deleted successfully' })
})

api.listen(PORT, () => console.log(`API running at ${HOST}:${PORT}!`))
