
import mongoose from "mongoose"
async function connection() {
    try{
        await mongoose.connect(process.env.DB_STRING)
        console.log("Connected to the database")

    }catch(err){
        console.log(err)
    }
}

export default connection