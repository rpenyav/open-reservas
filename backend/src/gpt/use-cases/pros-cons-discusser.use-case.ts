import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const prosConsDiscusserUseCase = async (
  openai: OpenAI,
  { prompt }: Options,
) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `
      Se te dará un tema y deberás escribir una lista de pros y contras sobre el mismo.
      La respuesta debe estar en formato Markdown.
      Los pros y los contras deben estar en una lista. 
      Los titulos de los objetos o temas comparados deben estar en un tamaño mayor al resto.
      Los titulos de Pro y Contra deben estar en negrita.
      No debes responder a la pregunta con un título, responde usando algo como: Por supuesto, esta es una lista de pros y contras sobre el tema:.
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

  return response.choices[0].message;
};
