import Config from '../utils/Config';

export default {
    name: 'removechannel',
    execute: async (message, args) => {
        let channels = message.mentions.channels;
        if(channels.array().length === 0) return message.reply('You need to mention at least one text channel.');
        let guildID = message.guild.id;
        let channelIDs = [];
        channels.array().forEach(c => {
            channelIDs.push(c.id);
        });
        Config.removeChannels(guildID, channelIDs).then(() => message.react("✅"));
    }
}