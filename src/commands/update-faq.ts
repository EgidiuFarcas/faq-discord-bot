import { Message } from 'discord.js';
import ResponseModel from '../models/ResponseModel';

export default {
    name: 'updatefaq',
    execute: async (message: Message, args: string[]) => {
        if(args.length < 3) return message.channel.send("Not enough arguments.");
        let faqID = args[2];
        let text = args.slice(3).join(" ");
        let exists = await ResponseModel.exists(message.guild.id, faqID);
        if(!exists) return message.channel.send("Could not find a FAQ with that id.");
        ResponseModel.update(message.guild.id, faqID, text)
            .then(() => message.react("✅"));
    }
}