import express from 'express';
import {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController.js';
import protect from '../middlewares/auth.js';
import { validateCourse } from '../middlewares/validator.js';

const router = express.Router();

router.use(protect);

router.route('/').post(validateCourse, createCourse).get(getCourses);
router
  .route('/:id')
  .get(getCourse)
  .put(validateCourse, updateCourse)
  .delete(deleteCourse);

export default router;
