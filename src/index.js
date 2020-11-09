//Packages
import Discord from 'discord.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors'; //It's actually used
//Utils
import Config from './utils/Config.js';
import Commands from './utils/Commands.js';

const client = new Discord.Client();

dotenv.config();
client.commands = await Commands();

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
    if(message.author.bot) return;
    


    //Commands
    let prefix = Config.getGuildPrefix(message.guild.id);
    let givenPrefix = message.content.substring(0, prefix.length);
    if(prefix !== givenPrefix) return;

    let args = message.content.substring(prefix.length).split(" ");
    if(args[0] === 'ch' || args[0] === 'channel'){
        if(args[1] === 'add') client.commands.get('addchannel').execute(message, args);
        if(args[1] === 'rem' || args[1] === 'remove') client.commands.get('removechannel').execute(message, args);
    }
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