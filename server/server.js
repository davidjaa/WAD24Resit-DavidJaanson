
const express = require('express');
const pool = require('./database');
const cors = require('cors')

const port = process.env.PORT || 3000;
const app = express();


app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});


app.get('/api/rplrequests', async(req, res) => {
    try {
        console.log("A GET all request has arrived");
        const rplrequest = await pool.query(
            "SELECT * FROM rplrequest"
        );
        res.json(rplrequest.rows);
    } catch (err) {
        console.error(err.message);
    }
});
