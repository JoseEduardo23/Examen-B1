import {Router} from 'express'
import { createTourController, deleteTourController, getAlltourControllerByID, getAllToursControllers, updateTourController } from '../controllers/tour_controller.js'
import { verifyToken } from '../middlewares/auth.js'
const router = Router()


// Pública - todos pueden acceder
router.get('/tours',getAllToursControllers)
router.get('/tours/:id',getAlltourControllerByID)



// Privada - Admin, Gerente, Empleado
router.post('/tours', verifyToken, createTourController)
router.put('/tours/:id',verifyToken,updateTourController)
router.delete('/tours/:id',verifyToken,deleteTourController)



export default router