import express from 'express';

const router = express.Router();
import {createPhotoHandler,getPhotoHandler,deletePhotoHandler,updatePhotoHandler,deletePhotoById,getAllPhotosHandler} from '../controllres/photo.controller';
import {validate} from "../middleware/validate";
import {createPhotoSchema,getPhotoSchema,deletePhotoSchema,updatePhotoSchema,getAllPhotosSchema} from "../schemas/photo.schema";

router.route('/').post(validate(createPhotoSchema), createPhotoHandler);
router.route('/:photoId').get(validate(getPhotoSchema),getPhotoHandler);
router.route('/:photoId').put(validate(updatePhotoSchema),updatePhotoHandler);
router.route('/:photoId').delete(validate(deletePhotoSchema), deletePhotoHandler);
router.route('/delete/:photoId').delete(validate(deletePhotoSchema), deletePhotoById);
router.route('/').get(validate(getAllPhotosSchema),getAllPhotosHandler);

export default router;