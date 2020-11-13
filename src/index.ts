//Packages
import Discord from 'discord.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
//Utils
import Config from './utils/Config';
import Commands, { Command } from './utils/Commands';
import MessageHandler from './utils/MessageHandler';

const client = new Discord.Client();
const commands: Discord.Collection<string, Command> = Commands();

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
            console.log(err);
            process.exit(5);
        }else console.log('Connected to database:', `${process.env.DB_NAME}`);
    }
);

client.on('ready', () => {
    console.log(`Connected to client:`, `${client.user.tag}`)
});

client.on('message', (message) => {
    if(message.author.bot || message.guild === null) return;

    if(MessageHandler.isCommand(message)) MessageHandler.CommandsCheck(message, commands);
    else MessageHandler.FAQCheck(message);
});

//Added to new guild
client.on('guildCreate', (guild) => {
    Config.addGuild(guild.id, "f?");
});

//Removed from guild
client.on('guildDelete', (guild) => {
    //Prevent from misfire when there's a server outage
    if(!guild.available) return;
    Config.removeGuild(guild.id);
});

client.login(process.env.BOT_TOKEN);