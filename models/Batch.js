const mongoose = require('mongoose')

const batchSchema = new mongoose.Schema(
    {
        batch_name: {
            type: String,
            required: [true, 'Please enter the batch name']
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Batch', batchSchema)