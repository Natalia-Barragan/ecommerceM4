import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/Auth/guards/auth.guards';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/Auth/roles.enum';
import { RolesGuard } from 'src/Auth/guards/roles.guard';

@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('uploadImage/:id')  
  @ApiOperation({ summary: 'Cargar una imagen para un producto' })
  @ApiParam({ name: 'id', description: 'ID del producto al que se le cargará la imagen', type: String })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        }
      },
      required: ['file']
    }
  })
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