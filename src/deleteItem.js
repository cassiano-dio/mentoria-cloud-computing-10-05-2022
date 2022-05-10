"use strict";
const AWS = require("aws-sdk");

const fetchItem = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const {itemId} = event.pathParameters

    try {
        const result = await dynamodb.delete({
            TableName: "ItemsTable",
            Key: {itemId}
        }).promise();

        return {
            "statusCode": 200,
            "body": "Item excluído com sucesso!",
        };

    } catch (error) {
        return {
            "statusCode": 200,
            "body": error,
        };
    }
};

module.exports = {
    handler: fetchItem,
};