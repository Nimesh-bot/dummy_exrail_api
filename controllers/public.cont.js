const Batch = require("../models/Batch");
const Course = require("../models/Course");

const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find();
        res.status(200).json({
            message: 'Courses fetched successfully',
            courses
        })
    }
    catch (err) {
        next(err);
    }
}

const getCourse = async (req, res, next) => {
    const { courseId } = req.params;
    try {
        const course = await Course.findById(courseId);
        res.status(200).json({
            message: 'Course fetched successfully',
            course
        })
    }
    catch (err) {
        next(err);
    }
}

const getAllBatches = async (req, res, next) => {
    try {
        const batches = await Batch.find();
        res.status(200).json({
            message: 'Batches fetched successfully',
            batches
        })
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    getAllCourses, getCourse, getAllBatches
}