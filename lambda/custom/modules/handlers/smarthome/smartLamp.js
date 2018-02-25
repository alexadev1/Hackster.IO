const uuidv4 = require('uuid/v4');


   console.log(__dirname);

//t.Publish('inTopic',JSON.stringify({"action":"on","value":0}));
//t.Close();

var smartLamp = {
    'Alexa.PowerController.TurnOn':function(request,context,callback){
        var d = new Date();
        var contextResult = {
            "properties": [{
                "namespace": "Alexa.PowerController",
                "name": "powerState",
                "value": "ON",
                "timeOfSample": d, //retrieve from result.
                "uncertaintyInMilliseconds": 500
            }]
        };
        
        var responseHeader = request.directive.header;
        
        responseHeader.namespace = "Alexa";
        responseHeader.name = "Response";
        responseHeader.messageId = uuidv4();//responseHeader.messageId + "-R";
        
        var response = {
            context: contextResult,
            event: {
                header: responseHeader,
                payload: {}
            }
            

        };
        
        const modules = require(__dirname+'/../../../modules.js');
        const mqtt = require(modules.IoT.MQTT);
        
        let t = new mqtt(modules.Configuration.iot.mqtt);
       
        t.SendMessage('inTopic',JSON.stringify({"action":"on","value":1023}),function(){
            callback(context,response);
        });
       // t.Subscribe('inTopic',function(topic,message){console.log(message);})
        
        //t.Publish('inTopic',JSON.stringify({"action":"on","value":1023}));
        //t.Close();
        
        console.log("Turn On");
        //callback(context,response);
        //return response;
    },
    'Alexa.BrightnessController.SetBrightness':function(request,context,callback)
    {
        var d = new Date();
        var contextResult = {
            "properties": [{
                "namespace": "Alexa.BrightnessController",
                "name": "brightness",
                "value": request.directive.payload.brightness,
                "timeOfSample": d, //retrieve from result.
                "uncertaintyInMilliseconds": 500
            }]
        };
        
        var responseHeader = request.directive.header;
        
        responseHeader.namespace = "Alexa";
        responseHeader.name = "Response";
        responseHeader.messageId = uuidv4();
        
        var response = {
            context: contextResult,
            event: {
                header: responseHeader,
                payload: {}
            }
            

        };
        
        
        const modules = require(__dirname+'/../../../modules.js');
        const mqtt = require(modules.IoT.MQTT);
        
        let t = new mqtt(modules.Configuration.iot.mqtt);

        //t.Subscribe('inTopic',function(topic,message){console.log(message);})
        
        //t.Publish('inTopic',JSON.stringify({"action":"on","value":0}));
        //t.Close();
        
        var brightness = parseInt(request.directive.payload.brightness)*10;
        
        if (brightness>1022)
        {
            brightness=1022;
        }
        
        if (brightness<10)
        {
            brightness = 0;
        }
        
         t.SendMessage('inTopic',JSON.stringify({"action":"on","value":brightness}),function(){
             callback(context,response);
         });
        
        //callback(context,response);
        
    },
    'Alexa.PowerController.TurnOff':function(request,context,callback){
        var d = new Date();
        var contextResult = {
            "properties": [{
                "namespace": "Alexa.PowerController",
                "name": "powerState",
                "value": "OFF",
                "timeOfSample": d, //retrieve from result.
                "uncertaintyInMilliseconds": 500
            }]
        };
        
        var responseHeader = request.directive.header;
        
        responseHeader.namespace = "Alexa";
        responseHeader.name = "Response";
        responseHeader.messageId = uuidv4();//responseHeader.messageId + "-R";
        
        var response = {
            context: contextResult,
            event: {
                header: responseHeader,
                payload: {}
            }
            

        };
        
        const modules = require(__dirname+'/../../../modules.js');
        const mqtt = require(modules.IoT.MQTT);
        
        
        let t = new mqtt(modules.Configuration.iot.mqtt);

        //t.Subscribe('inTopic',function(topic,message){console.log(message);})
        
        //t.Publish('inTopic',JSON.stringify({"action":"on","value":0}));
        //t.Close();
        
         t.SendMessage('inTopic',JSON.stringify({"action":"on","value":0}),function(){
             callback(context,response);
         });
        
        console.log("Turn Off");
        
        
        //return response;
        
    }
};

module.exports = smartLamp;