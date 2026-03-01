import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getMovies() devuelve lo que retorna el servicio', async () => {
    const movies: Movie[] = [{ id: 1, title: 'Coco' } as Movie];
    const listMoviesSpy = jest
      .spyOn(service, 'listMovies')
      .mockResolvedValue(movies);

    const result = await controller.getMovies();

    expect(result).toEqual(movies);
    expect(listMoviesSpy).toHaveBeenCalledTimes(1);
  });
});
