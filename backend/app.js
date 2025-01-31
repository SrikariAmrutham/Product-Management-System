const express = require('express'); 
const bodyparser = require('body-parser'); // parses incoming request bodies and makes them accessible via req.body
const cors = require('cors'); // cross-origin resource sharing, allows to accepts requests from different origins
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes');
const sequelize = require('./config/db');
require('dotenv').config(); 

//sync the database
sequelize.sync().then(() => console.log('Database synced'));

const app = express(); // creating an instance of express application to handle http requests & setup middleware and routes
app.use(cors());
app.use(bodyparser.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));