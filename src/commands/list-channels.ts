import { MessageEmbed, Message } from 'discord.js';
import Config from '../utils/Config';

export default {
    name: 'listchannels',
    execute: async (message: Message, args: string) => {
        let channels = Config.getChannels(message.guild.id);
        
        let emb = new MessageEmbed()
            .setColor('#ff0099')
            .setTitle("FAQ Channels");

        if(channels.length > 0){
            let chs = "";
            channels.forEach((c: string) => {
                chs += `<#${c}> `;
            });

            emb.addField(`\u200b`, chs);
        }else emb.addField("No channels specified", "Bot will check all readable channels");

        message.channel.send(emb);
    }
}