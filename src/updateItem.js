"use strict";

const AWS = require("aws-sdk")

const updateItem = async (event) => {

    const {itemDescription} = JSON.parse(event.body)
    const {itemId} = event.pathParameters

    const dynamodb = new AWS.DynamoDB.DocumentClient()

    try {
        const item  = await dynamodb.update({
                TableName: "ItemsTable",
                Key: {itemId},
                UpdateExpression: 'set itemDescription = :itemDescription',
                ExpressionAttributeValues: {
                    ':itemDescription': itemDescription
                },
                ReturnValues: "ALL_NEW"
        }).promise()

        return {
            "statusCode": 200,
            "body": JSON.stringify(item.Attributes),
        };

    } catch (error) {
        return {
            "statusCode": 400,
            "body": error
        };
    }
};


module.exports = {
    handler:updateItem
}