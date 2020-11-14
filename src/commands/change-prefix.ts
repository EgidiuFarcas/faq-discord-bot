import Config from '../utils/Config';
import {Message} from 'discord.js';

export default {
    name: 'changeprefix',
    execute: async (message: Message, args: string[]) => {
        let prefix = args[1];
        if(prefix === "" || prefix === undefined) return message.channel.send("The prefix can't be empty.");
        Config.changePrefix(message.guild.id, prefix).then(() => message.react("✅"));
    }
}