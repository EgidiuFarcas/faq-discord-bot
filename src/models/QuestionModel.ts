import Response, { IResponse } from '../database/ResponseSchema';
import Question, { IQuestion } from '../database/QuestionSchema';

export default class QuestionModel {

    static async create(guildID: string, text: string, responsePrettyID: string): Promise<IResponse>{
        let r = await Response.findOne({guildID: guildID, prettyID: responsePrettyID});
        let q = new Question({
            text: text,
            guildID: guildID,
            owner: r._id
        });
        await q.save();
        r.questions.push(q._id);
        await r.save();
        return r;
    }

    static async exists(guildID: string, prettyID: string): Promise<boolean>{
        let r = await Question.exists({
            guildID: guildID,
            prettyID: prettyID
        });
        return r;
    }

    static async getAll(guildID: string): Promise<IQuestion[]>{
        return await Question.find({guildID: guildID, owner: {$ne: null}}).populate('owner');
    }

    static async remove(guildID: string, questionPrettyID: string): Promise<boolean>{
        try{
            await Question.findOneAndDelete({guildID: guildID, prettyID: questionPrettyID});
        }catch(err){
            console.error(err);
            return false;
        }
        return true;
    }

}