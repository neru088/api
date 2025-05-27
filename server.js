const express = require('express');
const app = express();
const port = 3000;

// In-memory database for simplicity (could use a database like MongoDB or MySQL in a real app)
let data = [
  { id: 1, name: 'Item 1', description: 'Description for Item 1' },
  { id: 2, name: 'Item 2', description: 'Description for Item 2' }
];

// Middleware to parse JSON
app.use(express.json());

// GET: Read all items
app.get('/api/items', (req, res) => {
  res.json(data);
});

// POST: Create a new item
app.post('/api/items', (req, res) => {
  const { name, description } = req.body;
  const newItem = {
    id: data.length + 1, // Simple id generation
    name,
    description
  };
  data.push(newItem);
  res.status(201).json(newItem);
});

// PUT: Update an existing item
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  
  const itemIndex = data.findIndex(item => item.id == id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  data[itemIndex] = { id: parseInt(id), name, description };
  res.json(data[itemIndex]);
});

// DELETE: Delete an item
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const itemIndex = data.findIndex(item => item.id == id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  data.splice(itemIndex, 1);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
