# WebSocket Chat Server Deployment Guide

This guide covers deploying your standalone WebSocket server to a PaaS and connecting it to your Next.js application.

## 📁 Project Structure

```
websocket-server/
├── server.js
├── package.json
├── .env
├── .env.example
├── prisma/
│   └── schema.prisma (copy from your Next.js app)
└── README.md
```

## 🚀 Quick Start

### 1. Set Up WebSocket Server Locally

```bash
# Create a new directory for the WebSocket server
mkdir websocket-server
cd websocket-server

# Initialize npm
npm init -y

# Install dependencies
npm install express socket.io @prisma/client cors
npm install -D nodemon prisma

# Copy Prisma schema from your Next.js app
mkdir prisma
cp ../your-nextjs-app/prisma/schema.prisma ./prisma/

# Generate Prisma client
npx prisma generate
```

### 2. Create server.js

Copy the `server.js` file from the artifact above.

### 3. Configure Environment Variables

Create a `.env` file:

```env
PORT=3001
DATABASE_URL="your-database-connection-string"
ALLOWED_ORIGINS="http://localhost:3000"
```

### 4. Test Locally

```bash
# Start the server
npm run dev

# Or for production
npm start
```

The server should start on `http://localhost:3001`

## ☁️ Deploy to PaaS

### Option 1: Railway

1. **Install Railway CLI**
```bash
npm i -g @railway/cli
```

2. **Login and Initialize**
```bash
railway login
railway init
```

3. **Set Environment Variables**
```bash
railway variables set DATABASE_URL="your-database-url"
railway variables set ALLOWED_ORIGINS="https://yourdomain.com"
```

4. **Deploy**
```bash
railway up
```

5. **Get Your WebSocket URL**
```bash
railway domain
```

### Option 2: Render

1. **Create `render.yaml`**
```yaml
services:
  - type: web
    name: websocket-chat-server
    env: node
    buildCommand: npm install && npx prisma generate
    startCommand: npm start
    envVars:
      - key: DATABASE_URL
        sync: false
      - key: ALLOWED_ORIGINS
        sync: false
```

2. **Deploy via Render Dashboard**
   - Connect your Git repository
   - Render will auto-deploy on push
   - Set environment variables in the dashboard

### Option 3: Heroku

1. **Create Heroku App**
```bash
heroku create your-websocket-server
```

2. **Set Environment Variables**
```bash
heroku config:set DATABASE_URL="your-database-url"
heroku config:set ALLOWED_ORIGINS="https://yourdomain.com"
```

3. **Deploy**
```bash
git push heroku main
```

### Option 4: DigitalOcean App Platform

1. **Create `app.yaml`**
```yaml
name: websocket-chat-server
services:
- name: web
  github:
    repo: your-username/your-repo
    branch: main
  build_command: npm install && npx prisma generate
  run_command: npm start
  envs:
  - key: DATABASE_URL
  - key: ALLOWED_ORIGINS
```

2. Deploy via DigitalOcean dashboard

### Option 5: Fly.io

1. **Install Fly CLI**
```bash
curl -L https://fly.io/install.sh | sh
```

2. **Launch App**
```bash
fly launch
```

3. **Set Secrets**
```bash
fly secrets set DATABASE_URL="your-database-url"
fly secrets set ALLOWED_ORIGINS="https://yourdomain.com"
```

4. **Deploy**
```bash
fly deploy
```

## 🔗 Connect Next.js App

### 1. Update Next.js Environment Variables

Create/update `.env.local` in your Next.js app:

```env
# For development
NEXT_PUBLIC_WEBSOCKET_URL=http://localhost:3001

# For production (update with your deployed URL)
# NEXT_PUBLIC_WEBSOCKET_URL=https://your-websocket-server.railway.app
```

### 2. Update Production Environment

In your Next.js hosting platform (Vercel, Netlify, etc.):

```env
NEXT_PUBLIC_WEBSOCKET_URL=https://your-websocket-server.railway.app
```

### 3. Update CORS Settings

In your deployed WebSocket server, set `ALLOWED_ORIGINS`:

```env
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## 🔒 Security Best Practices

1. **Always use HTTPS in production**
   - Most PaaS providers automatically provide SSL
   - Use `wss://` protocol for WebSocket connections

2. **Restrict CORS origins**
   ```env
   ALLOWED_ORIGINS=https://yourdomain.com,https://admin.yourdomain.com
   ```

3. **Add Rate Limiting** (optional)
   ```javascript
   // In server.js, add rate limiting
   const rateLimit = require('express-rate-limit');
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100
   });
   
   app.use('/health', limiter);
   ```

4. **Environment Variables**
   - Never commit `.env` files
   - Use platform-specific secret management

## 🧪 Testing the Connection

### Test Health Endpoint

```bash
curl https://your-websocket-server.railway.app/health
```

Expected response:
```json
{
  "status": "ok",
  "activeConnections": 0,
  "timestamp": "2025-10-02T12:00:00.000Z"
}
```

### Test WebSocket Connection

```javascript
// In browser console
const socket = io('https://your-websocket-server.railway.app', {
  transports: ['websocket', 'polling']
});

socket.on('connect', () => {
  console.log('Connected!', socket.id);
});
```

## 📊 Monitoring

### Add Logging (Optional)

```bash
npm install winston
```

```javascript
// In server.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});

// Use logger instead of console.log
logger.info('WebSocket server running');
```

### Health Monitoring

Set up uptime monitoring with:
- UptimeRobot
- Pingdom
- Better Uptime

Monitor the `/health` endpoint.

## 🐛 Troubleshooting

### Connection Issues

1. **CORS Error**
   - Check `ALLOWED_ORIGINS` includes your frontend URL
   - Ensure no trailing slashes in URLs

2. **WebSocket Connection Failed**
   - Verify `NEXT_PUBLIC_WEBSOCKET_URL` is correct
   - Check if server is running (`/health` endpoint)
   - Try using polling: `transports: ['polling', 'websocket']`

3. **Database Connection Error**
   - Verify `DATABASE_URL` is correct
   - Run `npx prisma generate` after deployment
   - Check database allows connections from PaaS IP

### Performance Issues

1. **Too Many Connections**
   - Implement connection pooling
   - Add Redis for session management

2. **Message Delays**
   - Use WebSocket transport only
   - Check network latency
   - Consider using a CDN

## 🔄 CI/CD Setup

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy WebSocket Server

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx prisma generate
      # Add your deployment commands here
```

## 📝 Notes

- The WebSocket server and Next.js app share the same database
- Both apps need access to the same `DATABASE_URL`
- Prisma schema must be identical in both projects
- Consider using a monorepo for easier management

## 🆘 Support

If you encounter issues:
1. Check server logs in your PaaS dashboard
2. Verify all environment variables are set
3. Test the `/health` endpoint
4. Check browser console for WebSocket errors