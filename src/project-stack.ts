import { Stack, StackProps, Construct } from '@aws-cdk/core';
import { LambdaExample } from './lambdas/example';

export default class ProjectStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        new LambdaExample(this, 'Example');
    }
}
