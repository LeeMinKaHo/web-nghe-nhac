import { Injectable, Req, Request, UploadedFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from 'src/database/entities/song.entity';
import { getRepository, Repository } from 'typeorm';
import { createSongDTO } from '../dto/create-song.dto';
import * as path from 'path';
import * as fs from 'fs';
import { updateArtistDto } from 'src/modules/artists/dto/update-artist.dto';
import { SearchSongDto } from '../dto/search-song.dto';
import { title } from 'process';
import { PaginationDto } from 'src/shared/pagination/dto/pagination.dto';
@Injectable()
export class songService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
  ) {}

  public async getAll( pagination : PaginationDto) {
    const songs = this.songRepository
                      .createQueryBuilder("songs")
                      .take(pagination.limit)
                      .skip(pagination.offset)
                      .leftJoinAndSelect("songs.artist", 'artist')
                      .getManyAndCount()
    
    return songs;

  }

  public async create(CreateSongDTO: createSongDTO, file: Express.Multer.File) {
    let newsong = this.songRepository.create({
      ...CreateSongDTO,
    });
    newsong.duration = 300;
    newsong = await this.songRepository.save(newsong);
    // save location file
    // folder of file
    const productDir = path.join('public/songs', '2');

    // check if foleder is exits
    if (!fs.existsSync(productDir)) {
      fs.mkdirSync(productDir, { recursive: true });
    }

    // add file to folder
    const filePath = path.join(productDir, file.originalname);
    fs.writeFileSync(filePath, file.buffer);

    newsong.file_url = `${process.env.HOST}/song/${newsong.id.toString()}/${file.originalname}`;

    this.songRepository.save(newsong);

    return newsong;
  }
  findSongByArtist(artistId: number) {
    return this.songRepository.find({
      where: { artistId: artistId },
    });
  }
  searchByName(name : string){
    return this.songRepository.createQueryBuilder('songs')
      .where('songs.title LIKE :name', { name: `%${name}%` })
      .getMany();
  }
}
