import Discord from 'discord.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

//Load config
dotenv.config();

//Connect to MongoDB
try {
    mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        },(err) => {
            if(err) throw err;
            else console.log(`Connected to DB ${process.env.DB_NAME}`);
        }
    );
}catch(err) {
    console.error(err);
    return;
}