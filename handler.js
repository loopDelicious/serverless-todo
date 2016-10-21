'use strict';

var AWS = require('aws-sdk');
var uuid = require('uuid');

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    })
  };
  callback(null, response);
}

module.exports.getTasks = (event, context, callback) => {
  var docClient = new AWS.DynamoDB.DocumentClient();

  var params = {
    TableName: 'todo',
    FilterExpression: 'title = :task_name',
    ExpressionAttributeValues: {':task_name': event.queryStringParameters.task}
  };

  docClient.scan(params, function(error, data) {
    if (error) {
      callback(error);
    }
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    });
  });
};


module.exports.postTask = (event, context, callback) => {
  var docClient = new AWS.DynamoDB.DocumentClient();

  var params = JSON.parse(event.body);
  var Item = {
    id: uuid.v4(),
    title: params.title,
    completed: params.completed
  };

  docClient.put({TableName: 'todo', Item: Item}, function(error) {
    if (error) {
      callback(error);
    }
    callback(null, {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    });
  });
}


module.exports.deleteTask = (event, context, callback) => {
  var docClient = new AWS.DynamoDB.DocumentClient();

  var Item = {
    id: event.parameters.id
  };

  docClient.delete({TableName: 'todo', Item: Item}, function(error) {
    if (error) {
      callback(null, {
        statusCode: 404,
      });
    }
    callback(null, {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    });
  });
};

module.exports.putTask = (event, context, callback) => {
  var docClient = new AWS.DynamoDB.DocumentClient();

  var Item = {
    id: event.parameters.id,
    title: event.parameters.title,
    complete: event.parameters.complete
  };

  docClient.updateItem({TableName: 'todo', Item: Item}, function(error) {
    if (error) {
      callback(error);
    }
    callback(null, {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    });
  });
};
