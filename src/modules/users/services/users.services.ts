import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from 'src/database/entities/user.entity';
import { createSongDTO } from 'src/modules/songs/dto/create-song.dto';
import { Repository } from 'typeorm';
import { SignUpDTO } from '../dto/signUp.dto';

import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(user)
    private usersRepository: Repository<user>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOneBy({
      id,
    });
  }

  async create(createUser: SignUpDTO) {
    const user = this.usersRepository.create(createUser);
    return await this.usersRepository.save(user);
  }

  async delete(id: number) {
    await this.usersRepository.delete({ id });
    return `Delete user with id ${id} successfully`;
  }
  async findOneByUserName(userName: string) {
    return await this.usersRepository.findOneBy({
      username: userName,
    });
  }
  async findOneByEmail(email: string) {
    return await this.usersRepository.findOneBy({
      email,
    });
  }
  async updateAvatar(id: number, file: Express.Multer.File) {
    const user = await this.findOne(id);
    if (user) {
      const subFolderDir = `avatar/${id.toString()}`;
      const folderDir = path.join('public', subFolderDir);

      // Kiểm tra và tạo thư mục nếu chưa tồn tại
      if (!fs.existsSync(folderDir)) {
        fs.mkdirSync(folderDir, { recursive: true });
      }
      // Kiểm tra xem thư mục có file nào chưa
      const files = fs.readdirSync(folderDir);
      if (files.length > 0) {
        // Xóa tất cả file trong thư mục
        files.forEach((file) => {
          const filePath = path.join(folderDir, file);
          fs.unlinkSync(filePath); // Xóa file
        });
      }
      // Đường dẫn của file mới
      const filePath = path.join(folderDir, file.originalname);

      // Ghi file mới vào thư mục (ví dụ sử dụng fs.writeFileSync)
      fs.writeFileSync(filePath, file.buffer); // Ghi file mới
      
      return {
        id: user.id,
        avatarUrl: filePath,
      };
    } else {
      return new BadRequestException();
    }
  }
}
