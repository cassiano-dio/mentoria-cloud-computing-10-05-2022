"use strict";
const AWS = require("aws-sdk");

const fetchItem = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const {itemId} = event.pathParameters

    let item;

    try {
        const result = await dynamodb.get({
            TableName: "ItemsTable",
            Key: {itemId}
        }).promise();

        item = result.Item;

        return {
            "statusCode": 200,
            "body": JSON.stringify(item),
        };

    } catch (error) {

        return {
            "statusCode": 400,
            "body": error,
        };
    }

};

module.exports = {
    handler: fetchItem,
};