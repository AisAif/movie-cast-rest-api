import { Test, TestingModule } from '@nestjs/testing';
import { MovieCastController } from './movie-cast.controller';
import { MovieCastService } from './movie-cast.service';

describe('MovieCastController', () => {
  let controller: MovieCastController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieCastController],
      providers: [MovieCastService],
    }).compile();

    controller = module.get<MovieCastController>(MovieCastController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
