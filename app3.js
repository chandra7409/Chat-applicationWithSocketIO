const { json } = require("body-parser");
const express = require("express");
const app = express();
app.use(json());
// Normal usage
const PORT = process.env.PORT || 3400;
app.use(express.static(__dirname + "/public"));
app.get("/name", function(req, res) {
    var firstName = req.query.first;
    var lastName = req.query.last;
    // OR you can destructure and rename the keys
    var { first: firstName, last: lastName } = req.query;
    // Use template literals to form a formatted string
    res.json({
        name: `${firstName} ${lastName}`
    });
});
// Assets at the /public route
//app.use("/public", express.static(__dirname + "/public"));
app.listen(PORT, () => {
    console.log("server are running on the", +PORT)
})