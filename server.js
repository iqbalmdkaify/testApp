const express = require("express");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
const dataStore = require("nedb");

const database = new dataStore("database.db");
database.loadDatabase();

app.get("/", (req, res) => {
    res.sendFile("/index.html");
});

app.get("/list", (req, res) => {
    database.find({}, (err, data) => {
        if (err) {
            res.json({
                message: "error",
            });
        } else {
            res.json(data);
        }
    });
});

app.post("/dict", (req, res) => {
    axios({
        method: "get",
        url: `https://api.api-ninjas.com/v1/dictionary?word=${req.body.word}`,
        headers: {
            "X-api-key": process.env.API_KEY,
        },
    }).then((response) => {
        if (response.data.definition === "") {
            res.json({
                available: false,
            });
        } else {
            res.json({
                ...response.data,
                available: true,
            });
        }
    });
});

app.post("/save", (req, res) => {
    database.insert(req.body);
});

app.listen(3000, () => {
    console.log(`Server listening at port ${port}...`);
});
