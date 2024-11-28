import {Router} from 'express'

import { verifyToken } from '../middlewares/auth.js'
import { createTransportController, deleteTransportController, getAllTransportControllerByID, getAllTransportControllers, updateTransportController } from '../controllers/transport_controller.js'
const router = Router()


// Pública - todos pueden acceder
router.get('/transports',getAllTransportControllers)
router.get('/transports/:id',getAllTransportControllerByID)



// Privada - Admin, Gerente, Empleado
router.post('/transports', verifyToken, createTransportController)
router.put('/transports/:id',verifyToken,updateTransportController)
router.delete('/transports/:id',verifyToken,deleteTransportController)



export default router