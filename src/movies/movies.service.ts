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

  // ✅ Refactorizado: complejidad reducida usando early returns
  classifyValue(value: number): string {
    if (value > 500) return 'muy alto';
    if (value > 400) return 'alto';
    if (value > 300) return 'medio-alto';
    if (value > 200) return 'medio';
    if (value > 100) return 'bajo-medio';
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
