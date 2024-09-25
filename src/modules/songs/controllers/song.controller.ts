import {
  Body,
  Controller,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { songService } from '../services/song.services';
import { createSongDTO } from '../dto/create-song.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from 'src/guards/roles.guards';
import { Roles } from 'src/modules/users/decorators/roles.decoration';

@Controller('songs')
export class songController {
  constructor(private _songService: songService) {}
  @Get()
  async getAll() {
    return await this._songService.getAll();
  }
  @Post()
  @UseGuards(RolesGuard)
  @Roles(['ADMIN'])
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Req() req,
    @Body() createSong: createSongDTO,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
            fileType: /audio\/(mpeg|wav|ogg|flac|aac|mp4)/ ,
        })
        .addMaxSizeValidator({
          maxSize: 10 * 1024 * 1024,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    console.log(req.currentUser);
    return true;
  }
}
