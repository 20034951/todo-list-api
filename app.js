require('dotenv').config();
const express = require('express');
const todoRoutes = require('./routes/todo');
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(authMiddleware);
app.use('/', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})