import role, {} from '../models/role.js';

//Registrar algo desde backend
//Req -> lo que se pidio (API, URL, JSON)
//Res -> La respuesta 
//async permite que la funcion sea asincrona
//Donde la funcion se demore, ahí va el await
const registerRole = async (req, res) =>{
    /**
     * El codigo debe validar...
     * req.body -> es el json
     * req.body.name -> es lo que yo recibo
     */
    if(!req.body.name || !req.body.description)
        return res.status(400).send({message:"Incomplete data"});//Respuesta

    let schema = new role({
        name:req.body.name,
        description:req.body.description,
        dbStatus:true
    });

    //Debe confirmar
    let result = await schema.save();

    //Verificar el resultado de result
    if(!result) return res.status(500).send({message:"Fail to registrer role"});

    res.status(200).send({result});
};

const getRolesList = async (req, res) => {

    const roles = await role.find();

    if(roles.length == 0) return res.status(400).send({msg:"No roles found"});

    return res.status(200).send({roles});

}

export default {registerRole, getRolesList};