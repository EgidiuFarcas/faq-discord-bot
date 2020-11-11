//Packages
import Discord from 'discord.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import levenshtien from 'damerau-levenshtein';
import colors from 'colors'; //It's actually used
//Utils
import Config from './utils/Config.js';
import Commands from './utils/Commands.js';
import FAQModel from './models/FAQModel.js';

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
            console.error("MongoDB Connection failed.".red);
            console.log(err);
            process.exit(5);
        }else console.log('Connected to database:'.blue, `${process.env.DB_NAME}`.yellow.bold);
    }
);

client.on('ready', () => {
    console.log(`Connected to client:`.blue, `${client.user.tag}`.yellow.bold)
});

client.on('message', (message) => {
    if(message.author.bot) return;

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

    if(args[0] === 'prefix') client.commands.get('changeprefix').execute(message, args);

    if(args[0] === 'h' || args[0] === 'help') client.commands.get('help').execute(message, prefix);

    if(args[0] === 'ch' || args[0] === 'channel'){
        if(args[1] === 'add') client.commands.get('addchannel').execute(message, args);
        if(args[1] === 'rem' || args[1] === 'remove') client.commands.get('removechannel').execute(message, args);
        if(args[1] === 'list') client.commands.get('listchannels').execute(message, args);
    }

    if(args[0] === 'faq') {
        if(args[1] === 'list') client.commands.get('listfaqs').execute(message, args);
        if(args[1] === 'create') client.commands.get('createfaq').execute(message, args, prefix);
        if(args[1] === 'attach') client.commands.get('attachquestion').execute(message, args);
        if(args[1] === 'info') client.commands.get('listfaqinfo').execute(message, args);
        if(args[1] === 'update') client.commands.get('updatefaq').execute(message, args);
        if(args[1] === 'rem' || args[1] === 'remove') client.commands.get('removefaq').execute(message, args);
        if(args[1] === 'remove-question' || args[1] === 'rq') client.commands.get('removefaqquestion').execute(message, args);
    }

    if(args[0] === 'faqs') client.commands.get('listfaqs').execute(message, args);
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

async function FAQCheck(message){
    let guild = message.guild;
    let channels = Config.getChannels(guild.id);
    if(channels.length !== 0 && !channels.includes(message.channel.id)) return;

    let questions = await FAQModel.getAllQuestions(guild.id);
    questions.forEach(q => {
        let match = levenshtien(message.content, q.text);
        if(match.similarity > .8){
            message.reply(q.owner.text);
            return;
        }
    });
}