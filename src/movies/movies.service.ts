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

  // ❌ Bajada de coverage: método sin tests
  async getMovieById(id: number): Promise<Movie | null> {
    return this.movieRepo.findOne({ where: { id } });
  }

  async createMovie(title: string): Promise<Movie> {
    const movie = this.movieRepo.create({ title });
    return this.movieRepo.save(movie);
  }

  async deleteMovie(id: number): Promise<void> {
    await this.movieRepo.delete(id);
  }
}
