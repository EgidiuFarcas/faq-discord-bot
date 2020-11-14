import { MessageEmbed, Message } from 'discord.js';
import ResponseModel from '../models/ResponseModel';

export default {
    name: 'listfaqs',
    execute: async (message: Message, args: string[]) => {
        let faqs = await ResponseModel.getAll(message.guild.id, false);
        
        let emb = new MessageEmbed()
            .setColor('#ff0099')
            .setTitle("FAQs");

        faqs.forEach(f => {
            emb.addField(`\`${f.prettyID}\``, `${f.text}`, true);
        });

        message.channel.send(emb);
    }
}