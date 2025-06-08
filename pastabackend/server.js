
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const colabRoutes = require('./routes/colaboradores');

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/colaboradores', colabRoutes);

app.listen(3001, () => {
  console.log('Backend rodando na porta 3001');
});
