import { Message } from 'discord.js';
import QuestionModel from '../models/QuestionModel';

export default {
    name: 'removefaqquestion',
    execute: async (message: Message, args: string[]) => {
        if(args.length < 3) return message.channel.send("Not enough arguments.");
        let questionID = args[2];
        let exists = await QuestionModel.exists(message.guild.id, questionID);
        if(!exists) return message.channel.send("Could not find a Question with that id.");
        QuestionModel.remove(message.guild.id, questionID)
            .then(() => message.react("✅"));
    }
}