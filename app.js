const express = require('express');
const cors = require('cors');
const connection_service = require('./services/dbConnect');

require('dotenv').config({ path: './.env' });

// Port
const port = 8000;

// Initializing app
const app = express();
app.use(express.json());
app.use(cors());

// DB connection
connection_service.db_connect;

// Routes
app.get('/', (req, res) => {
    res.status(200).json(
        {
            message: 'Welcome to the Server'
        }
    );
})

app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/admin', require('./routes/admin.route'));
app.use('/api/', require('./routes/public.route'));

// Global Error Handler
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: err.message
    })
})

// Starting the server
app.listen(port, () => {
    console.log(`API listening at port ${port}`)
})