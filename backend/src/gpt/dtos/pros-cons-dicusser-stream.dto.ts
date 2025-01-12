import { IsString } from 'class-validator';

export class ProsConsDiscusserDtoStream {
  @IsString()
  readonly prompt: string;
}
