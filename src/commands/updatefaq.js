import FAQModel from '../models/FAQModel';

export default {
    name: 'updatefaq',
    execute: async (message, args) => {
        if(args.length < 3) return message.channel.send("Not enough arguments.");
        let faqID = args[2];
        let text = args.slice(3).join(" ");
        let exists = await FAQModel.responseExists(message.guild.id, faqID);
        if(!exists) return message.channel.send("Could not find a FAQ with that id.");
        FAQModel.updateResponse(message.guild.id, faqID, text)
            .then(() => message.react("✅"));
    }
}