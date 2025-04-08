import { nanoid } from 'nanoid';
import translations from './translations.js';
import pool from '../database.js';

export const getAllTranslationsHandler = (request, h) => {
  return h.response({
    status: 'success',
    data: {
      translations,
    },
  }).code(200);
};

export const getAllTranslationsDictionaryHandler = async (request, h) => {
  try {
    const [rows] = await pool.query('SELECT * FROM translations_dictionary');
    return h.response({
      status: 'success',
      data: {
        translations: rows
      },
    }).code(200);
  } catch (error) {
    console.error(error);
    return h.response({ status: 'error', message: 'Gagal mengambil data' }).code(500);
  }
};

export const addTranslationHandler = (request, h) => {
  const { image, text } = request.payload;

  if (!image || !text) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan terjemahan. Mohon isi gambar dan teks hasil terjemahan',
    }).code(400);
  }

  const id = nanoid(16);
  const addedAt = new Date().toISOString();

  const newTranslation = {
    id,
    image,
    text,
    addedAt
  };

  translations.push(newTranslation);

  return h.response({
    status: 'success',
    message: 'Terjemahan berhasil ditambahkan',
    data: {
      translationId: id,
      translation: newTranslation,
    },
  }).code(201);
};

export const addTranslationsDictionaryHandler = async (request, h) => {
  const { image, text } = request.payload;

  
  if (!image || !text) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan terjemahan. Mohon isi gambar dan teks hasil terjemahan',
    }).code(400);
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO translations_dictionary (image, text) VALUES (?, ?)',
      [image, text]
    );

    return h.response({
      status: 'success',
      message: 'Terjemahan berhasil ditambahkan',
      data: {
        translationId: result.insertId, 
        image,
        text
      },
    }).code(201);
  } catch (error) {
    console.error(error);
    return h.response({ status: 'error', message: 'Gagal menambahkan data' }).code(500);
  }
};
