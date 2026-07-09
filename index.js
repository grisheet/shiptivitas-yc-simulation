const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize SQLite database
const db = new sqlite3.Database('./shiptivitas.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    initializeDB();
  }
});

function initializeDB() {
  db.run(`CREATE TABLE IF NOT EXISTS cards (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'backlog',
    position INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      // Seed initial data if empty
      db.get('SELECT COUNT(*) as count FROM cards', (err, row) => {
        if (!err && row.count === 0) {
          const seedCards = [
            { id: '1', title: 'Build Kanban Board UI', status: 'in-progress', position: 0 },
            { id: '2', title: 'Connect to Node backend', status: 'backlog', position: 0 },
            { id: '3', title: 'Write SQL analytics', status: 'backlog', position: 1 },
            { id: '4', title: 'Draft YC startup notes', status: 'done', position: 0 },
          ];
          const stmt = db.prepare('INSERT INTO cards (id, title, status, position) VALUES (?, ?, ?, ?)');
          seedCards.forEach(card => stmt.run(card.id, card.title, card.status, card.position));
          stmt.finalize();
          console.log('Database seeded with initial cards.');
        }
      });
    }
  });
}

// GET all cards
app.get('/api/cards', (req, res) => {
  db.all('SELECT * FROM cards ORDER BY status, position', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// PUT update card status (drag-and-drop)
app.put('/api/cards/:id', (req, res) => {
  const { id } = req.params;
  const { status, position } = req.body;
  const updatedAt = new Date().toISOString();

  db.run(
    'UPDATE cards SET status = ?, position = ?, updated_at = ? WHERE id = ?',
    [status, position, updatedAt, id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id, status, position, updated_at: updatedAt });
    }
  );
});

// POST create new card
app.post('/api/cards', (req, res) => {
  const { id, title, status = 'backlog', position = 0 } = req.body;
  db.run(
    'INSERT INTO cards (id, title, status, position) VALUES (?, ?, ?, ?)',
    [id, title, status, position],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id, title, status, position });
    }
  );
});

// DELETE card
app.delete('/api/cards/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM cards WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deleted: id });
  });
});

app.listen(PORT, () => {
  console.log(`Shiptivitas server running on port ${PORT}`);
});

module.exports = app;
