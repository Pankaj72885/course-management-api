import jwt from 'jsonwebtoken';
import { jwtSecret, jwtExpire } from '../config/jwt.js';

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: jwtExpire,
  });
};

export default generateToken;
