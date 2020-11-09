import { MessageEmbed } from 'discord.js';
import FAQModel from '../models/FAQModel.js';

export default {
    name: 'listfaqinfo',
    execute: async (message, args) => {
        if(args.length < 3) return message.channel.send("Not enough arguments.");
        let faqID = args[2];
        let faq = await FAQModel.get(message.guild.id, faqID);
        
        let emb = new MessageEmbed()
            .setColor('#ff0099')
            .setTitle(`${faq.text}`);

        let qestions = faq.questions;
        qestions.forEach(q => {
            emb.addField(`\`${q.prettyID}\``, `${q.text}`);
        });
        

        message.channel.send(emb);
    }
}