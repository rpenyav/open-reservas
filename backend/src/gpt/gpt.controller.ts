import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { InteractionDtoStream } from './dtos/interaction-stream.dto';
import { Response } from 'express';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('chat-response')
  async interactionStream(
    @Body() interactionDtoStream: InteractionDtoStream,
    @Res() res: Response,
  ) {
    const stream =
      await this.gptService.interactionStream(interactionDtoStream);

    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);

    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';
      console.log(piece);
      res.write(piece);
    }

    res.end();
  }
}
