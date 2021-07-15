import express, { Request } from 'express';
import QueryString from 'qs';
import * as AWS from 'aws-sdk';
import { join } from 'path';
import { existsSync } from 'fs';
import chalk from 'chalk';
import notifier from 'node-notifier';
import cors from 'cors';

import api from './api';

const configurationFilePath = join(process.cwd(), 'server/config.json');

if (!existsSync(configurationFilePath)) {
    notifier.notify({
        type: 'error',
        message: 'Missing AWS Configuration file',
    });
    process.exit(1);
}

AWS.config.loadFromPath(configurationFilePath);

const app = express();

app.use(express.json());
app.use(cors());

function expressToLambda(req: Request<any, any, any, QueryString.ParsedQs, Record<string, any>>) {
    return {
        body: JSON.stringify(req.body),
        path: req.path,
        httpMethod: req.method,
        queryStringParameters: req.query,
        headers: req.headers,
    };
}

app.all('*', async (req, res) => {
    const { path, method } = req;

    const route = api.find(r => r.path === path && r.method === method);

    if (!route) {
        return res.status(404).json({ message: `${method} ${path} not found` });
    }

    try {
        const { handler } = await import(`../lambda/${route.directory}/index`);
        const result = await handler(expressToLambda(req));
        return res.status(result.statusCode).json(JSON.parse(result.body));
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

const port = 3333;

app.listen(port, () => {
    notifier.notify({
        type: 'info',
        message: `server started at http://localhost:${port}`,
    });

    console.log(chalk.cyan(`server started at http://localhost:${port}`));
});
