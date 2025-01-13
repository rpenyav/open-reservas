import { IsString } from 'class-validator';

export class InteractionDtoStream {
  @IsString()
  readonly prompt: string;
}
