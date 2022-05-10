"use strict";

const AWS = require("aws-sdk")

const insertItem = async (event) => {

    const {itemName, itemDescription, itemId} = JSON.parse(event.body);

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    try {
        const newItem = {
            "itemName": itemName,
            "itemDescription": itemDescription,
            "itemId": itemId
        }
    
        await dynamodb.put({
            TableName: "ItemsTable",
            Item: newItem
        }).promise()
    
        return {
            statusCode: 200,
            body: JSON.stringify(newItem),
        };

    } catch (error) {
        
        return {
            "statusCode": 200,
            "body": error,
        };
    }

    
};


module.exports = {
    handler:insertItem
}
