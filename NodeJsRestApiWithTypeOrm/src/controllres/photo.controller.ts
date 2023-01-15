import {NextFunction, Request, Response} from 'express';
import {createPhoto, deletePhoto, getPhoto,getAllPhotos} from '../services/photo.service';
import {CreatePhotoInput,GetPhotoInput,DeletePhotoInput,UpdatePhotoInput} from "../schemas/photo.schema";


export const createPhotoHandler = async (req: Request<{}, {}, CreatePhotoInput>, res: Response, next: NextFunction) => {
    try {

        const {name, filename, description, views, isPublished} = req.body;

        if(!name || !filename || !description || !views || !isPublished){
          return  res.status(400).json({status: 'fail',statusCode:400,message:"All fields are required"});
        }
        const savedPhoto = await createPhoto({name, filename, description, views, isPublished});

       return res.status(201).json({status: 'success',statusCode:201,message:"Photo Created",data:{savedPhoto}});
    } catch (error: any) {
        if (error.code === '23505') {
            return res.status(409).json({status: 'fail',statusCode:501,message: 'Photo with that name already exist'});
        }
        next(error);
    }
}


export const getPhotoHandler = async (req: Request<GetPhotoInput>, res: Response, next: NextFunction) => {
    try {
        const photo = await getPhoto(req.params.photoId);

        if (!photo) {
            return res.json({status:"fail","statusCode":404, message:`Photo with that ID : ${req.params.photoId} not found`});
        }

        return res.status(200).json({status: 'success',statusCode:200,message:"Photo List",data:{photo}});
    } catch (err: any) {
        next(err);
    }
};


export const deletePhotoHandler = async (req: Request<DeletePhotoInput>, res: Response, next: NextFunction) => {
    try {
        const photo = await getPhoto(req.params.photoId);
        console.log(photo)

        if (!photo) {
            return res.json({status:"fail","statusCode":404, message:`Photo with that ID : ${req.params.photoId} not found`});
        }

         await photo.remove();
       //  const isDeleted = await deletePhoto(req.params.photoId)
       //  console.log(isDeleted)

        return res.status(203).json({status: 'success',statusCode:203,message:"Photo Deletd"});
    } catch (err: any) {
        next(err);
    }
};

export const deletePhotoById = async (req: Request<DeletePhotoInput>, res: Response, next: NextFunction) => {
    try {

        const isDeleted = await deletePhoto(req.params.photoId)
        console.log(isDeleted)

        if(isDeleted){
            return res.status(203).json({status: 'success',statusCode:203,message:"Photo Deletd"});
        }
        return res.status(400).json({status: 'fail',statusCode:400,message:"Photo Not Deletd"});
    } catch (err: any) {
        return res.status(502).json({status: 'fail',statusCode:400,message:err.message});
    }
};




export const updatePhotoHandler = async (req: Request<UpdatePhotoInput['params'], {}, UpdatePhotoInput['body']>, res: Response, next: NextFunction) => {
    try {
        const photo = await getPhoto(req.params.photoId);

        if (!photo) {
            return res.json({status:"fail","statusCode":404, message:`Photo with that ID : ${req.params.photoId} not found`});
        }

        Object.assign(photo, req.body);

        const updatedPhoto = await photo.save();
        console.log(updatedPhoto)

        return res.status(201).json({status: 'success',statusCode:204,message:"Photo Updated",data:{updatedPhoto}});
    } catch (err: any) {
        next(err);
    }
};

export const getAllPhotosHandler = async (req: Request<GetPhotoInput>, res: Response, next: NextFunction) => {
    try {
        const photos = await getAllPhotos();

        if (!photos) {
            return res.json({status:"fail","statusCode":404, message:`Photos not found`});
        }

        return res.status(200).json({status: 'success',statusCode:200,message:"Photo List",data:{photos}});
    } catch (err: any) {
        next(err);
    }
};
