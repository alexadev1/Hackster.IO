'use strict';
var Alexa = require("alexa-sdk");


const modules = require(__dirname+'/modules.js')
const SkillHandler = require(modules.Handlers);
// For detailed tutorial on how to making a Alexa skill,
// please visit us at http://alexa.design/build

exports.handler = function(event, context) {
    
    if (IdentifySkill(event, modules.IdentifySkill.Custom))
    {
        var alexa = Alexa.handler(event, context);
        
        let Handlers = new SkillHandler(modules.SkillType.Custom);
        
        const handlers = Handlers.GetAll();
        
        alexa.registerHandlers.apply(null,handlers);
        
        alexa.execute();
    }
    else if (IdentifySkill(event, modules.IdentifySkill.SmartHome))
    {
        let Handlers = new SkillHandler(modules.SkillType.SmartHome);
        
        Handlers.SetRequest(event);
        Handlers.SetContext(context);
        
        Handlers.Start();
        //console.log(event);
    }
};

function IdentifySkill(source,type)
{
   return Validator(source, type);
}

function Validator(object,source)
{
    var path = source.split('/');
    
    var temp = object;
    
    var status = true;
    
    for (var index in path)
    {
        if(temp[path[index]]!=undefined)
        {
            temp = object[path[index]];
        }
        else
        {
            status = false;
            break;
        }
    }
    
    return status;
}
