import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const prosConsDiscusserUseCaseStream = async (
  openai: OpenAI,
  { prompt }: Options,
) => {
  return await openai.chat.completions.create({
    stream: true,
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `
      Se te dará un tema y deberás escribir una lista de pros y contras sobre el mismo.
      La respuesta debe estar en formato Markdown.
      Los pros y los contras deben estar en una lista
      `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.8,
    max_tokens: 500,
  });
};
