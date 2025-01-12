import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
        Te serán provistos varios textos en español con errores gramaticales y ortográficos.
        Debes responder en formato JSON.
        Tu tarea es corregirlos y retornar información y soluciones, también debes dar un porcentaje de acierto por el usuario.
        Si no hay errores, debes retornar un mensaje de enhorabuena.

        Ejemplo de salida: {
            underScore: number,
            errors: string[], //['error -> solución'],
            message:string //felicita al usuario con emojis
        }
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-3.5-turbo',
    temperature: 0,
    max_tokens: 150,
    response_format: { type: 'json_object' },
  });

  const jsonResponse = JSON.parse(completion.choices[0].message.content);
  return jsonResponse;
};
