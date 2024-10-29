module.exports = {
  apps: [
    {
      name: 'life-drop',
      script: 'src/index.ts',                 
      interpreter: './node_modules/.bin/ts-node',  
      watch: false,                            
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production'
      },
    }
  ]
};