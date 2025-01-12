import { Module } from '@nestjs/common';
import { GptModule } from './gpt/gpt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // Cargar las variables de entorno
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'sandbox',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    GptModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
