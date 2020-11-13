import Discord from 'discord.js';
import fs from 'fs';
import path from 'path';

const commandsPath: string = path.join(__dirname, '../commands');

export default function load(): Discord.Collection<string, Function>{
     let commands: Discord.Collection<string, Function> = new Discord.Collection();
     //Get all command files
     const commandFiles: string[] = fs.readdirSync(`${commandsPath}`).filter(file => file.endsWith('.ts'));
     //Setup Commands
     for(const file of commandFiles){
         let command: any = require(`${commandsPath}/${file}`);
         command = command.default;
         commands.set(command.name, command);
     }
     return commands;
}