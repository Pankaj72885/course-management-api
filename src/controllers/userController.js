import User from '../models/User.js';
import responseHandler from '../utils/responseHandler.js';

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    responseHandler(res, 200, true, 'User profile retrieved successfully', {
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

export const updateProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    responseHandler(res, 200, true, 'User profile updated successfully', {
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
