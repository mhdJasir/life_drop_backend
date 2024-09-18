import  Apps  from 'pm2';

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

module.exports = { apps: config };
