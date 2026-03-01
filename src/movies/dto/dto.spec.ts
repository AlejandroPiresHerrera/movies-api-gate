import { CreateMovieDto } from './create-movie.dto';
import { MovieDto } from './movie.dto';
import { UpdateMovieDto } from './update-movie.dto';

describe('Movies DTOs', () => {
  it('CreateMovieDto permite asignar propiedades', () => {
    const dto = new CreateMovieDto();
    dto.id = 1;
    dto.title = 'Coco';

    expect(dto).toEqual({ id: 1, title: 'Coco' });
  });

  it('MovieDto permite asignar propiedades', () => {
    const dto = new MovieDto();
    dto.id = 2;
    dto.title = 'Toy Story';

    expect(dto).toEqual({ id: 2, title: 'Toy Story' });
  });

  it('UpdateMovieDto permite payload parcial', () => {
    const dto = new UpdateMovieDto();
    dto.title = 'Only title';

    expect(dto).toEqual({ title: 'Only title' });
  });
});
