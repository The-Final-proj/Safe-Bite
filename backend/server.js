require("dotenv").config()
const express = require("express")
const app = express()
app.use(express.json())
const db = require("./models/db")

const apiRouter = require("../backend/routes/api")
app.use("/api", apiRouter)

app.listen(process.env.PORT, () => {
    console.log(`app running on port ${process.env.PORT}`)
})