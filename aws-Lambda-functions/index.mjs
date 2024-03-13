import { DynamoDBClient, GetItemCommand, DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient();
const dynamo = DynamoDBDocument.from(new DynamoDB());

export const handler = async (event) => {
    try {
        console.log('Received event:', JSON.stringify(event, null, 2));
        const timestamp = new Date().getTime();
        const operation = event.operation;
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        const uuid = `${s4()}${s4()}-${s4()}-4${s4().substring(0, 3)}-${s4()}-${s4()}${s4()}${s4()}`;
        let payload = event.data || {}; // Ensure payload is initialized
        switch (operation) {
            case 'create':
                if (event.data && event.data.Email) {
                    const createParams = {
                        TableName: event.tableName || 'btInvoice',
                        Item: {
                            Id: uuid,
                            Email: event.data.Email,
                            EntityType: event.data.EntityType,
                            Password: event.data.Password,
                            UserName: event.data.UserName,
                            checked: false,
                            createdAt: timestamp,
                            updatedAt: timestamp,
                        },
                    };
                    await dynamo.put(createParams);
                    return { statusCode: 200, body: JSON.stringify({ message: 'Item created successfully' }) };
                } else {
                    return { statusCode: 400, body: JSON.stringify({ error: 'Email property is missing in the event data' }) };
                }
            case 'read':
              if (event.UserName) {
                const queryParams = {
                  TableName: event.tableName || 'btInvoice',
                  KeyConditionExpression: '#UserName = :UserName',
                  ExpressionAttributeNames: {
                    '#UserName': 'UserName'
                  },
                  ExpressionAttributeValues: {
                    ':UserName': event.UserName
                  }
                };
                const response = await dynamo.query(queryParams);
                console.log(response.Items);
                if (response.Count > 0) {
                  return { statusCode: 200, body: JSON.stringify(response.Items) };
                } else {
                  return { statusCode: 404, body: JSON.stringify({ error: 'No matching items found' }) };
                }
              } else {
                return { statusCode: 400, body: JSON.stringify({ error: 'UserName property is missing in the event data' }) };
              }
            case 'update':
                return await dynamo.update(payload);
            case 'delete':
                return await dynamo.delete(payload);
            case 'list':
                const listParams = {
                    TableName: event.tableName || 'btInvoice',
                };
                const response = await dynamo.scan(listParams);
                return { statusCode: 200, body: JSON.stringify(response) };
            default:
                throw new Error(`Unrecognized operation "${operation}"`);
        }
    } catch (error) {
        console.error('Error processing Lambda function:', error);
        // return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
