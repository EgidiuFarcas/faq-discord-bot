//Packages
import Discord from 'discord.js';
import dotenv from 'dotenv';
//Utils
import Config from './utils/Config';
import Commands, { Command } from './utils/Commands';
import MessageHandler from './utils/MessageHandler';
import Database from './database/Database';

const client = new Discord.Client();
const commands: Discord.Collection<string, Command> = Commands();
dotenv.config();

client.on('ready', () => {
    console.log(`Connected to client:`, `${client.user.tag}`);
    Database.connect();
});

client.on('message', (message) => {
    if(message.author.bot || message.guild === null) return;

    if(MessageHandler.isCommand(message)) MessageHandler.CommandsCheck(message, commands);
    else MessageHandler.FAQCheck(message);
});

client.on('guildCreate', (guild) => {
    Config.addGuild(guild.id, "f?");
});

client.on('guildDelete', (guild) => {
    //Prevent from misfire when there's a server outage
    if(!guild.available) return;
    Config.removeGuild(guild.id);
});

client.login(process.env.BOT_TOKEN);