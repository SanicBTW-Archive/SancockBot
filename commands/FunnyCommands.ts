import {parseFile} from '../src/FileParser';
import {Globals} from '../src/Globals';

// expect a rewrite

module.exports = 
{
    messageStorage: [new Globals.Funky()],
    onReload: async function(path:string)
    {
        this.messageStorage = [];
        var funky:Array<Globals.Funky> = await parseFile([path, "data", "phrases.sanco"]) as Globals.Funky[];
        funky.forEach((funkay:Globals.Funky) =>
        {
            if (!this.messageStorage.includes(funkay))
                this.messageStorage.push(funkay);
        });
    },
    onMessage: function(message:any)
    {
        var messageContent:string = message.content.toLowerCase();

        this.messageStorage.forEach((funky:Globals.Funky) =>
        {
            if (funky.messages.includes(messageContent))
            {
                message.reply(funky.answers[Math.floor(Math.random() * funky.answers.length)]);
            }
        });
    }
}