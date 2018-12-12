const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

// console.log(__dirname + '/../public');
// console.log(publicPath);

// Grab handle to express webappframework
var app = express();

// Setup static page middleware to serve public folder
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
