//Validar si existe un usuario, a través del email
import user from '../models/user.js';

const existingUser = async (req, res, next) => {
    if(!req.body.email) return res.status(400).send({message:"Incomplete data"});

    //Verifiquemos si el usuario existe
    const existingEmail = await user.findOne({email:req.body.email});

    if(existingEmail) return res.status(400).send({message:"This user is already registered"});

    next();

}

export default {existingUser};