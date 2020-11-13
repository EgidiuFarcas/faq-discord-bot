import { MessageEmbed } from 'discord.js';
import FAQModel from '../models/FAQModel';

export default {
    name: 'listfaqs',
    execute: async (message, args) => {
        let faqs = await FAQModel.getAll(message.guild.id, false);
        
        let emb = new MessageEmbed()
            .setColor('#ff0099')
            .setTitle("FAQs");

        faqs.forEach(f => {
            emb.addField(`\`${f.prettyID}\``, `${f.text}`, true);
        });

        message.channel.send(emb);
    }
}