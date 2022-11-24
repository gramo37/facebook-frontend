const express = require("express");
const connectToDatabase = require("./db");
const dotenv = require("dotenv");
const bodyParser = require("body-parser")
var cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./errorMiddleware/errors");
const app = express();

process.on("uncaughtException", (err)=>{
    console.log("uncaughtException", err);
    process.exit(1);
})

dotenv.config({path: path.join(process.cwd(), "/config.env")});
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
connectToDatabase();

// Frontend
app.use(express.static(path.join(__dirname, "frontend/build")));
app.use(express.static("public"));

// Routes
app.use("/api/v1", require("./routes/userRoute"));
app.use("/api/v1", require("./routes/postRoute"));

// error Middleware
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Connected to ${process.env.PORT}`);
});

process.on("unhandledRejection", (err)=>{
    console.log("unhandledRejection", err);
    server.close(()=>{
        process.exit(1);
    });
})