import mongoose from "mongoose";
const userSchema = new mongoose.Schema({

        name :{type:String,required:true},
        email:{type:String,required:true},
        phoneno:{type:String,required:true},
        password:{type:String,required:true},
        
        role:{type:String,enum:["admin","agent"] ,required:true}





})
const User = mongoose.model("Users",userSchema)
export default User;