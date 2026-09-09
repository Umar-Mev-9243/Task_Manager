import mongoose from 'mongoose'

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100
    },
    description: {
        type: String,
        trim: true,
        maxlength: 1000
    },
    priority:{
        type:String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    status:{
        type: String,
        enum:['pending', 'complete'],
        default: 'pending'
    },
    duedate:{
        type: Date
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }

}, {timestamps: true})


const Task = mongoose.model('task', taskSchema);

export default Task;