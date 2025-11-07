import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import responseHandler from '../utils/responseHandler.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return responseHandler(res, 400, false, 'User already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
      phoneNumber,
    });

    responseHandler(res, 201, true, 'User registered successfully', {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return responseHandler(res, 400, false, 'Please provide an email and password');
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return responseHandler(res, 401, false, 'Invalid credentials');
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return responseHandler(res, 401, false, 'Invalid credentials');
    }

    responseHandler(res, 200, true, 'Login successful', {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};
