import ResponseModel from '../models/ResponseModel';
import {Message} from 'discord.js';

export default {
    name: 'createfaq',
    execute: async (message: Message, args: string[], prefix: string) => {
        if(args.length < 3) return message.channel.send("Not enough arguments.");
        let content = args.slice(2).join(" ");
        let responseID = await ResponseModel.create(message.guild.id, content);
        message.channel.send(
            `Created FAQ #\`${responseID}\`\nAttach questions with \`${prefix}faq attach ${responseID} [question]\``
        );
    }
}