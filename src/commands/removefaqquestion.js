import FAQModel from '../models/FAQModel';

export default {
    name: 'removefaqquestion',
    execute: async (message, args) => {
        if(args.length < 3) return message.channel.send("Not enough arguments.");
        let questionID = args[2];
        let exists = await FAQModel.questionExists(message.guild.id, questionID);
        if(!exists) return message.channel.send("Could not find a Question with that id.");
        FAQModel.removeQuestion(message.guild.id, questionID)
            .then(() => message.react("✅"));
    }
}