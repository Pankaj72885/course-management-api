import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a course title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a course description'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a course price'],
  },
  duration: {
    type: String,
    required: [true, 'Please add course duration'],
  },
  category: {
    type: String,
    required: [true, 'Please add a course category'],
  },
  instructorName: {
    type: String,
    required: [true, 'Please add instructor name'],
  },
  courseImage: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Course', CourseSchema);
