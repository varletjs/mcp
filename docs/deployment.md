# Deployment Guide

## 🚀 Overview

This guide covers different deployment scenarios for Varlet MCP Server, from local development to production environments.

## 📋 Prerequisites

### System Requirements

- **Node.js**: >= 18.0.0 (LTS recommended)
- **Memory**: Minimum 512MB RAM, 1GB+ recommended
- **Storage**: 100MB for installation, additional space for cache
- **Network**: Internet access for API calls and updates

### Supported Platforms

- **macOS**: 10.15+ (Catalina and later)
- **Windows**: 10/11, Windows Server 2019+
- **Linux**: Ubuntu 18.04+, CentOS 7+, Debian 10+
- **Docker**: Any platform supporting Docker

## 🏠 Local Development

### Quick Start

```bash
# Install globally
npm install -g @varlet/mcp

# Or use pnpm (recommended)
pnpm add -g @varlet/mcp

# Verify installation
varlet-mcp-server --version
```

### Development Configuration

1. **Create development config**:
   ```json
   // ~/.config/varlet-mcp/config.json
   {
     "development": true,
     "debug": true,
     "cache": {
       "enabled": true,
       "ttl": 300000,
       "directory": "~/.cache/varlet-mcp-dev"
     },
     "api": {
       "timeout": 10000,
       "retries": 3
     }
   }
   ```

2. **Set environment variables**:
   ```bash
   # Development environment
   export NODE_ENV=development
   export DEBUG=varlet-mcp:*
   export VARLET_VERSION=latest
   export CACHE_TTL=300000
   ```

3. **Configure Claude Desktop**:
   ```json
   {
     "mcpServers": {
       "varlet-ui-dev": {
         "command": "varlet-mcp-server",
         "args": ["--config", "~/.config/varlet-mcp/config.json"],
         "env": {
           "NODE_ENV": "development",
           "DEBUG": "varlet-mcp:*"
         }
       }
     }
   }
   ```

## 🖥️ Desktop Integration

### Claude Desktop

#### macOS Configuration

1. **Install Varlet MCP**:
   ```bash
   npm install -g @varlet/mcp
   ```

2. **Configure Claude Desktop**:
   ```bash
   # Edit configuration file
   nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

3. **Add server configuration**:
   ```json
   {
     "mcpServers": {
       "varlet-ui": {
         "command": "varlet-mcp-server",
         "args": [],
         "env": {
           "VARLET_VERSION": "3.0.0",
           "CACHE_TTL": "3600000",
           "GITHUB_TOKEN": "your_github_token_here"
         }
       }
     }
   }
   ```

4. **Restart Claude Desktop**

#### Windows Configuration

1. **Install using PowerShell**:
   ```powershell
   npm install -g @varlet/mcp
   ```

2. **Configure Claude Desktop**:
   ```powershell
   # Edit configuration file
   notepad $env:APPDATA\Claude\claude_desktop_config.json
   ```

3. **Add server configuration**:
   ```json
   {
     "mcpServers": {
       "varlet-ui": {
         "command": "varlet-mcp-server.cmd",
         "args": [],
         "env": {
           "VARLET_VERSION": "3.0.0",
           "CACHE_TTL": "3600000"
         }
       }
     }
   }
   ```

#### Linux Configuration

1. **Install with package manager**:
   ```bash
   # Using npm
   sudo npm install -g @varlet/mcp
   
   # Using pnpm
   sudo pnpm add -g @varlet/mcp
   
   # Using yarn
   sudo yarn global add @varlet/mcp
   ```

2. **Configure Claude Desktop**:
   ```bash
   # Edit configuration file
   nano ~/.config/Claude/claude_desktop_config.json
   ```

3. **Add server configuration**:
   ```json
   {
     "mcpServers": {
       "varlet-ui": {
         "command": "varlet-mcp-server",
         "args": [],
         "env": {
           "VARLET_VERSION": "3.0.0",
           "CACHE_TTL": "3600000"
         }
       }
     }
   }
   ```

### Other MCP Clients

#### Generic MCP Client

```json
{
  "servers": {
    "varlet-ui": {
      "command": "varlet-mcp-server",
      "args": ["--port", "3000"],
      "capabilities": ["tools", "resources", "prompts"]
    }
  }
}
```

## 🐳 Docker Deployment

### Docker Image

```dockerfile
# Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install global packages
RUN npm install -g @varlet/mcp

# Create cache directory
RUN mkdir -p /app/cache && chown node:node /app/cache

# Switch to non-root user
USER node

# Set environment variables
ENV NODE_ENV=production
ENV CACHE_DIR=/app/cache
ENV CACHE_TTL=3600000

# Expose port (if running as HTTP server)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD varlet-mcp-server --health-check || exit 1

# Start server
CMD ["varlet-mcp-server"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  varlet-mcp:
    build: .
    container_name: varlet-mcp-server
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - VARLET_VERSION=3.0.0
      - CACHE_TTL=3600000
      - GITHUB_TOKEN=${GITHUB_TOKEN}
    volumes:
      - ./cache:/app/cache
      - ./logs:/app/logs
    ports:
      - "3000:3000"
    healthcheck:
      test: ["CMD", "varlet-mcp-server", "--health-check"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### Running with Docker

```bash
# Build image
docker build -t varlet-mcp .

# Run container
docker run -d \
  --name varlet-mcp-server \
  --restart unless-stopped \
  -e VARLET_VERSION=3.0.0 \
  -e CACHE_TTL=3600000 \
  -v $(pwd)/cache:/app/cache \
  -p 3000:3000 \
  varlet-mcp

# Using docker-compose
docker-compose up -d

# View logs
docker logs varlet-mcp-server

# Health check
docker exec varlet-mcp-server varlet-mcp-server --health-check
```

## ☁️ Cloud Deployment

### AWS EC2

#### Launch Instance

1. **Create EC2 instance**:
   - AMI: Amazon Linux 2 or Ubuntu 20.04
   - Instance type: t3.micro (free tier) or t3.small
   - Security group: Allow SSH (22) and HTTP (3000)

2. **Install dependencies**:
   ```bash
   # Amazon Linux 2
   sudo yum update -y
   sudo yum install -y nodejs npm git
   
   # Ubuntu
   sudo apt update
   sudo apt install -y nodejs npm git
   ```

3. **Install Varlet MCP**:
   ```bash
   sudo npm install -g @varlet/mcp
   ```

4. **Create systemd service**:
   ```bash
   sudo nano /etc/systemd/system/varlet-mcp.service
   ```
   
   ```ini
   [Unit]
   Description=Varlet MCP Server
   After=network.target
   
   [Service]
   Type=simple
   User=ec2-user
   WorkingDirectory=/home/ec2-user
   ExecStart=/usr/local/bin/varlet-mcp-server
   Restart=always
   RestartSec=10
   Environment=NODE_ENV=production
   Environment=VARLET_VERSION=3.0.0
   Environment=CACHE_TTL=3600000
   
   [Install]
   WantedBy=multi-user.target
   ```

5. **Start service**:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable varlet-mcp
   sudo systemctl start varlet-mcp
   sudo systemctl status varlet-mcp
   ```

### Google Cloud Platform

#### Cloud Run Deployment

1. **Create Dockerfile** (see Docker section above)

2. **Build and push image**:
   ```bash
   # Build image
   docker build -t gcr.io/PROJECT_ID/varlet-mcp .
   
   # Push to Container Registry
   docker push gcr.io/PROJECT_ID/varlet-mcp
   ```

3. **Deploy to Cloud Run**:
   ```bash
   gcloud run deploy varlet-mcp \
     --image gcr.io/PROJECT_ID/varlet-mcp \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars VARLET_VERSION=3.0.0,CACHE_TTL=3600000
   ```

### Azure Container Instances

```bash
# Create resource group
az group create --name varlet-mcp-rg --location eastus

# Deploy container
az container create \
  --resource-group varlet-mcp-rg \
  --name varlet-mcp-server \
  --image varlet/mcp:latest \
  --dns-name-label varlet-mcp \
  --ports 3000 \
  --environment-variables \
    NODE_ENV=production \
    VARLET_VERSION=3.0.0 \
    CACHE_TTL=3600000
```

### Heroku

1. **Create Heroku app**:
   ```bash
   heroku create varlet-mcp-server
   ```

2. **Configure environment**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set VARLET_VERSION=3.0.0
   heroku config:set CACHE_TTL=3600000
   ```

3. **Deploy**:
   ```bash
   git push heroku main
   ```

## 🔧 Production Configuration

### Environment Variables

```bash
# Production environment
export NODE_ENV=production
export VARLET_VERSION=3.0.0
export CACHE_TTL=3600000
export CACHE_DIR=/var/cache/varlet-mcp
export LOG_LEVEL=info
export LOG_FILE=/var/log/varlet-mcp/server.log
export GITHUB_TOKEN=your_production_token
export API_TIMEOUT=30000
export API_RETRIES=3
export RATE_LIMIT_ENABLED=true
export RATE_LIMIT_MAX=1000
export RATE_LIMIT_WINDOW=3600000
```

### Configuration File

```json
// /etc/varlet-mcp/config.json
{
  "environment": "production",
  "server": {
    "port": 3000,
    "host": "0.0.0.0",
    "timeout": 30000
  },
  "cache": {
    "enabled": true,
    "ttl": 3600000,
    "directory": "/var/cache/varlet-mcp",
    "maxSize": "100MB"
  },
  "logging": {
    "level": "info",
    "file": "/var/log/varlet-mcp/server.log",
    "rotation": {
      "enabled": true,
      "maxSize": "10MB",
      "maxFiles": 5
    }
  },
  "api": {
    "timeout": 30000,
    "retries": 3,
    "rateLimit": {
      "enabled": true,
      "max": 1000,
      "window": 3600000
    }
  },
  "security": {
    "cors": {
      "enabled": true,
      "origins": ["https://claude.ai"]
    },
    "helmet": {
      "enabled": true
    }
  }
}
```

### Systemd Service (Linux)

```ini
# /etc/systemd/system/varlet-mcp.service
[Unit]
Description=Varlet MCP Server
After=network.target
Wants=network-online.target

[Service]
Type=simple
User=varlet-mcp
Group=varlet-mcp
WorkingDirectory=/opt/varlet-mcp
ExecStart=/usr/local/bin/varlet-mcp-server --config /etc/varlet-mcp/config.json
ExecReload=/bin/kill -HUP $MAINPID
Restart=always
RestartSec=10
KillMode=mixed
KillSignal=SIGTERM
TimeoutStopSec=30

# Security settings
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/cache/varlet-mcp /var/log/varlet-mcp

# Environment
Environment=NODE_ENV=production
EnvironmentFile=-/etc/varlet-mcp/environment

[Install]
WantedBy=multi-user.target
```

### Process Manager (PM2)

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'varlet-mcp-server',
    script: 'varlet-mcp-server',
    args: '--config /etc/varlet-mcp/config.json',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      VARLET_VERSION: '3.0.0',
      CACHE_TTL: '3600000'
    },
    error_file: '/var/log/varlet-mcp/error.log',
    out_file: '/var/log/varlet-mcp/out.log',
    log_file: '/var/log/varlet-mcp/combined.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024'
  }]
};
```

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup startup script
pm2 startup
```

## 🔒 Security Considerations

### Network Security

1. **Firewall Configuration**:
   ```bash
   # UFW (Ubuntu)
   sudo ufw allow ssh
   sudo ufw allow 3000/tcp
   sudo ufw enable
   
   # iptables
   sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
   sudo iptables -A INPUT -p tcp --dport 3000 -j ACCEPT
   sudo iptables -A INPUT -j DROP
   ```

2. **Reverse Proxy (Nginx)**:
   ```nginx
   # /etc/nginx/sites-available/varlet-mcp
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **SSL/TLS with Let's Encrypt**:
   ```bash
   # Install certbot
   sudo apt install certbot python3-certbot-nginx
   
   # Get certificate
   sudo certbot --nginx -d your-domain.com
   ```

### Application Security

1. **User Permissions**:
   ```bash
   # Create dedicated user
   sudo useradd -r -s /bin/false varlet-mcp
   sudo mkdir -p /var/cache/varlet-mcp /var/log/varlet-mcp
   sudo chown varlet-mcp:varlet-mcp /var/cache/varlet-mcp /var/log/varlet-mcp
   ```

2. **Environment Variables**:
   ```bash
   # Secure environment file
   sudo nano /etc/varlet-mcp/environment
   sudo chmod 600 /etc/varlet-mcp/environment
   sudo chown varlet-mcp:varlet-mcp /etc/varlet-mcp/environment
   ```

3. **Log Rotation**:
   ```bash
   # /etc/logrotate.d/varlet-mcp
   /var/log/varlet-mcp/*.log {
       daily
       missingok
       rotate 30
       compress
       delaycompress
       notifempty
       create 644 varlet-mcp varlet-mcp
       postrotate
           systemctl reload varlet-mcp
       endscript
   }
   ```

## 📊 Monitoring and Logging

### Health Checks

```bash
# Built-in health check
varlet-mcp-server --health-check

# HTTP health endpoint
curl http://localhost:3000/health

# Detailed status
curl http://localhost:3000/status
```

### Monitoring with Prometheus

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'varlet-mcp'
    static_configs:
      - targets: ['localhost:3000']
    metrics_path: '/metrics'
    scrape_interval: 30s
```

### Log Aggregation

```yaml
# docker-compose.yml (with ELK stack)
version: '3.8'
services:
  varlet-mcp:
    # ... existing config
    logging:
      driver: "fluentd"
      options:
        fluentd-address: localhost:24224
        tag: varlet-mcp
```

## 🔄 Backup and Recovery

### Cache Backup

```bash
#!/bin/bash
# backup-cache.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backup/varlet-mcp"
CACHE_DIR="/var/cache/varlet-mcp"

mkdir -p "$BACKUP_DIR"
tar -czf "$BACKUP_DIR/cache_$DATE.tar.gz" -C "$CACHE_DIR" .

# Keep only last 7 days
find "$BACKUP_DIR" -name "cache_*.tar.gz" -mtime +7 -delete
```

### Configuration Backup

```bash
#!/bin/bash
# backup-config.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backup/varlet-mcp"
CONFIG_DIR="/etc/varlet-mcp"

mkdir -p "$BACKUP_DIR"
cp -r "$CONFIG_DIR" "$BACKUP_DIR/config_$DATE"
```

### Automated Backups

```bash
# Add to crontab
crontab -e

# Backup cache daily at 2 AM
0 2 * * * /opt/varlet-mcp/scripts/backup-cache.sh

# Backup config weekly
0 3 * * 0 /opt/varlet-mcp/scripts/backup-config.sh
```

## 🚀 Performance Optimization

### Caching Strategy

```json
{
  "cache": {
    "enabled": true,
    "ttl": 3600000,
    "maxSize": "500MB",
    "compression": true,
    "strategy": "lru",
    "persistence": true
  }
}
```

### Resource Limits

```bash
# systemd service limits
[Service]
LimitNOFILE=65536
LimitNPROC=4096
MemoryMax=1G
CPUQuota=200%
```

### Load Balancing

```nginx
# nginx load balancer
upstream varlet_mcp {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
}

server {
    location / {
        proxy_pass http://varlet_mcp;
    }
}
```

## 📋 Deployment Checklist

### Pre-deployment

- [ ] System requirements met
- [ ] Dependencies installed
- [ ] Configuration files prepared
- [ ] Environment variables set
- [ ] Security measures implemented
- [ ] Backup strategy planned
- [ ] Monitoring configured

### Deployment

- [ ] Application installed
- [ ] Configuration applied
- [ ] Service started
- [ ] Health checks passing
- [ ] Logs being generated
- [ ] Cache directory writable
- [ ] Network connectivity verified

### Post-deployment

- [ ] Functionality tested
- [ ] Performance monitored
- [ ] Logs reviewed
- [ ] Backups verified
- [ ] Documentation updated
- [ ] Team notified

---

**Need help with deployment?** Check our [troubleshooting guide](troubleshooting.md) or [create an issue](https://github.com/varletjs/varlet-mcp/issues/new).