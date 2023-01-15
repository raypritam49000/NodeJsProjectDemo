import {boolean, number, object, string, TypeOf} from 'zod';

export const createPhotoSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required',
        }),
        description: string({
            required_error: 'Description is required',
        }),
        filename: string({
            required_error: 'Filename is required',
        }),
        views: number({
            required_error: 'Views is required'
        }),
        isPublished: boolean({
            required_error: 'IsPublished is required'
        })
    }),
});

const params = {
    params: object({
        photoId: string(),
    }),
};

export const getPhotoSchema = object({
    ...params,
});

export const getAllPhotosSchema = object({});

export const updatePhotoSchema = object({
    ...params,
    body: object({
        name: string(),
        filename: string(),
        description: string(),
        isPublished: boolean(),
        views: number()
    }).partial(),
});

export const deletePhotoSchema = object({
    ...params,
});


export type CreatePhotoInput = TypeOf<typeof createPhotoSchema>['body'];
export type GetPhotoInput = TypeOf<typeof getPhotoSchema>['params'];
export type UpdatePhotoInput = TypeOf<typeof updatePhotoSchema>;
export type DeletePhotoInput = TypeOf<typeof deletePhotoSchema>['params'];