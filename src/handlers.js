import { nanoid } from 'nanoid';
import translations from './translations.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import pool from '../database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const videoUploadPath = join(__dirname, 'videos');

export const addTranslationHandler = async (request, h) => {
  const { video, text } = request.payload;

  if (!video || !text) {
    return h.response({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Gagal menambahkan terjemahan. Mohon isi video dan teks hasil terjemahan',
    }).code(400);
  }

  const videoPath = join(videoUploadPath, video.hapi.filename);
  const fileStream = fs.createWriteStream(videoPath);
  video.pipe(fileStream);

  try {
    const [result] = await pool.query(
      'INSERT INTO translations (video, text) VALUES (?, ?)',
      [video.hapi.filename, text]
    );

    return h.response({
      statusCode: 201,
      message: 'Terjemahan berhasil ditambahkan',
      data: {
        id: result.insertId,
        video: video.hapi.filename,
        text,
      },
    }).code(201);
  } catch (error) {
    console.error(error);
    return h.response({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Gagal menambahkan data ke database',
    }).code(500);
  }
};

export const getAllTranslationsHandler = (request, h) => {
  return h.response({
    status: 'success',
    data: {
      translations,
    },
  }).code(200);
};


export const getAllTranslationsHistory = async (request, h) => {
  try {
    const [rows] = await pool.query('SELECT * FROM translations');
    return h.response({
      status: 'success',
      data: {
        translations: rows,
      },
    }).code(200);
  } catch (error) {
    console.error(error);
    return h.response({ status: 'error', message: 'Gagal mengambil data' }).code(500); 
  }
};

export const getTranslationByIdHandler = async (request, h) => {
  const { id } = request.params;

  try {
    const [rows] = await pool.execute('SELECT * FROM translations WHERE id = ?', [id]);

    if (rows.length === 0) {
      return h.response({
        status: 'fail',
        message: 'Translation tidak ditemukan',
      }).code(404);
    }

    return h.response({
      status: 'success',
      data: {
        translation: rows[0], 
      },
    }).code(200);
  } catch (error) {
    return h.response({
      status: 'error',
      message: 'Terjadi kesalahan pada server',
      error: error.message,
    }).code(500);
  }
};


