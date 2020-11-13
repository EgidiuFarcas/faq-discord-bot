import { Message } from 'discord.js';
import FAQModel from '../models/FAQModel';

export default {
    name: 'removefaq',
    execute: async (message: Message, args: string[]) => {
        if(args.length < 3) return message.channel.send("Not enough arguments.");
        let faqID = args[2];
        let exists = await FAQModel.responseExists(message.guild.id, faqID);
        if(!exists) return message.channel.send("Could not find a FAQ with that id.");
        FAQModel.removeResponse(message.guild.id, faqID)
            .then(() => message.react("✅"));
    }
}