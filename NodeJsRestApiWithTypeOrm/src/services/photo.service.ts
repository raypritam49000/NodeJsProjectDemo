import {Photo} from "../entities/photo.entity";
import {AppDataSource} from "../dbconfig/data-source";

const photoRepository = AppDataSource.getRepository(Photo);

export const createPhoto = async (photo: any) => {
    return await photoRepository.save(photo);
};

export const getPhoto = async (postId: string) => {
    return await photoRepository.findOneBy({id: parseInt(postId)});
};

export const deletePhoto = async (postId: string) => {
    const photo = await photoRepository.findOneBy({id: parseInt(postId)})
    if (photo) {
        await photoRepository.remove(photo);
        return true;
    }
    return false;
};

export const getAllPhotos = async () => {
    const photos = await photoRepository.find();
    return photos;
};






