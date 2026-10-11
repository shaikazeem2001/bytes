const mongoose = require("mongoose");

async function connectdb(){
    try {
        await mongoose.connect(process.env.db_connection_string, { dbName: 'userdata' });
        console.log("MongoDB connected ✅");
    } catch (error) {
        console.log("MongoDB connection failed ❌",error.message);
    }
}

module.exports=connectdb;
