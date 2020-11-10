import { MessageEmbed } from 'discord.js';
import Config from '../utils/Config.js';

export default {
    name: 'listchannels',
    execute: async (message, args) => {
        let channels = Config.getChannels(message.guild.id);
        console.log(channels);
        let emb = new MessageEmbed()
            .setColor('#ff0099')
            .setTitle("FAQ Channels");

        if(channels.length > 0){
            let chs = "";
            channels.forEach(c => {
                chs += `<#${c}> `;
            });

            emb.addField(`\u200b`, chs);
        }else emb.addField("No channels specified", "Bot will check all readable channels");

        message.channel.send(emb);
    }
}