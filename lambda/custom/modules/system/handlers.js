const fs = require('fs');

const modules = require('../../modules.js')

module.exports = class Handlers{
      
      constructor(handlerType)
      {
          if (handlerType==undefined)
          {
              this.type="custom";
          }
          else
          {
              this.type=handlerType;
          }
          
      }
      
      Start()
      {
          console.log(JSON.stringify(this.request));
          //console.log(this.context);
          
          var namespace = this.request.directive.header.namespace;
          var name = this.request.directive.header.name;
          
          var handlerName = "";
          
          if (name!=undefined && namespace!=undefined)
          {
              handlerName = namespace+'.'+name;
          }
          
          this.RegisterAll();
          
          var handlerFunc = null;
          
          console.log(handlerName);
          
          for (var i in this.handlers)
          {
              if (this.handlers[i][handlerName])
              {
                  handlerFunc = this.handlers[i][handlerName];
                  break;
              }
          }
          
          handlerFunc(this.request,this.context,this.Answer);
          
          
      }
      
      Answer(context,result)
      {
          context.succeed(result);
      }
      
      RegisterAll()
      {
        this.handlers = this.GetAll();
      }
      
      SetRequest(request)
      {
          this.request = request;
      }
    
      SetContext(context)
      {
          this.context = context;
      }
      
      GetAll()
      {
        var folderHandler = modules.HandlersFolder; //Default folder
        
        if (this.type=="smarthome")
        {
            folderHandler = modules.HandlersFolderSmartHome;
        }            
        
        var handlersFiles = fs.readdirSync(folderHandler);

        var handlers = Array();
        
        for (var handler in handlersFiles)
        {
            var fullPath = folderHandler+handlersFiles[handler];
            handlers.push(require(fullPath));
        }

        return handlers;
        
      }
};

