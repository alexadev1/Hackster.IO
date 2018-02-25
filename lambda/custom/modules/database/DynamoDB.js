const AWS = require('aws-sdk')

module.exports = class DynamoDB {
   constructor(configuration)
   {
       AWS.config.update(configuration);
       
       this.DynamoDB = new AWS.DynamoDB();
       this.DocClient = new AWS.DynamoDB.DocumentClient();

       this.BatchLimit = 25; //AWS LIMIT */
   }

   Select()
   {

   }

   _Parser(query)
   {
       var parse = query.split(' ');
       var type = parse[0];

       var table = null;
       var fields = null;

       var filter = false;

       var queryType = 'scan';

       switch(type){
           case 'SELECT':
               fields = parse[1];
               table = parse[3];
               if (parse.length>4)
               {
                   if(parse[4]=="WHERE")
                   {
                       filter = true;
                   }
               }
               break;
           case 'UPDATE':
               break;
           case 'INSERT':
               break;
           case 'CREATE':
               break;
       }

       var tempFields = fields.split(',');
       
       var ExpressionAtrributeNames = new Object();

       for (var field in tempFields)
       {
           var fieldName = '#'+tempFields[field];

           ExpressionAtrributeNames[fieldName] = tempFields[field];
           tempFields[field] = fieldName;
       }

       var ProjectionExpression = tempFields.join(',');

       var params = new Object();

       params.TableName = table;
       params.ProjectionExpression = ProjectionExpression;
       params.ExpressionAttributeNames = ExpressionAtrributeNames;
      
       //Temporary quick solution
       if (filter) //For this section need cycle for all filters
       {
           queryType = 'query';

           params.ExpressionAttributeValues = new Object();


           var filterParse = this._FilterParser(parse[5]);
           
           var filterField = '#'+filterParse[0];
           var filterExpression = ':'+filterParse[0];
           var filterValue = filterParse[1];
           var filterType = filterParse[2];

           if (ExpressionAtrributeNames[filterField]==undefined)
           {
               ExpressionAtrributeNames[filterField] = filterValue;
           }

           params.KeyConditionExpression = filterField+filterType+filterExpression;
           params.ExpressionAttributeValues[filterExpression] = filterValue;
       }

      this.DocClient[queryType](params,function(err,data){
          console.log(data);
      });
     //this.DocClient.scan(params, function(err, data) {
     // console.log(data);
    //});
    
//console.log(fields);
   }

   _FilterParser(filter)
   {
       var parse = filter.split('=');
       parse[2] = '=';
       return parse;

   }

   _SelectAll()
   {

   }

   _isset(variable)
   {
        if (variable !== undefined && variable != null && variable != "") {
            return true;
        }
        else 
        {
            return false;
        }
   }
}


