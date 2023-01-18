import {initConfig, Config} from './src/Configuration';
import {reloadCommands} from './src/Commands';
import { commandsMap } from './src/Globals';
import Discord from 'discord.js';
initConfig();
reloadCommands();

var client:Discord.Client = new Discord.Client({intents: ['GUILDS', 'GUILD_MESSAGES']});

client.on('ready', () => 
{
    console.log("Estamos ready pa");
    client.user?.setPresence({activities: [{name: Config.presence}]});
});

client.on('messageCreate', (message) =>
{
    let args = message.content.substring(Config.defaultPrefix.length).split(" ");

    if (message.author.bot) return;

    if (commandsMap.has(message.content))
        message.reply(commandsMap.get(message.content)!);

    if (args[0] === "reload")
    {
        reloadCommands();
        message.reply("Comandos actualizados");
    }
});

client.login(Config.token);