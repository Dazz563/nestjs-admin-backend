import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import path = require('path');

@Controller()
export class UploadController {

    @Post('upload')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const fileName: string = path.parse(file.originalname).name.replace(/\s/g, '') + Date.now();
                const extension: string = path.parse(file.originalname).ext;

                cb(null, `${fileName}${extension}`)
            }


        })
    }))
    uploadFile(@UploadedFile() image) {
        return {
            url: `http://localhost:3000/api/${image.path}`
        };
    }

    @Get('uploads/:path')
    async getImage(
        @Param('path') path,
        @Res() res: Response
    ) {
        res.sendFile(path, { root: 'uploads' });
    }
}
