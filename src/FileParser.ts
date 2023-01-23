// Custom file parser following my custom option file code and modifying it with new syntax and shit

import fs from 'fs';
import { Globals } from './Globals';

export function parseFile(pathArray:Array<string>)
{
    var returnObjects:Array<any> = [];
    var path = pathArray.join("/");
    if (!fs.existsSync(path))
        throw new Error(`A module tried to get ${path} but it doesn't exist`);

    var fileLines = fs.readFileSync(path, {encoding: 'utf-8'}).trim().split("\n");
    fileLines.forEach((line:string) =>
    {
        // - 1 to remove the ( / + 1 to get the full class "Funky()"
        var classType:string = line.substring(0, line.indexOf(")") - 1).trim();
        var classInstance:object = Reflect.construct(Reflect.get(Globals, classType), []);

        var classFields:Array<string> = line.substring(line.indexOf("{") + 1, line.indexOf("}")).trim().split(",");
        classFields.forEach((field:string) =>
        {
            field = field.trim();
            // + 1 to remove the ( / leave alone to get the full field()
            var classFieldArguments:Array<string> = field.substring(field.indexOf("(") + 1, field.indexOf(")")).split("-");
            var classField:string = field.substring(0, field.lastIndexOf("("));

            Reflect.set(classInstance, classField, classFieldArguments);
        });

        returnObjects.push(classInstance);
    });

    return returnObjects;
}