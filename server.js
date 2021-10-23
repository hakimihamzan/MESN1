require("dotenv").config();
const express = require("express");
const app = express();

//odm
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
// thic contains config things
const { port, mongoURI } = require("./config/config");
//route path
const transactionsRoutes = require("./routes/transaction");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

//connecting to db first, using mongoose
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB database is connected"))
  .catch((err) => console.log(err));

app.use("/api/transactions", transactionsRoutes);

app.get("/", (req, res) => res.send("Hello world"));

app.listen(port, () => console.log("Express is running at port " + port));
