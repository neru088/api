const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Make sure to use the correct port for deployment

// In-memory data for simplicity
let data = [
  { id: 1, name: 'Item 1', description: 'Description for Item 1' },
  { id: 2, name: 'Item 2', description: 'Description for Item 2' }
];

// Middleware to parse JSON
app.use(express.json());

// Serve a simple message on the root route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the CRUD API</h1><p>API is running!</p>');

  git add server.js
git commit -m "Added root route for basic welcome page"
git push origin master

});


// Define your other API routes
app.get('/api/items', (req, res) => {
  res.json(data);
});

app.post('/api/items', (req, res) => {
  const { name, description } = req.body;
  const newItem = { id: data.length + 1, name, description };
  data.push(newItem);
  res.status(201).json(newItem);
});

app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const itemIndex = data.findIndex(item => item.id == id);
  if (itemIndex === -1) return res.status(404).json({ error: 'Item not found' });

  data[itemIndex] = { id: parseInt(id), name, description };
  res.json(data[itemIndex]);
});

app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const itemIndex = data.findIndex(item => item.id == id);
  if (itemIndex === -1) return res.status(404).json({ error: 'Item not found' });

  data.splice(itemIndex, 1);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
