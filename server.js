// dependencies
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

// setting up express app to handle parsing of data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// starting the server
app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}.`);
});