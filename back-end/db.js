const mongoose=require("mongoose")
const connectDB=async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/Registration_db")
        console.log("MongoDB connected!!!")

    }catch (error){
        console.log("db connection error",error)
    }

}

module.exports= connectDB;