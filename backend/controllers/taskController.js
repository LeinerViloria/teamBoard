import task from '../models/task.js';
import user from '../models/user.js';

//No pondré validaciones en el middleware por esperar hasta mañana

const register = async (req, res) => {
    if(!req.body.userEmail || !req.body.name || !req.body.description) return res.status(400).send({msg:"Incomplete data"});

    //Saber si el usuario existe, a través del correo
    const existingUser = await user.find({$and:[{email:req.body.userEmail}, {dbStatus:"true"}]});

    if(!existingUser) return res.status(400).send({msg:"User not found"});

    const userId = existingUser._id;
    const toDoStatus = "to-do";

    const schema = new task({
        user:userId,
        name:req.body.name,
        description:req.body.description,
        taskStatus:toDoStatus
    });

    const result = await schema.save();

    if(!result) return res.status(500).send({msg:"Internal error"});

    return !result ? res.status(500).send({msg:"Internal error"}) : res.status(200).json(result);

}

const updateTo_ToDo = async (req, res) => {
    if(!req.params["_id"]) return res.status(400).send({msg:"Incomplete data"});

    const thisTask = await task.findByIdAndUpdate(req.params["_id"],{
        taskStatus:"to-do"
    });

    return !thisTask ? res.status(500).send({msg:"Internal error"}) : res.status(200).send({msg:"Task to do"});
}

const updateToInProgress = async (req, res) => {
    if(!req.params["_id"]) return res.status(400).send({msg:"Incomplete data"});

    const thisTask = await task.findByIdAndUpdate(req.params["_id"],{
        taskStatus:"in-progress"
    });

    return !thisTask ? res.status(500).send({msg:"Internal error"}) : res.status(200).send({msg:"Task in progress"});

}

const updateToFinish = async (req, res) => {
    if(!req.params["_id"]) return res.status(400).send({msg:"Incomplete data"});

    const thisTask = await task.findByIdAndUpdate(req.params["_id"],{
        taskStatus:"finished"
    });

    return !thisTask ? res.status(500).send({msg:"Internal error"}) : res.status(200).send({msg:"Task finished"});
}

const deleteTask = async (req, res) => {
    if(!req.params["_id"]) return res.status(400).send({msg:"Incomplete data"});

    const thisTask = await task.findByIdAndDelete(req.params["_id"]);

    return !thisTask ? res.status(500).send({msg:"Internal error"}) : res.status(200).send({msg:"Task deleted"});
}

const listAllByStatus = async (req, res) => {
    const all = await task.find({taskStatus: new RegExp(req.params["status"])});

    if(!all) return res.status(500).send({msg:"Internal error"});

    res.status(200).json(all);
}

const listTaskByUser = async (req, res) => {

    const thisUser = await user.find({$and:[{email:req.params["email"]}, {dbStatus:"true"}]});

    if(!thisUser) return res.status(400).send({msg:"User not found"});

    const thisUserId = thisUser._id;

    const listByUser = await task.find({userId:thisUserId});

    if(!listByUser) return res.status(500).send({msg:"Internal error"});

    res.status(200).json(listByUser);
}

export default {register, updateTo_ToDo, updateToInProgress, updateToFinish, deleteTask, listAllByStatus, listTaskByUser};