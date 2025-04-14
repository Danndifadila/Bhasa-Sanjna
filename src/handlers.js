import { nanoid } from 'nanoid';
import translations from './translations.js';
import pool from '../database.js';

/**
 * Handler to get all translations from the in-memory translations object.
 */
export const getAllTranslationsHandler = (request, h) => {
  return h.response({
    status: 'success',
    data: {
      translations,
    },
  }).code(200);
};

/**
 * Handler to get all translations from the database table `translations_dictionary`.
 */
export const getAllTranslationsDictionaryHandler = async (request, h) => {
  try {
    const [rows] = await pool.query('SELECT * FROM translations_dictionary');
    return h.response({
      status: 'success',
      data: {
        translations: rows,
      },
    }).code(200);
  } catch (error) {
    console.error('Error fetching translations dictionary:', error);
    return h.response({
      status: 'error',
      message: 'Failed to fetch data',
    }).code(500);
  }
};

/**
 * Handler to add a new translation to the `translations` table.
 */
export const addTranslationHandler = async (request, h) => {
  const { video, text } = request.payload;

  // Validate required fields
  if (!video || !text) {
    return h.response({
      status: 'fail',
      message: 'Failed to add translation. Please provide both video and text.',
    }).code(400);
  }

  const id = nanoid(16); // Generate a unique ID
  const addedAt = new Date().toISOString(); // Get the current timestamp

  try {
    const [result] = await pool.query(
      'INSERT INTO translations (id, video, text, addedAt) VALUES (?, ?, ?, ?)',
      [id, video, text, addedAt]
    );

    return h.response({
      status: 'success',
      message: 'Translation added successfully',
      data: {
        translationId: result.insertId, // Return the inserted ID
        video,
        text,
      },
    }).code(201);
  } catch (error) {
    console.error('Error adding translation:', error);
    return h.response({
      status: 'error',
      message: 'Failed to add data to the database',
    }).code(500);
  }
};

/**
 * Handler to add a new translation to the `translations_dictionary` table.
 */
export const addTranslationsDictionaryHandler = async (request, h) => {
  const { image, text } = request.payload;

  // Validate required fields
  if (!image || !text) {
    return h.response({
      status: 'fail',
      message: 'Failed to add translation. Please provide both image and text.',
    }).code(400);
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO translations_dictionary (image, text) VALUES (?, ?)',
      [image, text]
    );

    return h.response({
      status: 'success',
      message: 'Translation added successfully',
      data: {
        translationId: result.insertId, // Return the inserted ID
        image,
        text,
      },
    }).code(201);
  } catch (error) {
    console.error('Error adding translation to dictionary:', error);
    return h.response({
      status: 'error',
      message: 'Failed to add data',
    }).code(500);
  }
};
