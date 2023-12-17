const {default: mongoose} = require("mongoose")

const dbConnect = ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Unable to connect database", error)
    }
}

module.exports = dbConnect;