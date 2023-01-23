import {initConfig, Config} from './src/Configuration';
import { reloadCommands } from './src/Commands';
import { Globals } from './src/Globals';
import Discord from 'discord.js';

initConfig();
reloadCommands();

var client:Discord.Client = new Discord.Client({intents: ['GUILDS', 'GUILD_MESSAGES']});

client.on('ready', () => 
{
    console.log("Estamos ready pa");
    client.user?.setPresence({status: 'online', activities: [{name: Config.presence}]});
});

client.on('messageCreate', (message) =>
{
    let args = message.content.substring(Config.defaultPrefix.length).split(" ");

    if (message.author.bot) return;

    Globals.loadedCommands.forEach((command) =>
    {
        command.onMessage(message);
    });

    if (args[0] === "reload")
    {
        reloadCommands();
        message.reply("Comandos actualizados");
    }

    if (args[0] === "shutdown")
    {
        if (Config.adminIDS.includes(parseInt(message.author.id)))
        {
            message.reply("kys").then(() => 
            {
                client.user?.setPresence({status: 'invisible'});
                client.destroy();
                process.exit();
            });
        }
        else
        {
            message.reply("No tienes permiso para apagar el bot");
        }
    }
});

client.login(Config.token);