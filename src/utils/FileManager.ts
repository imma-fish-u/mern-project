import { promisify } from 'util';
import { pipeline } from 'stream';
import path from 'path';
import fs from 'fs';

export default class FileManager {
    public static async uploadPicture(label: string, directory: string, file: any) {
        console.log(file.mimetype);
        
        if (
            file.mimetype !== 'image/jpg' &&
            file.mimetype !== 'image/png' &&
            file.mimetype !== 'image/jpeg'
        ) {
            throw Error('INVALID_TYPE : File must be of type png / jpg / jpeg');
        }
        // if (file.size > 500000000) throw Error('MAX_SIZE : File must be max 0.5 Ko');

        const cleanLabel: string = label.replace(' ', '');

        const pictureName = `${cleanLabel}${Math.floor(Math.random() * 1000)}${Date.now()}.png`;
        const uploadFilePath = path.join(
            __dirname,
            '..',
            'assets',
            'images',
            directory,
            pictureName
        );

        const writeStream = fs.createWriteStream(uploadFilePath);
        writeStream.write(file.buffer);

        return pictureName;
    }

    public static async uploadFile(label: string, file: any) {
        // if (file.size > 500000) throw Error('MAX_SIZE : File must be max 0.5 Ko');

        const pipelinee = promisify(pipeline);

        const cleanLabel: string = label.replace(' ', '');

        const fileName = `${cleanLabel}${Math.floor(Math.random() * 1000)}${Date.now()}-${
            file.originalname
        }`;

        const uploadFilePath = path.join(__dirname, '..', 'assets', 'attachments', fileName);
        const writeStream = fs.createWriteStream(uploadFilePath);
        writeStream.write(file.buffer);

        return fileName;
    }

    public static async deletePicture() {}
}
