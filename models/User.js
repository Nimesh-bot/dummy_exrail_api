const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please enter your full name']
        },
        email: {
            type: String,
            required: true,
            unique: [true, 'Email already exists']
        },
        password: {
            type: String,
            required: [true, 'Please enter your password']
        },
        batch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Batch'
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        role: {
            type: String,
            enum: ['teacher', 'student', 'admin'],
            default: 'student'
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)