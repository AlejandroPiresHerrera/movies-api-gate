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

  // ❌ Code Smell intencional: complejidad ciclomática alta
  complexFunction(value: number): string {
    if (value > 100) {
      if (value > 200) {
        if (value > 300) {
          if (value > 400) {
            if (value > 500) {
              return 'muy alto';
            }
            return 'alto';
          }
          return 'medio-alto';
        }
        return 'medio';
      }
      return 'bajo-medio';
    }
    return 'bajo';
  }
}
