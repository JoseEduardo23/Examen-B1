import {Router} from 'express'
import { deleteuserController, getAlluserController, getuserByIDController, loginUserController, registerUserController, updateuserController } from '../controllers/user_controller.js'
import { verifyToken } from '../middlewares/auth.js'

const router = Router()


//Rutas publicas
router.post('/users/register',registerUserController)

router.post('/users/login',loginUserController)

router.get('/users',getAlluserController)

//Rutas privadas
router.get('/users/:id', verifyToken, getuserByIDController)

router.delete('/users/:id', verifyToken,deleteuserController)

router.put('/users/:id',verifyToken,updateuserController)


export default router


