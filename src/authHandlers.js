import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../database.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Handler for user registration
export const registerHandler = async (request, h) => {
  const { username, password } = request.payload;

  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

    // Respond with success
    return h.response({ status: 'success', message: 'Registrasi berhasil' }).code(201);
  } catch (err) {
    console.error(err);

    // Handle errors (e.g., duplicate username or database issues)
    return h.response({ status: 'fail', message: 'Username sudah digunakan atau ada error lain' }).code(400);
  }
};

// Handler for user login
export const loginHandler = async (request, h) => {
  const { username, password } = request.payload;

  try {
    // Fetch the user from the database by username
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    // Check if the user exists
    if (rows.length === 0) {
      return h.response({ status: 'fail', message: 'Username tidak ditemukan' }).code(401);
    }

    const user = rows[0];

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return h.response({ status: 'fail', message: 'Password salah' }).code(401);
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      { id: user.id, username: user.username }, // Payload
      JWT_SECRET, // Secret key
      { expiresIn: '1h' } // Token expiration
    );

    // Respond with success and the token
    return h.response({
      status: 'success',
      message: 'Login berhasil',
      token,
    }).code(200);

  } catch (err) {
    console.error(err);

    // Handle unexpected errors
    return h.response({ status: 'error', message: 'Terjadi kesalahan saat login' }).code(500);
  }
};
