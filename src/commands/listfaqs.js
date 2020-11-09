import { MessageEmbed } from 'discord.js';
import FAQModel from '../models/FAQModel.js';

export default {
    name: 'listfaqs',
    execute: async (message, args) => {
        let faqs = await FAQModel.getAll(message.guild.id, false);
        
        let emb = new MessageEmbed()
            .setColor('#ff0099')
            .setTitle("FAQs");

        faqs.forEach(f => {
            // let qestions = f.questions;
            // let questionsText = "";
            // qestions.forEach(q => {
            //     questionsText += `${q.text} \`id: ${q.prettyID}\`\n`;
            // });
            // emb.addField(`\`${f.prettyID}\` - ${f.text}`, questionsText);
            emb.addField(`\`${f.prettyID}\``, `${f.text}`, true);
        });

        message.channel.send(emb);
    }
}