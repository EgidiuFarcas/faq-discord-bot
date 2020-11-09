import Discord from 'discord.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

const client = new Discord.Client();

//Load config
dotenv.config();

//Connect to MongoDB
mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, (err) => {
        if (err){
            console.error("MongoDB Connection failed.");
            process.exit(5);
        }else console.log('Connected to database:'.blue, `${process.env.DB_NAME}`.yellow.bold);
    }
);

client.on('ready', () => {
    console.log(`Connected to client:`.blue, `${client.user.tag}`.yellow.bold)
});

client.on('message', (message) => {
    if(message.content === 'ping') message.reply("pong");
})

client.login(process.env.BOT_TOKEN);