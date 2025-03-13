import dotenv from 'dotenv';

dotenv.config();

export const app = {
  domain: process.env.APP_DOMAIN || 'localhost',
  port: process.env.APP_PORT || '3000',
  env: process.env.APP_ENV || 'local',
};

export const jwt = {
  key: 'key-koa-base-template',
  secret: 'secret-koa-base-template',
  expiresIn: '30s',
};

export const cors = {
  allowMethods: 'GET, POST, PUT, PATCH, DELETE',
};

export const mongo = {
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017/koa-base-template',
};

export const swagger = {
  routePrefix: '/docs',
};

export const helmet = {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdnjs.cloudflare.com'], // 允许 swagger-ui-bundle.js 载入
    styleSrc: ["'self'", "'unsafe-inline'", 'https://cdnjs.cloudflare.com'],
    imgSrc: ["'self'", 'data:'],
    fontSrc: ["'self'", 'https://cdnjs.cloudflare.com'],
  },
};
