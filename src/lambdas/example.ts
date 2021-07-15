import path from 'path';

import { Construct, Duration } from '@aws-cdk/core';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { Runtime } from '@aws-cdk/aws-lambda';
import { config } from 'dotenv';

config();

export class LambdaExample extends Construct {
    public readonly func: NodejsFunction;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.func = new NodejsFunction(scope, 'LambdaExample', {
            runtime: Runtime.NODEJS_14_X,
            entry: path.resolve(__dirname, '..', '..', 'lambdas', 'example', 'index.ts'),
            handler: 'handler',
            timeout: Duration.seconds(30),
        });
    }
}
