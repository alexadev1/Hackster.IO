const config = require('yaml-config');

const release = __dirname+'/conf/release.yaml'

const currentConfig = config.readConfig(release);

if (currentConfig.iot.mqtt!=undefined)
{
    if (currentConfig.iot.mqtt.ca!=undefined)
    {
        currentConfig.iot.mqtt.ca = __dirname+'/'+currentConfig.iot.mqtt.ca;
    }

    if (currentConfig.iot.mqtt.cert!=undefined)
    {
        currentConfig.iot.mqtt.cert = __dirname+'/'+currentConfig.iot.mqtt.cert;
    }

    if (currentConfig.iot.mqtt.key!=undefined)
    {
        currentConfig.iot.mqtt.key = __dirname+'/'+currentConfig.iot.mqtt.key;
    }
}

/*
function test()
{
   console.log(arguments);
}



test.apply(null,[1,2,3]);
*/

module.exports = {
    Configuration: currentConfig,
    Handlers: __dirname+'/modules/system/handlers.js',
    HandlersFolder: __dirname+'/modules/handlers/custom/',
    HandlersFolderSmartHome: __dirname+'/modules/handlers/smarthome/',
    Databases: {
        DynamoDB: __dirname+'/modules/database/DynamoDB.js'
    },
    IoT:{
        MQTT: __dirname+'/modules/iot/mqtt.js'
    },
    SkillType:{
      Custom: 'custom',
      SmartHome: 'smarthome'      
    },
    IdentifySkill:{
        Custom: 'session',
        SmartHome: 'directive'
    }
}