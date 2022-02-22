import role from '../models/role.js';

const existingRole = async (req, res, next) =>{
    //Busquemos el rol
    const roleId = await role.findOne({name:"user"});

    if(!roleId) return res.status(500).send({message:"Try again later"});

    req.body.role = roleId._id;

    next();
}

const existingRoleName = async (req, res, next) =>{
    const existingRole = await role.findOne({name:req.body.name});

    if(existingRole) return res.status(400).send({msg:"This role is already registered"});

    next();
}

export default {existingRole, existingRoleName};