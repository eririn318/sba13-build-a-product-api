// const mongoose = require('mongoose')
// const dotenv=require('dotenv')

// dotenv.config()

// const connectDB = async () =>{
//     try{
//         await mongoose.connect(process.env.MONGO_URI)
//         console.log("We are connected to Database")
//     }catch(error){
//         console.error(error)
//     }
// }



// module.exports={connectDB}

const mongoose = require('mongoose')
require('dotenv').config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('We are connected to the DB');
        
    } catch (error) {
        console.error(error);
    }
}
module.exports = {connectDB};