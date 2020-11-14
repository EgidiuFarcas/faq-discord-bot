import Discord from 'discord.js';
import Config from './Config';
import QuestionModel from '../models/QuestionModel';
import ShortcutModel from '../models/ShortcutModel';
import levenshtien, { DamerauLevenshteinResponse } from 'damerau-levenshtein';
import { Command } from "./Commands";

export default class MessageHandler {

    static async CommandsCheck(message: Discord.Message, commands: Discord.Collection<string, Command>){
        
        let prefix = this.GetGivenPrefix(message);
        let args = message.content.substring(prefix.length).split(" ");
        
        if(await this.ShortcutCheck(message, args)) return;

        if(!message.member.hasPermission('MANAGE_GUILD')) return;

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
            
            if(args[1] === 'shortcut') commands.get('attachshortcut').execute(message, args);
            if(args[1] === 'remove-shortcut' || args[1] === 'rs') commands.get('removeshortcut').execute(message, args);
        }
        if(args[0] === 'faqs') commands.get('listfaqs').execute(message, args);
    }

    static async FAQCheck(message: Discord.Message){
        if(!this.inCorrectChannel(message)) return;
        let questions = await QuestionModel.getAll(message.guild.id);
        questions.forEach((q: any) => {
            let match: DamerauLevenshteinResponse = levenshtien(message.content, q.text);
            if(match.similarity > .8){
                message.reply(q.owner.text);
                return;
            }
        });
    }

    static async ShortcutCheck(message: Discord.Message, args: string[]): Promise<boolean>{
        if(!this.inCorrectChannel(message)) return;
        let shortcuts = await ShortcutModel.getAll(message.guild.id);
        shortcuts.forEach((s: any) => {
            if(s.text.toLowerCase() === args[0].toLowerCase()){
                if(!s.owner) return false;
                message.channel.send(s.owner.text);
                return true;
            }
        });
        return false;
    }

    static isCommand(message: Discord.Message): boolean {
        return this.GetGuildPrefix(message) === this.GetGivenPrefix(message);
    }

    static GetGivenPrefix(message: Discord.Message): string{
        let guildPrefix = this.GetGuildPrefix(message);
        return message.content.substring(0, guildPrefix.length);
    }

    static GetGuildPrefix(message: Discord.Message): string {
        return Config.getGuildPrefix(message.guild.id);
    }

    static inCorrectChannel(message: Discord.Message): boolean{
        let guild = message.guild;
        let channels = Config.getChannels(guild.id);
        if(channels.length !== 0 && !channels.includes(message.channel.id)) return false;
        return true;
    }

}