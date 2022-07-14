const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            trim: true,
            required: true

        },
        Completed: {
            type: Boolean,
            default: false
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)
const task = mongoose.model('task', taskSchema)

module.exports = task