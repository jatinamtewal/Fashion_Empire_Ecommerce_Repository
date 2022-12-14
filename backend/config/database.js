
const mongoose=require("mongoose");


const connectDatabase = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true,useUnifiedTopology:true})
        .then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
    } catch (error) {
        console.log(error);
        throw new Error('Error db');
    }
    
}

module.exports = connectDatabase