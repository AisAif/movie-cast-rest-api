import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MovieModule } from './movie/movie.module';
import { CastModule } from './cast/cast.module';
import { MovieCastModule } from './movie-cast/movie-cast.module';
import { dataSourceOptions } from 'database/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
    }),
    CastModule,
    MovieModule,
    MovieCastModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
