import log from 'loglevel';
import { DynamoDB } from 'aws-sdk';

const dynamo = new DynamoDB();

export const handler = async (event: WestpointLambda.EventBodyToJSON): Promise<WestpointLambda.Response> => {
    log.enableAll();
    log.log('event: ', event);

    log.log(await dynamo.listTables().promise());

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ok: true }),
    };
};
