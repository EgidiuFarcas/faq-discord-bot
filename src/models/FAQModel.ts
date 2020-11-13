import Response from '../database/ResponseSchema';
import Question from '../database/QuestionSchema';

export default class FAQModel {

    static async createResponse(guildID: string, text: string){
        let r = new Response({
            text: text,
            guildID: guildID
        });
        await r.save();
        return r.prettyID;
    }

    static async responseExists(guildID: string, prettyID: string){
        let r = await Response.exists({
            guildID: guildID,
            prettyID: prettyID
        });
        return r;
    }

    static async questionExists(guildID: string, prettyID: string){
        let r = await Question.exists({
            guildID: guildID,
            prettyID: prettyID
        });
        return r;
    }

    static async createQuestion(guildID: string, text: string, responsePrettyID: string){
        let r = await Response.findOne({guildID: guildID, prettyID: responsePrettyID});
        let q = new Question({
            text: text,
            guildID: guildID,
            owner: r._id
        });
        await q.save();
        r.questions.push(q._id);
        await r.save();
    }

    static async getAll(guildID: string, populate: boolean = true){
        if(populate) return await Response.find({guildID: guildID}).populate('questions');
        else return await Response.find({guildID: guildID});
    }

    static async get(guildID: string, responsePrettyID: string){
        return await Response.findOne({guildID: guildID, prettyID: responsePrettyID}).populate('questions');
    }

    static async getAllQuestions(guildID: string){
        return await Question.find({guildID: guildID, owner: {$ne: null}}).populate('owner');
    }

    static async removeResponse(guildID: string, responsePrettyID: string) {
        let r = await Response.findOne({guildID: guildID, prettyID: responsePrettyID});
        r.questions.forEach((question: any) => Question.findByIdAndDelete(question._id));
        r.deleteOne();
    }

    static async removeQuestion(guildID: string, questionPrettyID: string) {
        return await Question.findOneAndDelete({guildID: guildID, prettyID: questionPrettyID});
    }

    static async updateResponse(guildID: string, prettyID: string, text: string){
        let r = await Response.findOne({guildID: guildID, prettyID: prettyID});
        r.text = text;
        return await r.save();
    }
}