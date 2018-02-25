const fs = require('fs')
const mqtt = require('mqtt')


module.exports = class MQTT
{
    constructor(configuration)
    {
         this.host = configuration['host'];
         this.secure  = configuration['tls'];
         this.port = 1883;

         if (this.secure)
         {
             this.cert = fs.readFileSync(configuration['cert']);
             this.ca = fs.readFileSync(configuration['ca']);
             this.key = fs.readFileSync(configuration['key']);
             this.port = 8883

             this.options = {
                port: this.port,
                host: this.host,
                key: this.key,
                cert: this.cert,
                rejectUnauthorized: true,
                ca: this.ca,
                protocol: 'mqtts',
                keepalive: 10000
            }
         }
         else
         {
            this.options = {
                port: this.port,
                host: this.host,
                protocol: 'mqtt'
            }
         }

         //this.__Connect();
    }

    __Connect(callback)
    {
        this.client = mqtt.connect(this.options);
        
        var _this = this;
        
        this.client.on('connect', function(){
                console.log('Connected');
                callback();
            });
    }

    Subscribe(topic,callback)
    {
        this.client.subscribe(topic);
        this.client.on('message', function (topic, message) {
            callback(topic,message.toString());
          })
    }

    Publish(topic,message)
    {
        this.client.publish(topic, message);
    }
    
    SendMessage(topic,message,callback)
    {
        var _this = this;
         this.__Connect(function(){
           _this.client.subscribe(topic);
           _this.client.publish(topic, message);
           _this.Close();
           callback();  
         });
         
    }

    Close()
    {
        this.client.end();
    }
}