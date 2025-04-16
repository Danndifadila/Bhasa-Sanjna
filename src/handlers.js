import { nanoid } from 'nanoid';
import translations from './translations.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import pool from '../database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const videoUploadPath = join(__dirname, '../public/videos');

export const addTranslationHandler = async (request, h) => {
  try {
    const { video, text } = request.payload;

    if (!video || !text) {
      return h.response({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Gagal menambahkan terjemahan. Mohon isi video dan teks hasil terjemahan',
      }).code(400);
    }

    // Pastikan folder videos ada
    if (!fs.existsSync(videoUploadPath)) {
      fs.mkdirSync(videoUploadPath, { recursive: true });
      console.log(`Created videos directory at: ${videoUploadPath}`);
    }

    // Generate nama file unik
    const fileExt = video.hapi.filename.split('.').pop();
    const uniqueFilename = `recording-${Date.now()}-${nanoid(8)}.${fileExt}`;
    const videoPath = join(videoUploadPath, uniqueFilename);

    console.log(`Saving video to: ${videoPath}`); // Debug log

    const fileStream = fs.createWriteStream(videoPath);

    return new Promise((resolve, reject) => {
      fileStream.on('error', (err) => {
        console.error('Error saving video:', err);
        reject(h.response({
          statusCode: 500,
          error: 'Internal Server Error',
          message: 'Gagal menyimpan file video',
        }).code(500));
      });

      fileStream.on('finish', async () => {
        try {
          const [result] = await pool.query(
            'INSERT INTO translations (video, text) VALUES (?, ?)',
            [uniqueFilename, text]
          );

          resolve(h.response({
            statusCode: 201,
            message: 'Terjemahan berhasil ditambahkan',
            data: {
              id: result.insertId,
              video: uniqueFilename,
              text,
            },
          }).code(201));
        } catch (error) {
          console.error('Database error:', error);
          // Hapus file video jika gagal menyimpan ke database
          fs.unlink(videoPath, () => {});
          reject(h.response({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Gagal menambahkan data ke database',
          }).code(500));
        }
      });

      video.pipe(fileStream);
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return h.response({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Terjadi kesalahan yang tidak terduga',
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
    const [rows] = await pool.query('SELECT * FROM translations ORDER BY added_at DESC');
    
    const translationsWithVideoUrl = rows.map(translation => ({
      ...translation,
      video: `${request.server.info.uri}/videos/${translation.video}`
    }));

    return h.response({
      status: 'success',
      data: {
        translations: translationsWithVideoUrl,
      },
    }).code(200);
  } catch (error) {
    console.error(error);
    return h.response({ 
      status: 'error', 
      message: 'Gagal mengambil data',
      error: error.message 
    }).code(500); 
  }
};

export const getVideoHandler = async (request, h) => {
  try {
    const { filename } = request.params;
    const videoPath = join(videoUploadPath, filename);
    
    if (!fs.existsSync(videoPath)) {
      return h.response({
        status: 'fail',
        message: 'Video tidak ditemukan'
      }).code(404);
    }

    return h.response(createReadStream(videoPath))
      .type('video/webm')
      .header('Content-Disposition', `inline; filename=${filename}`);
  } catch (error) {
    console.error(error);
    return h.response({
      status: 'error',
      message: 'Terjadi kesalahan saat mengambil video'
    }).code(500);
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


