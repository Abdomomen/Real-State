import mongoose from "mongoose";

const  mongoDB_url= process.env.DATA_BASE

let cached= global.mongoose


if (!cached){
    cached= global.mongoose= {conn:null , promise:null}
}

export default async function ConnectDB(){

    if (cached.conn){
        return cached.conn
    }

    if (!cached.promise){
        cached.promise = mongoose.connect(mongoDB_url, {
        bufferCommands: false,
        });
    }

    try {
        cached.conn= await cached.promise;
    } catch (e) {
        cached.promise= null
        throw e
    }

    return cached.conn
}
