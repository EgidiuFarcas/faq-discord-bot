import {Message} from 'discord.js';
import ResponseModel from '../models/ResponseModel';
import ShortcutModel from '../models/ShortcutModel';

export default {
    name: 'attachshortcut',
    execute: async (message: Message, args: string[]) => {
        if(args.length < 4) return message.channel.send("Not enough arguments.");
        let responseID = args[2];
        let exists = await ResponseModel.exists(message.guild.id, responseID);
        if(!exists) return message.channel.send(`Could not find a FAQ with id \`${responseID}\`.`);
        let shortcut = args[3];
        ShortcutModel.create(message.guild.id, shortcut, responseID)
            .then(() => message.react("✅"));
    }
}