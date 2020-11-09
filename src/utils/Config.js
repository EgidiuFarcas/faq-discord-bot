import fs, { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, '../../config.json');

export default class Config {
    static config = JSON.parse(fs.readFileSync(configPath));

    static getGuildPrefix(guildID){
        let guild = this.config.guilds.find(guild => guild.id === guildID);
        return guild.prefix;
    }

    static async addGuild(guildID, defaultPrefix){
        let exists = this.config.guilds.find(guild => guild.id === guildID);
        if(exists !== undefined) return;
        this.config.guilds.push({
            id: guildID,
            prefix: defaultPrefix,
            channels: []
        });
        this.writeConfigAndReload();
    }

    static async removeGuild(guildID){
        this.config.guilds = this.config.guilds.filter(guild => guild.id !== guildID);
        this.writeConfigAndReload();
    }

    static async writeConfigAndReload(){
        fs.writeFile(configPath, JSON.stringify(this.config, null, 4),
            (err) => {
                if(err){
                    console.error(err);
                }
                this.config = JSON.parse(fs.readFileSync(configPath));
            }
        );
    }
}