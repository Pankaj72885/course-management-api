import Course from '../models/Course.js';
import responseHandler from '../utils/responseHandler.js';

export const createCourse = async (req, res, next) => {
  try {
    req.body.createdBy = req.user.id;
    const course = await Course.create(req.body);

    responseHandler(res, 201, true, 'Course created successfully', {
      course,
    });
  } catch (error) {
    next(error);
  }
};

export const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate({
      path: 'createdBy',
      select: 'name email',
    });

    responseHandler(res, 200, true, 'Courses retrieved successfully', {
      courses,
      count: courses.length,
    });
  } catch (error) {
    next(error);
  }
};

export const getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate({
      path: 'createdBy',
      select: 'name email',
    });

    if (!course) {
      return responseHandler(res, 404, false, 'Course not found');
    }

    responseHandler(res, 200, true, 'Course retrieved successfully', {
      course,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return responseHandler(res, 404, false, 'Course not found');
    }

    if (course.createdBy.toString() !== req.user.id) {
      return responseHandler(res, 401, false, 'Not authorized to update this course');
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    responseHandler(res, 200, true, 'Course updated successfully', {
      course,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return responseHandler(res, 404, false, 'Course not found');
    }

    if (course.createdBy.toString() !== req.user.id) {
      return responseHandler(res, 401, false, 'Not authorized to delete this course');
    }

    await course.deleteOne();

    responseHandler(res, 200, true, 'Course deleted successfully');
  } catch (error) {
    next(error);
  }
};
