import Task from "../model/task.js";
import { authMiddleware } from "../middleware/auth.js";


export const handleAllTasks =  async (req, res) => {   
    const tasks = await Task.find({});
    if(tasks.length === 0) return res.status(404).send({msg: "NO Task Found"});

    res.status(201).json({tasks});

}

export const handleCreateNewTask = async (req, res) => {
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

}

// id.
export const handleGetTaskById = async (req, res) => {
    const id = req.params.id;
    if(!id) return res.status(400).send({msg: 'cannot find id'});

    const task = await Task.find({id});
    if(!task) return res.status(404).send({msg: "No Task Found"})

    res.status(201).json({task});

}

export const handleUpdateTaskById = async (req, res) => {
    const id = req.params.id;
    if(!id) return res.status(400).send({msg: 'cannot find id'});
    const {title, description, priority, status, dueDate} = req.body;

    const updates = {};
    if(title !== undefined || null) updates.title = title;
    if(description !== undefined || null) updates.description = description;
    if(priority !== undefined || null) updates.priority = priority;
    if(status !== undefined || null) updates.status = status;
    if(dueDate !== undefined || null) updates.dueDate = dueDate;

    const updatedTask = await Task.findByIdAndUpdate( {_id: id}, { $set: updates  } );
    console.log(updatedTask);

    if(!updatedTask) return res.status(404).send({msg: 'updated task not found'});

    res.status(200).json({task: updatedTask});

}

export const handleDeleteTaskById = async (req, res) => {
    const id = req.params.id;
    if(!id) return res.status(400).send({msg: 'cannot find id'});

    await Task.findByIdAndDelete({_id: id});

    res.status(201).json({msg: "Task Deleted"})

}