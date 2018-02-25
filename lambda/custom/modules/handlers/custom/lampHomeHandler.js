const modules = require(__dirname+'/../../../modules.js');
const mqtt = require(modules.IoT.MQTT);
        
let t = new mqtt(modules.Configuration.iot.mqtt);



var lampHomeHandler = {
    'CheckKettleStatus' : function() {
        var _this = this;
        var _t = t;
        
        t.Subscribe('outTopic',function(topic,message){
            var volume = parseInt(message);
            if (volume>500 && volume<1600)
            {
                var __this = this;
                _t.SendMessage('inTopic','T_E',function(){
                    __this.response.speak("OK");
                });
            }
            else
            {
                _this.response.speak("Please check water level!");
            }
        });
        //this.response.speak("This is lamp handler");

    }
};

module.exports = lampHomeHandler;