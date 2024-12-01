
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import userModel from '../models/user.js';
import { createToken } from '../middlewares/auth.js';
const saltRounds = 10


const registerUserController = async (req,res) => {

    const {password,...otherDataUser}=req.body
    const hasehedPassword = await bcrypt.hash(password,saltRounds)

    const userData = {
        id: uuidv4(),
        password:hasehedPassword,
        ...otherDataUser
    }
    try {
        const user = await userModel.registerUserModel(userData)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}


const loginUserController = async (req,res) => {

    const {username,password} = req.body

    try {
        
        const user = await userModel.loginUserModel(username,password)

        const token = createToken(user)

        res.status(200).json({user,token})

    } catch (error) {
        res.status(500).json(error)
    }
}


const getuserByIDController= async(req,res) => {
    const {id} = req.params;
    try{
        const user = await userModel.getuserbyIDModel(id);
        if(!user){
            return res.status(404).json({error:"Usuario no encontrado"})
        }
        res.status(200).json(user)
    }catch(error){
        console.error("Error al encontrar al estudiante", error.message)
        res.status(500).json({error:"Internal server error"})
    }
}

const getAlluserController = async(req,res) => {
    const user = await userModel.getAllUserModel()
    res.status(200).json(user)
}

const deleteuserController = async(req, res) => {
    const {id} = req.params
    try{
    const user = await userModel.deletauserModel(id)
    res.status(200).json(user)
    }catch(error){
        res.status(500).json(error)
    }
}
const updateuserController = async (req, res) =>{
    const {id} = req.params
    try{
        const user = await userModel.updateuserModel(id)
        res.status(200).json(user)
    }catch(error){
        req.status(500).json(error)
        }
}

export {
    registerUserController,
    loginUserController,
    getuserByIDController,
    getAlluserController,
    deleteuserController,
    updateuserController
}