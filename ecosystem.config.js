"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = [
    {
        name: 'my-app',
        script: 'src/index.ts',
        instances: 1,
        autorestart: true,
        watch: true,
        interpreter: 'ts-node',
        interpreter_args: '--project tsconfig.json',
        env: {
            NODE_ENV: 'development',
        },
        env_production: {
            NODE_ENV: 'production',
        },
    },
];
export const apps = config;
