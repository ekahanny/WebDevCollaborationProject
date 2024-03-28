const fs = require('node:fs')
const data = fs.readFileSync('data.json', 'utf8')
const dataJson = JSON.parse(fs.readFileSync('data.json', 'utf8'))

const oneData = dataJson.filter((task) => task.id == '3')
console.log(dataJson)

// const dataBaru = {
//     id: 4,
//     title: "test masuk",
//     description: " pemrograman Python",
//     due_date: "2023-04-15",
//     status: "pending",
// }

// dataJson.push(dataBaru)

// tambah data
// fs.writeFileSync('data.json', JSON.stringify(dataJson))

// console.log(dataJson)
// console.log(typeof dataJson)

// const tambahData = (data) => {

// }
