const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const routes = require("./Routes/Routes.js");

app.use(cors());
app.use(express.json());
app.use("/api",routes);

const PORT = process.env.PORT ||5000
app.listen(PORT,()=> console.log(`server is running on port ${PORT}`));




