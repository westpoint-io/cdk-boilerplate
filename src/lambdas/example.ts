import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { Construct } from '@aws-cdk/core';

export class Example extends Construct {
    public readonly func: NodejsFunction;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.func = new NodejsFunction(this, 'function', {
            functionName: 'Example Function',
            entry: './lambdas/example/index.ts',
            bundling: {
                target: 'es2020',
                keepNames: true,
                externalModules: ['aws-sdk'],
                nodeModules: ['loglevel'],
            },
        });
    }
}
