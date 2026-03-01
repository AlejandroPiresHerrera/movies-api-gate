import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

describe('MoviesService', () => {
  let service: MoviesService;
  let repo: Repository<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(MoviesService);
    repo = module.get(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('listMovies() devuelve lo que devuelve el repo', async () => {
    const data: Movie[] = [
      { id: 1, title: 'Coco' } as Movie,
      { id: 2, title: 'Toy Story' } as Movie,
    ];

    jest.spyOn(repo, 'find').mockResolvedValue(data);

    const result = await service.listMovies();
    expect(result).toEqual(data);
  });

  it('getMovieById() retorna una película por id', async () => {
    const movie = { id: 1, title: 'Coco' } as Movie;
    const findOneSpy = jest.spyOn(repo, 'findOne').mockResolvedValue(movie);

    const result = await service.getMovieById(1);
    expect(result).toEqual(movie);
    expect(findOneSpy).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('createMovie() crea y guarda una nueva película', async () => {
    const title = 'New Movie';
    const movie = { id: 1, title } as Movie;

    const createSpy = jest.spyOn(repo, 'create').mockReturnValue(movie);
    const saveSpy = jest.spyOn(repo, 'save').mockResolvedValue(movie);

    const result = await service.createMovie(title);

    expect(createSpy).toHaveBeenCalledWith({ title });
    expect(saveSpy).toHaveBeenCalledWith(movie);
    expect(result).toEqual(movie);
  });

  it('deleteMovie() elimina una película por id', async () => {
    const deleteSpy = jest
      .spyOn(repo, 'delete')
      .mockResolvedValue({ affected: 1, raw: {} });

    await service.deleteMovie(1);

    expect(deleteSpy).toHaveBeenCalledWith(1);
  });

  it('classifyValue() clasifica correctamente los valores', () => {
    expect(service.classifyValue(600)).toBe('muy alto');
    expect(service.classifyValue(450)).toBe('alto');
    expect(service.classifyValue(350)).toBe('medio-alto');
    expect(service.classifyValue(250)).toBe('medio');
    expect(service.classifyValue(150)).toBe('bajo-medio');
    expect(service.classifyValue(50)).toBe('bajo');
  });
});
