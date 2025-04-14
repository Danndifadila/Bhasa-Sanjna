import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../database.js';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const registerHandler = async (request, h) => {
  const { username, password } = request.payload;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

    return h.response({ status: 'success', message: 'Registrasi berhasil' }).code(201);
  } catch (err) {
    console.error(err);
    return h.response({ status: 'fail', message: 'Username sudah digunakan atau ada error lain' }).code(400);
  }
};

export const loginHandler = async (request, h) => {
  const { username, password } = request.payload;

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    if (rows.length === 0) {
      return h.response({ status: 'fail', message: 'Username tidak ditemukan' }).code(401);
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return h.response({ status: 'fail', message: 'Password salah' }).code(401);
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    return h.response({
      status: 'success',
      message: 'Login berhasil',
      token,
    }).code(200);

  } catch (err) {
    console.error(err);
    return h.response({ status: 'error', message: 'Terjadi kesalahan saat login' }).code(500);
  }

  
};
