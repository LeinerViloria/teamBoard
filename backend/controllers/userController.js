//user, role, bcrypt, jwt, moment
import user from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';

const registerUser = async (req, res) =>{
    if(!req.body.name || !req.body.password) return res.status(400).send({message:"Incomplete data"});

    //Encriptemos la contraseña
    const passHash = await bcrypt.hash(req.body.password, 10);

    const userSchema = new user({
        name:req.body.name,
        email:req.body.email,
        password:passHash,
        roleId:req.body.role,
        dbStatus:true
    });

    const result = await userSchema.save();

    if(!result) return res.status(500).send({message:"Failed to register user"});

    //Generemos un json Web Token
    try {
        //sign -> firma electronica
        //iat 
        return res.status(200).json({
            token:jwt.sign({
                _id: result._id,
                name:result.name,
                roleId: result.roleId,
                iat:moment().unix()
            }, process.env.SK_JWT),
        });
    } catch (error) {
        return res.status(500).send({message:"Register error"});
    }

}

const listUserAdmin = async (req, res) => {
    //find(->Expresion regular)
    /**
     * Expresion regular es un codigo predefinido y listo para usar
     * (va a aceptar lo que se ponga aqui)
     */
    let users = await user.find({name:new RegExp(req.params["name"])}).populate("roleId").exec(); //que se traiga la lista de todos - users es un array

    return users.length===0 ? res.status(400).send({ message: "No search results" }) : res.status(200).send({ users });
}

const listUser = async (req, res) => {
    //find(->Expresion regular)
    /**
     * Expresion regular es un codigo predefinido y listo para usar
     * (va a aceptar lo que se ponga aqui)
     */
    let users = await user.find({ $and: [{name:new RegExp(req.params["name"])}, {dbStatus:"true"}],}).populate("roleId").exec(); //que se traiga la lista de todos - users es un array

    return users.length===0 ? res.status(400).send({ message: "No search results" }) : res.status(200).send({ users });
}

const login = async (req, res) =>{
    const userLogin = await user.findOne({email:req.body.email});

    const internalMessage = "Email or password incorrect";

    if(!userLogin) return res.status(400).send({msg:internalMessage});

    if(!userLogin.dbStatus) return res.status(400).send({msg:internalMessageS});

    const passHash = await bcrypt.compare(req.body.password, userLogin.password);

    if(!passHash) return res.status(400).send({msg:internalMessage});

    //Generemos un json Web Token
    try {
        //sign -> firma electronica
        //iat 
        return res.status(200).json({
            token:jwt.sign({
                _id: userLogin._id,
                name:userLogin.name,
                roleId: userLogin.roleId,
                iat:moment().unix()
            }, process.env.SK_JWT),
        });
    } catch (error) {
        return res.status(500).send({message:"Login error"});
    }
}

//Esto se hizo hoy
const deleteUser = async (req, res)=>{
    // if(!req.params["_id"]) return res.status(400).send({msg:"Incomplete data"});
    if(!req.params["_id"]) return res.status(400).send({msg:"Incomplete data"});

    // const users = await user.findByIdAndDelete(req.params["_id"]);
    const users = await user.findByIdAndUpdate(req.params["_id"], {
        dbStatus:false
    });

    return !users ? res.status(400).send({msg:"Error deleting user"}) : res.status(200).send({msg:"User deleted"});
}

const updateUserByAdmin = async (req, res) =>{
    if(!req.body._id || !req.body.name || !req.body.role || !req.body.email) return res.status(400).send({msg:"Incomplete data"});

    //Para cuando llegue una contraseña
    let pass = "";

    if (!req.body.password) {
        const findUser = await user.findOne({email:req.body.email});

        pass = findUser.password;
    } else {
        pass = await bcrypt.hash(req.body.password, 10);
    }

    const editUser = await user.findByIdAndUpdate(req.body._id, {
        name:req.body.name,
        password:pass,
        roleId:req.body.role
    });

    if(!editUser) return res.status(500).send({msg:"Error editing user"});

    return res.status(200).send({msg:"User updated successful"})
}

export default {registerUser, listUser, login, deleteUser, listUserAdmin, updateUserByAdmin};