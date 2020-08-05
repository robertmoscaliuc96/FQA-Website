const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const URI= "mongodb+srv://robert123:robert123@cluster0.y8utp.mongodb.net/test?retryWrites=true&w=majority";
// connect mongoDB
const connectDB = async () =>{
    
    try{
     await mongoose.connect(URI,{
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false  
     });
        console.log(">>>>>MongoDB CONNECTED....<<<<")
    }catch(err){
        console.log(">>>>>>>>MongoDB NOT CONNECTED ALERT<<<<<<<<")
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
    
}


module.exports = connectDB;