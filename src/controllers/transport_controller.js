
import transportModel from '../models/transport_Model.js'

import {v4 as uuidv4} from 'uuid'

import {v2 as cloudinary} from 'cloudinary'

import fs from 'fs-extra'



const getAllTransportControllers = async(req,res) => {
    const transport = await transportModel.getAllTransportModel()
    res.status(200).json(transport)
}


const getAllTransportControllerByID = async (req, res) => {
    const {id} = req.params
    try {
        const transport = await transportModel.getTransportByIdModel(id)
        const status = transport.error ? 404 : 200
        res.status(status).json(transport)
    } catch (error) {
        res.status(500).json(error)
    }
}


const createTransportController = async (req,res) => {
    if (!req.files || !req.files.imagen) {
        return res.status(400).json({ message: 'No se recibió la imagen' });
    }

    const newTourData = {
        id:uuidv4(),
        ...req.body
    }
    try {

        const cloudinaryResponse = await cloudinary.uploader.upload(req.files.imagen.tempFilePath, {folder:'images'})

        newTourData.imagen = cloudinaryResponse.secure_url
        newTourData.public_id = cloudinaryResponse.public_id

        const tour = await transportModel.createTransportModel(newTourData)

        await fs.unlink(req.files.imagen.tempFilePath)


        res.status(201).json(tour)
    } catch (error) {
        console.error('Error al cargar la informacion', error)
        res.status(500).json({msg:'Error al cargar la informacion'})
    }
}

const updateTransportController = async(req,res) => {
    const {id} = req.params
    try {
        const transport = await transportModel.updateTransportModel(id,req.body)
        res.status(200).json(transport)
    } catch (error) {
        req.status(500).json(error)
    }
}


const deleteTransportController = async (req,res) => { 
    const {id} = req.params
    try {

        const transportFind = await transportModel.getTransportByIdModel(id)
        await cloudinary.uploader.destroy(transportFind.public_id)

        await transportModel.deleteTransportModel(id)
        res.status(200).json({msg:"Ruta eliminado"})
    } catch (error) {
        res.status(500).json(error)
    }
}


const getTransportByIDController = async (req,res) => {
    const {id} = req.params
    try {
        const transport = await transportModel.getTransportByIdModel(id)
        res.status(200).json(transport)
    } catch (error) {
        res.status(500).json(error)
    }
}





export {
    getAllTransportControllers,
    getAllTransportControllerByID,
    createTransportController,
    updateTransportController,
    deleteTransportController,
    getTransportByIDController
}
