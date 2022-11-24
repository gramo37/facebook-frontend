const mongoose = require("mongoose");

const connectToDatabase = () => {
    mongoose.connect(process.env.URI).then(()=>{
        console.log("Connected To Database");
    });
}

module.exports = connectToDatabase;