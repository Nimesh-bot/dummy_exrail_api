const Batch = require("../models/Batch");
const Course = require("../models/Course");

const addCourses = async (req, res, next) => {
    const { course_name } = req.body;

    const newCourse = new Course({
        course_name
    });
    try {
        const course = await newCourse.save();
        res.status(200).json({
            message: 'Course added successfully',
            course
        })
    }
    catch (err) {
        next(err);
    }
}

const addBatch = async (req, res, next) => {
    const { batch_name } = req.body;

    const newBatch = new Batch({
        batch_name,
    });
    try {
        const batch = await newBatch.save();
        res.status(200).json({
            message: 'Batch added successfully',
            batch
        })
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    addCourses, addBatch
}