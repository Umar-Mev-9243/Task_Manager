import Task from "../model/task.js";
import { authMiddleware } from "../middleware/auth.js";


export const handleAllTasks =  async (req, res) => {   
    try {
        const tasks = await Task.find({createdBy: req.user._id});
    
        res.status(200).json({tasks});
        
    } catch (error) {
        res.send(error);
    }

}

export const handleCreateNewTask = async (req, res) => {
    try {
        const {title, description, priority, status, dueDate} = req.body;

        const task =  await Task.create({
            title,
            description,
            priority,
            status,
            dueDate,
            createdBy: req.user._id,
        })

        res.status(201).json({task});

    } catch (error) {
        
        res.send(error)

    }

}

// id.
export const handleGetTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id) return res.status(400).send({msg: 'cannot find id'});

        const task = await Task.find({_id: id, createdBy: req.user._id});
        if(!task) return res.status(404).send({msg: "No Task Found"})

        res.status(200).json({task});
    } catch (error) {
        res.send(error);
    }

}

export const handleUpdateTaskById = async (req, res) => {
    try {

        const id = req.params.id;
        if(!id) return res.status(400).send({msg: 'cannot find id'});
        const {title, description, priority, status, dueDate} = req.body;

        const updates = {};
        if(title !== undefined && title !== null) updates.title = title;
        if(description !== undefined && description !==  null) updates.description = description;
        if(priority !== undefined && priority !==  null) updates.priority = priority;
        if(status !== undefined && status !== null) updates.status = status;
        if(dueDate !== undefined && dueDate !== null) updates.dueDate = dueDate;

        const updatedTask = await Task.findByIdAndUpdate( {_id: id, createdBy: req.user._id}, { $set: updates  }, {new: true, runValidators: true});
        console.log(updatedTask);

        if(!updatedTask) return res.status(404).send({msg: 'updated task not found'});

        res.status(200).json({task: updatedTask});

    } catch (error) {
        
        res.send(error);

    }

}

export const handleDeleteTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id) return res.status(400).send({msg: 'cannot find id'});

        await Task.findByIdAndDelete({_id: id, createdBy: req.user._id});

        res.status(201).json({msg: "Task Deleted"})
    } catch (error) {
        res.send(error)
    }

}