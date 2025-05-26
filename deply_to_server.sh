#!/bin/bash

# Define variables
SERVER_IP="13.202.122.112"     
SSH_USER="ubuntu"                  
PRIVATE_KEY="$HOME/.ssh/id_rsa"   

# Connect and deploy
echo "🚀 Starting deployment to Node.js production server..."

ssh -i $PRIVATE_KEY -o StrictHostKeyChecking=no $SSH_USER@$SERVER_IP << 'EOF'

  echo "🔗 Connected to server!"

  # Navigate to project directory
  cd ~/life_drop_backend || { echo "❌ Project folder not found!"; exit 1; }

  # Pull latest changes from main
  echo "📥 Pulling latest code from main branch..."
  git pull origin main

  sudo npm i
  # Start app and restart services
  echo "🚀 Starting app with PM2..."
  pm2 start ecosystem.config.js --env production

  echo "🔁 Restarting Nginx..."
  sudo systemctl restart nginx

  echo "✅ Deployment complete!"

EOF
