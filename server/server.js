const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

// Route includes
const thingRouter = require('./routes/thing_router.js');

app.use(express.static('server/public'));
app.use(express.json());

/* Routes */
app.use('/thing', thingRouter);


app.listen(PORT, function () {
    console.log(`You started the server! It is running on port ${PORT}.`);
})

