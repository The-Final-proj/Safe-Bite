const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL).then((result)=>{
    console.log("database successfully running")
}).catch((err)=>{
    console.log(err)
})