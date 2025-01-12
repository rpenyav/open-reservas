import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  orthographyCheckUseCase,
  prosConsDiscusserUseCase,
  prosConsDiscusserUseCaseStream,
} from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';
import { ProsConsDiscusserDtoStream } from './dtos/pros-cons-dicusser-stream.dto';

@Injectable()
export class GptService {
  private readonly openai: OpenAI;
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }

  async prosConsDiscusser(prosConsDiscusserDto: ProsConsDiscusserDto) {
    return await prosConsDiscusserUseCase(this.openai, {
      prompt: prosConsDiscusserDto.prompt,
    });
  }

  async prosConsDiscusserStream(
    prosConsDiscusserDtoStream: ProsConsDiscusserDtoStream,
  ) {
    return await prosConsDiscusserUseCaseStream(this.openai, {
      prompt: prosConsDiscusserDtoStream.prompt,
    });
  }
}
