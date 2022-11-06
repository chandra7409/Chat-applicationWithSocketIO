const express = require("express");
const app = express();
const http = require('http').Server(app);
const socket = require("socket.io");
const io = socket(http);




/**
 * Rendering html
 */

const PORT = process.env.PORT || 8008;
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/form.html");
})


http.listen(PORT, () => {
    console.log("server started on running the ", +8008);
})


////initialising the live voting



const candidates = {
    "0": { votes: 0, label: 'Elephant', color: randomRGB() },
    "1": { votes: 0, label: 'Cycle', color: randomRGB() },
    "2": { votes: 0, label: 'Kamal', color: randomRGB() },
    "3": { votes: 0, label: 'panja', color: randomRGB() },
    "4": { votes: 0, label: 'Go', color: randomRGB() },

}


function randomRGB() {
    const r = () => Math.random() * 256 >> 0;
    return `rgb(${r()},${r()},${r()})`;
}