import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from 'src/database/entities/user.entity';
import { createSongDTO } from 'src/modules/songs/dto/create-song.dto';
import { Repository } from 'typeorm';
import { SignUpDTO } from '../dto/signUp.dto';


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
}