import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
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
import { StorageService } from '../services/storage.services';

@Controller('songs')
export class songController {
  constructor(private _songService: songService , private _storeageServce : StorageService) {}
  @Get()
  async getAll() {
    const songs = await this._songService.getAll();
    
    for (const song of songs) { // Use 'for...of' to iterate
      const Url = await this._storeageServce.downloadUrl(song.id); // Assuming this method generates the URL
      song.downloadUrl = Url.href
    }
    return songs; //
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
      const newsong = await this._songService.create(createSong,file)
      this._storeageServce.upload(newsong.id,file)
    return true;
  }
  @Get('get-by-artist/:id')
  getByArtist( @Param('id', ParseIntPipe) id: number)
  {
    return this._songService.findSongByArtist(id)
  }
}
