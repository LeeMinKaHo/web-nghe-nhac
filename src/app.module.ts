import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './database/entities/user.entity';
import { DatabaseConfig } from 'ormconfig';
import { MailerModule } from '@nestjs-modules/mailer';
import { songModule } from './modules/songs/song.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { cwd } from 'process';
import { currentUserMiddleware } from './modules/users/middlewares/current-user.middleware';
import { artistModule } from './modules/artists/artists.module';
import { PlaylistModule } from './modules/playlists/playlist.module';
import { PlaylistSongModule } from './modules/playlist-song/playlist-song.module';



@Module({
  imports: [ 
    ServeStaticModule.forRoot({
    rootPath: join(process.cwd(),'public'),
    }),
    TypeOrmModule.forRoot({
      ...DatabaseConfig,
      autoLoadEntities:true,
      logging:true
    }),
    UserModule,
    songModule,
    artistModule,
    PlaylistModule,
    PlaylistSongModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(currentUserMiddleware).forRoutes('*');
  }
}
