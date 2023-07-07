const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
require("./database/engine");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(
  session({
    secret: "my-unique-stock-secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(passport.initialize());

// routes
const homeroute = require("./routes/homeroute");
const apiproductsroute = require("./routes/api/productsapi");
const apiusersroute = require("./routes/api/usersapi");

app.use("/", homeroute);
app.use("/api", apiproductsroute);
app.use("/api", apiusersroute);

var port = 3333;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
