import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepo: Repository<Movie>,
  ) {}

  async listMovies(): Promise<Movie[]> {
    const unusedVariable = 'esto va a fallar el lint'; // ❌ Fallo lint intencional
    return this.movieRepo.find({ order: { id: 'ASC' } });
  }
}
