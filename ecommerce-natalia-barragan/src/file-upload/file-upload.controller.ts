import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id') productId: string,
    @UploadedFile(
      new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({
          maxSize: 200000,
          message: 'La imagen supera el máximo de 20kb'
        }),
        new FileTypeValidator({
          fileType: /(.jpg|.png|webp|.jpeg)/
        })
      ] 
    }) 
  )file: Express.Multer.File,
  ){
    return this.fileUploadService.uploadImage(file, productId);
  }
}