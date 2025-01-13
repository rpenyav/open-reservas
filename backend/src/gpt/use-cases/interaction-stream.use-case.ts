import OpenAI from 'openai';
import { GptService } from '../gpt.service';

interface Options {
  prompt: string;
}

// Función para formatear fechas
function formatDate(date: string | Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  return new Intl.DateTimeFormat('es-ES', options).format(new Date(date));
}

export const interactionStream = async (
  openai: OpenAI,
  { prompt }: Options,
) => {
  const gptService = new GptService();
  // Llamar al método para obtener datos en JSON
  const dummyDataJson = await gptService.getDummyDataAsJson();

  // Formatear las fechas justo antes de serializar
  const formattedData = {
    ...dummyDataJson,
    results: dummyDataJson.results.map((lawyer: any) => ({
      ...lawyer,
      slots: lawyer.slots.map((slot: any) => ({
        ...slot,
        dateStart: formatDate(slot.dateStart), // Formatear dateStart
        dateEnd: formatDate(slot.dateEnd), // Formatear dateEnd
      })),
    })),
  };

  const formattedDataSerialized = JSON.stringify(formattedData, null, 2);
  // Mostrar los resultados formateados por consola
  console.log(
    'Resultados de DUMMY_DATA filtrados y formateados a 1 mes vista:',
    formattedDataSerialized,
  );

  const exampleResponse = `
  - Abogado: Paquito Gomez 
  - Especialidad: ded 
  - Fecha de inicio: 22/01/2025, 10:00 
  - Fecha de fin: 22/01/2025, 11:00 
  - Disponible: Sí 
  
  [Reservar cita](http://localhost:3000/slots/1) 
  `;

  const promptWithFormattedData = `
  Aquí tienes un conjunto de datos de citas en formato JSON:
  ${formattedDataSerialized}
  
  Por favor, responde a la siguiente consulta basada únicamente en los datos proporcionados:
  ${prompt}
  
  ### Tu respuesta debe seguir estrictamente este formato para cada cita:
  
  ${exampleResponse}
  
  -. Busca tanto en la información del abogado (nombre, especialidad, etc.) como en los detalles de los slots (fechas, disponibilidad, etc.).
  -. Si la consulta menciona el nombre o especialidad de un abogado, identifica los slots correspondientes de ese abogado.
  -. Si se pregunta por slots disponibles en general, busca en todos los abogados y sus respectivos slots.
  -. Las fechas deben estar en el formato DD/MM/YYYY, HH:mm.
  -. Añade un enlace a la URL de cada cita al final de cada registro.
  -. El enlace debe estar presente al final de cada cita y usar el formato \`<a href="[URL]" class="btn-reservar">Reservar cita</a>\`.
  -. "Disponible" debe ser "Sí" o "No".
  -. No agregues contenido adicional fuera de este formato.
  -. Si no hay citas disponibles, responde únicamente con "No se encontraron citas disponibles.".
  -. Si la cita existe pero no está disponible, debes responder "Esta cita no está disponible.".

`;

  return await openai.chat.completions.create({
    stream: true,
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `
        Eres un asistente que responde exclusivamente en base a los datos JSON proporcionados.
        Tus respuestas deben estar estrictamente basadas en la información dada.
      `,
      },
      {
        role: 'user',
        content: promptWithFormattedData,
      },
    ],
    temperature: 0.3,
    max_tokens: 1200,
  });
};
