require("dotenv").config()
const express = require("express")
const path = require("path");

const app = express()
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const db = require("./models/db")

const apiRouter = require("../backend/routes/api")
app.use("/api", apiRouter)

app.use(require("./middleware/errorHandler"));

app.listen(process.env.PORT, () => {
    console.log(`app running on port ${process.env.PORT}`)
})

