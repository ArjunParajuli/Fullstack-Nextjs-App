import mongoose from "mongoose";

const dbConnect = async() =>{
    try{
        mongoose.connect(process.env.MONGO_URL!) // ! denotes this url wont be undefined
        //The connection object is obtained from mongoose.connection. This object is used to listen for connection events.
        const connection = mongoose.connection 

        // event listener for the 'connected' event, which logs a message when the connection is successfully established
        connection.on('connected', ()=>{
            console.log("Connected to DB")
        })

        // event listener for the 'error' event, which logs a message when there is an error with the connection
        connection.on('error', ()=>{
            console.log("Error with DB")
            process.exit(1);
        })
    }catch(err){
        console.log("Db connection issue+ ", err);
    }
}

export default dbConnect