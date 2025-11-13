const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
const chatRoutes = require('./routes/chat');
app.use('/api', chatRoutes);

// FRONTEND HANDLING (if we add frontend later)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send("Your AI-bot backend is running!");
});

// PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
