import fs, { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, '../../config.json');

export default class Config {
    static config = JSON.parse(fs.readFileSync(configPath));

    static getChannels(guildID){
        let guild = this.config.guilds.find(guild => guild.id === guildID);
        return guild.channels;
    }

    static async changePrefix(guildID, prefix){
        let guild = this.config.guilds.find(guild => guild.id === guildID);
        guild.prefix = prefix;
        this.writeConfigAndReload();
    }

    static async addChannels(guildID, channelIDs){
        let guild = this.config.guilds.find(guild => guild.id === guildID);
        channelIDs.forEach(id => {
            let exists = guild.channels.find(ch => ch === id);
            if(exists === undefined){
                guild.channels.push(id);
            }
        });
        this.writeConfigAndReload();
    }

    static async removeChannels(guildID, channelIDs){
        let guild = this.config.guilds.find(guild => guild.id === guildID);
        channelIDs.forEach(id => {
            guild.channels = guild.channels.filter(ch => ch !== id);
        });
        this.writeConfigAndReload();
    }

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