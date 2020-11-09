import Discord from 'discord.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const commandsPath = path.join(__dirname, '../commands');

async function load(){
     let commands = new Discord.Collection();
     //Get all command files
     const commandFiles = fs.readdirSync(`${commandsPath}`).filter(file => file.endsWith('.js'));
     //Setup Commands
     for(const file of commandFiles){
         let command = await import(`${commandsPath}/${file}`);
         command = command.default;
         commands.set(command.name, command);
     }
     return commands;
}

export default load;