import FAQModel from '../models/FAQModel.js';

export default {
    name: 'createfaq',
    execute: async (message, args, prefix) => {
        if(args.length < 3) return message.channel.send("Not enough arguments.");
        let content = args.slice(2).join(" ");
        let responseID = await FAQModel.createResponse(message.guild.id, content);
        message.channel.send(
            `Created FAQ #\`${responseID}\`\nAttach questions with \`${prefix}faq attach ${responseID} [question]\``
        );
    }
}