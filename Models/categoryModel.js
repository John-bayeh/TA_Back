import mongoose from "mongoose";
const categorySchema=new mongoose.Schema(
    {
        id:{type:String,require:true,unique:true},
        title:{type:String,require:true},
    }
);
export default mongoose.model("Category",categorySchema);