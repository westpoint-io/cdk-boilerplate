#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import Project from '../src/project-stack';

const app = new cdk.App();

new Project(app, 'Project');
