import Discord from 'discord.js';
import fs from 'fs';
import Path from 'path';

var client:Discord.Client = new Discord.Client({intents: ['GUILDS', 'GUILD_MESSAGES']});

client.on('ready', () => 
{
    console.log("Me gustan las pollas");
    client.user?.setPresence({status: "dnd"});
});

client.on('messageCreate', (msg) =>
{
    if (msg.author.bot) return;

    if (msg.content === "que")
        msg.reply("so");
});

fs.readFile(Path.join(__dirname, "token"), {encoding: 'utf-8'}, (err, data) => {
    client.login(data);
});