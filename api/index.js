const express = require("express");
const cors = require("cors");
require('dotenv').config();

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.static("public"));

// Enable Cors
app.use(cors());

app.use('/api', require('../routes/index'));

app.listen(PORT, () => {
  console.log(`Server running in PORT ${PORT}`);
});