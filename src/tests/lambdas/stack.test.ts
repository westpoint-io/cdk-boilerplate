import '@aws-cdk/assert/jest';

import * as cdk from '@aws-cdk/core';
import ProjectStack from '../../project-stack';

test('Stack exists', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new ProjectStack(app, 'MyTestStack');
    // THEN
    expect(stack).toBeTruthy();
});
