import { Message } from 'discord.js';
import ResponseModel from '../models/ResponseModel';

export default {
    name: 'removefaq',
    execute: async (message: Message, args: string[]) => {
        if(args.length < 3) return message.channel.send("Not enough arguments.");
        let faqID = args[2];
        let exists = await ResponseModel.exists(message.guild.id, faqID);
        if(!exists) return message.channel.send("Could not find a FAQ with that id.");
        ResponseModel.remove(message.guild.id, faqID)
            .then(() => message.react("✅"));
    }
}