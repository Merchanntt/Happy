import {Router} from 'express'
import multer from 'multer'

import uploadConfig from '../upload/config'

import CreateOrphanagesController from '../controllers/CreateOrphanagesController'

const router = Router()
const upload = multer(uploadConfig)

const createOrphanagesController = new CreateOrphanagesController()

router.get('/orphanages', createOrphanagesController.index)
router.get('/orphanages/:id', createOrphanagesController.show)
router.post('/orphanages', upload.array('images') , createOrphanagesController.create)

export default router;