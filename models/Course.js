const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema(
    {
        course_name: {
            type: String,
            required: [true, 'Please enter the course name']
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Course', courseSchema)