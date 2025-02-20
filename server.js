require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./Backend/router/Routes");
require("./Backend/conn");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", router);
const PORT = 8003;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
