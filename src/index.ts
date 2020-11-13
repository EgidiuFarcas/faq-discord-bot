//Packages
import Discord from 'discord.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import levenshtien, { DamerauLevenshteinResponse } from 'damerau-levenshtein';
//Utils
import Config from './utils/Config';
import Commands, { Command } from './utils/Commands';
import FAQModel from './models/FAQModel';

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

    //Get prefixes
    let prefix = Config.getGuildPrefix(message.guild.id);
    let givenPrefix = message.content.substring(0, prefix.length);

    //Check for FAQ
    if(prefix !== givenPrefix){
        FAQCheck(message);
        return;
    }
    //Commands
    if(!message.member.hasPermission('MANAGE_GUILD')) return;

    let args = message.content.substring(prefix.length).split(" ");

    if(args[0] === 'prefix') commands.get('changeprefix').execute(message, args);

    if(args[0] === 'h' || args[0] === 'help') commands.get('help').execute(message, prefix);

    if(args[0] === 'ch' || args[0] === 'channel'){
        if(args[1] === 'add') commands.get('addchannel').execute(message, args);
        if(args[1] === 'rem' || args[1] === 'remove') commands.get('removechannel').execute(message, args);
        if(args[1] === 'list') commands.get('listchannels').execute(message, args);
    }

    if(args[0] === 'faq') {
        if(args[1] === 'list') commands.get('listfaqs').execute(message, args);
        if(args[1] === 'create') commands.get('createfaq').execute(message, args, prefix);
        if(args[1] === 'attach') commands.get('attachquestion').execute(message, args);
        if(args[1] === 'info') commands.get('listfaqinfo').execute(message, args);
        if(args[1] === 'update') commands.get('updatefaq').execute(message, args);
        if(args[1] === 'rem' || args[1] === 'remove') commands.get('removefaq').execute(message, args);
        if(args[1] === 'remove-question' || args[1] === 'rq') commands.get('removefaqquestion').execute(message, args);
    }

    if(args[0] === 'faqs') commands.get('listfaqs').execute(message, args);
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

async function FAQCheck(message: Discord.Message){
    let guild = message.guild;
    let channels = Config.getChannels(guild.id);
    if(channels.length !== 0 && !channels.includes(message.channel.id)) return;

    let questions = await FAQModel.getAllQuestions(guild.id);
    questions.forEach((q: any) => {
        let match: DamerauLevenshteinResponse = levenshtien(message.content, q.text);
        if(match.similarity > .8){
            message.reply(q.owner.text);
            return;
        }
    });
}