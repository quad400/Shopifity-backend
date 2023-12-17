const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

const userRoute = require("./src/routes/userRoute")
const productRoute = require("./src/routes/productRoute")

const dbConnect = require("./src/config/db")
const { notFound, errorHandler } = require("./src/middlewares/errorMiddleware")
require("dotenv").config()

const app = express()

const port = process.env.PORT

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/api/user", userRoute)
app.use("/api/product", productRoute)







app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=>{
    dbConnect()
    console.log(`Server running on port ${port}`)
})

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
  });
  
  process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
  