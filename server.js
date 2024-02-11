const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
const weatherappRoutes = require('./routes/routes');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', weatherappRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});