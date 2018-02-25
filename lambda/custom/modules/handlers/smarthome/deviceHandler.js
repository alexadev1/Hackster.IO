var deviceHandler = {
    'Alexa.Discovery.Discover': function(request, context,callback){
        var payload = {
            "endpoints":
            [
                {
                "endpointId": "endpoint-036",
                "manufacturerName": "Temperature sensor",
                "friendlyName": "Temperature sensor",
                "description": "Temperature sensor",
                "displayCategories": [
                    "OTHER"
                ],
                "cookie": {},
                "capabilities": [
                    {
                        "type": "AlexaInterface",
                        "interface": "Alexa.TemperatureSensor",
                        "version": "3",
                        "properties": {
                            "supported": [
                                {
                                    "name": "temperature"
                                }
                            ],
                            "proactivelyReported": false,
                            "retrievable": false
                        }
                    },
                    {
                        "type": "AlexaInterface",
                        "interface": "Alexa",
                        "version": "3"
                    }
                ]
           },
                {
                "endpointId": "endpoint-035",
                "manufacturerName": "Handmade power socket",
                "friendlyName": "Power Socket 3",
                "description": "Power Socket",
                "displayCategories": [
                    "SWITCH"
                ],
                "cookie": {},
                "capabilities": [
                    {
                        "type": "AlexaInterface",
                        "interface": "Alexa.PowerController",
                        "version": "3",
                        "properties": {
                            "supported": [
                                {
                                    "name": "powerState"
                                }
                            ],
                            "proactivelyReported": false,
                            "retrievable": false
                        }
                    },
                    {
                        "type": "AlexaInterface",
                        "interface": "Alexa",
                        "version": "3"
                    }
                ]
           },
                {
                "endpointId": "endpoint-034",
                "manufacturerName": "Handmade power socket",
                "friendlyName": "Power Socket 2",
                "description": "Power Socket",
                "displayCategories": [
                    "SWITCH"
                ],
                "cookie": {},
                "capabilities": [
                    {
                        "type": "AlexaInterface",
                        "interface": "Alexa.PowerController",
                        "version": "3",
                        "properties": {
                            "supported": [
                                {
                                    "name": "powerState"
                                }
                            ],
                            "proactivelyReported": false,
                            "retrievable": false
                        }
                    },
                    {
                        "type": "AlexaInterface",
                        "interface": "Alexa",
                        "version": "3"
                    }
                ]
           },
                {
                "endpointId": "endpoint-033",
                "manufacturerName": "Handmade power socket",
                "friendlyName": "Power Socket 1",
                "description": "Power Socket",
                "displayCategories": [
                    "SWITCH"
                ],
                "cookie": {},
                "capabilities": [
                    {
                        "type": "AlexaInterface",
                        "interface": "Alexa.PowerController",
                        "version": "3",
                        "properties": {
                            "supported": [
                                {
                                    "name": "powerState"
                                }
                            ],
                            "proactivelyReported": false,
                            "retrievable": false
                        }
                    },
                    {
                        "type": "AlexaInterface",
                        "interface": "Alexa",
                        "version": "3"
                    }
                ]
           },
                {
                "endpointId": "endpoint-032",
                "manufacturerName": "Handmade lamp",
                "friendlyName": "Lamp",
                "description": "Smart lamp",
                "displayCategories": [
                    "LIGHT"
                ],
                "cookie": {},
                "capabilities": [
                    {
                        "type": "AlexaInterface",
                        "interface": "Alexa.PowerController",
                        "version": "3",
                        "properties": {
                            "supported": [
                                {
                                    "name": "powerState"
                                }
                            ],
                            "proactivelyReported": false,
                            "retrievable": false
                        }
                    },
                    {
                        "type": "AlexaInterface",
                        "interface": "Alexa.BrightnessController",
                        "version": "3",
                        "properties": {
                            "supported": [
                                {
                                    "name": "brightness"
                                }
                            ],
                            "proactivelyReported": false,
                            "retrievable": false
                        }
                    },
                    {
                        "type": "AlexaInterface",
                        "interface": "Alexa",
                        "version": "3"
                    }
                ]
           },
           {
                    "endpointId": "demo_id_534",
                    "manufacturerName": "Handmade",
                    "friendlyName": "Teapot",
                    "description": "Smart Teapot",
                    "displayCategories": ["MICROWAVE"],
                    "cookie": {
                    },
                    "capabilities":
                    [
                        {
                          "type": "AlexaInterface",
                          "interface": "Alexa",
                          "version": "3"
                        },
                        {
                            "interface": "Alexa.BrightnessController",
                            "version": "3",
                            "type": "AlexaInterface",
                            "properties": {
                                "supported": [{
                                    "name": "brightness"
                                }],
                                 "retrievable": false
                            }
                        }
                    ]
                }
            ]
        };
        
        var header = request.directive.header;
        
        header.name = "Discover.Response";
        
        var response =  { event: { header: header, payload: payload } };
        
        callback(context,response);
    }
}

module.exports = deviceHandler;
