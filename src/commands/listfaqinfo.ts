import { MessageEmbed, Message } from 'discord.js';
import FAQModel from '../models/FAQModel';

export default {
    name: 'listfaqinfo',
    execute: async (message: Message, args: string) => {
        if(args.length < 3) return message.channel.send("Not enough arguments.");
        let faqID = args[2];
        let exists = await FAQModel.responseExists(message.guild.id, faqID);
        if(!exists) return message.channel.send("Could not find a FAQ with that id.");
        let faq = await FAQModel.get(message.guild.id, faqID);
        
        let emb = new MessageEmbed()
            .setColor('#ff0099')
            .setTitle(`${faq.text}`);

        let qestions = faq.questions;
        qestions.forEach((q: any) => {
            emb.addField(`\`${q.prettyID}\``, `${q.text}`);
        });
        

        message.channel.send(emb);
    }
}