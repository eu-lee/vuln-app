const express = require('express')
const Database = require('better-sqlite3')

const app = express()
const db = new Database(':memory:')

db.exec('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)')
db.exec("INSERT INTO users VALUES (1, 'Alice', 'alice@example.com')")
db.exec("INSERT INTO users VALUES (2, 'Bob', 'bob@example.com')")

app.get('/', (req, res) => {
  res.send('<h1>User Lookup</h1><form action="/search"><input name="name" placeholder="Search by name"><button>Search</button></form>')
})

// SQL injection: user input concatenated directly into query
app.get('/search', (req, res) => {
  const name = req.query.name
  const rows = db.prepare(`SELECT * FROM users WHERE name = '${name}'`).all()
  res.json(rows)
})

app.listen(3000, () => console.log('Listening on http://localhost:3000'))
