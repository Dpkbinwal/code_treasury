import mongoose from 'mongoose'

async function connect():Promise<void>{
    try{
        await mongoose.connect(process.env.MONGO_URL as string)
        console.log("db connected...")
    }
    catch(err){
        console.error(err);
    }
}

export default connect;