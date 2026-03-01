import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';

const dbHost = process.env.DB_HOST ?? '127.0.0.1';
const dbPort = Number(process.env.DB_PORT ?? 5432);
const dbUser = process.env.DB_USER ?? 'postgres';
const dbPassword = process.env.DB_PASS ?? 'postgres';
const dbName = process.env.DB_NAME ?? 'movies_api';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbHost,
      port: dbPort,
      username: dbUser,
      password: dbPassword,
      database: dbName,
      autoLoadEntities: true,
      synchronize: false,
      retryAttempts: 3,
      retryDelay: 2000,
    }),
    MoviesModule,
  ],
})
export class AppModule {}
