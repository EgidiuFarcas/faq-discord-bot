import mongoose from 'mongoose';

let connect = async function(){
    return mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}`+
        `@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }, (err) => {
            if (err){
                console.error("MongoDB Connection failed.");
                console.log(err);
                process.exit(5);
            }else console.log('Connected to database:', `${process.env.DB_NAME}`);
        }
    );
}

export default {
    connect: connect
}