import {Message} from 'discord.js';
import ResponseModel from '../models/ResponseModel';
import QuestionModel from '../models/QuestionModel';

export default {
    name: 'attachquestion',
    execute: async (message: Message, args: string[]) => {
        if(args.length < 4) return message.channel.send("Not enough arguments.");
        let responseID = args[2];
        let exists = await ResponseModel.exists(message.guild.id, responseID);
        if(!exists) return message.channel.send(`Could not find a FAQ with id \`${responseID}\`.`);
        let question = args.slice(3).join(" ");
        QuestionModel.create(message.guild.id, question, responseID)
            .then(() => message.react("✅"));
    }
}