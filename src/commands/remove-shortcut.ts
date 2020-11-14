import { Message } from 'discord.js';
import ShortcutModel from '../models/ShortcutModel';

export default {
    name: 'removeshortcut',
    execute: async (message: Message, args: string[]) => {
        if(args.length < 3) return message.channel.send("Not enough arguments.");
        let shortcutID = args[2];
        let exists = await ShortcutModel.exists(message.guild.id, shortcutID);
        if(!exists) return message.channel.send("Could not find a Shortcut with that id.");
        ShortcutModel.remove(message.guild.id, shortcutID)
            .then(() => message.react("✅"));
    }
}