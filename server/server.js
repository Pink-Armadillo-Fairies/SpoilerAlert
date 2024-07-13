const express = require('express');
const app = express();
const PORT = 3000;
//const path = require('path');

app.use(express.static(__dirname)); // Serve from the current directory
// Route for serving the index.html file
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '');
// });

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
