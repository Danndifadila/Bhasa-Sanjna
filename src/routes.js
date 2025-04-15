import { handler } from '@hapi/hapi/lib/cors.js';
import { getAllTranslationsHandler, getTranslationByIdHandler, addTranslationHandler, getAllTranslationsHistory } from './handlers.js';
import path from 'path';
import fs from 'fs';
import pool from '../database.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const videoUploadPath = path.resolve(__dirname, 'videos');

if (!fs.existsSync(videoUploadPath)) {
  fs.mkdirSync(videoUploadPath);
}

const routes = [
  {
    method: 'POST',
    path: '/translations',
    handler: addTranslationHandler,
    options: {
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data',
        multipart: true,
        maxBytes: 10485760,
      },
  },
},
  {
    method: 'GET',
    path: '/translations',
    handler: getAllTranslationsHandler,
  },
  {
    method:'GET',
    path: '/translations/{id}',
    handler: getTranslationByIdHandler,
  },
  {
    method: 'GET',
    path: '/translations/history',
    handler: getAllTranslationsHistory,
  }
];

export default routes;
