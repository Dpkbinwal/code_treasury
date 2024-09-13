import mongoose from 'mongoose'

async function connect():Promise<void>{
    try{
        await mongoose.connect(process.env.MONGO_URL as string)
        
    }
    catch(err){
        console.error(err);
    }
}

export default connect;