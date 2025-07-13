const mongoose = require('mongoose');

const mongo_url =process.env.MONGO;

const connectToDB = async() => {
    try{
       await mongoose.connect(mongo_url);
       console.log('mongoDB connected !');
       
    }catch(err){
       console.log(err);
       process.exit(1);
    }
}

module.exports = connectToDB;