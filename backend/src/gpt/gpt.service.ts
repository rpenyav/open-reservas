import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { interactionStream } from './use-cases';
import { InteractionDtoStream } from './dtos/';
import axios from 'axios';

@Injectable()
export class GptService {
  private readonly openai: OpenAI;
  private readonly externalApiUrl: string; // Variable para la URL externa

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.externalApiUrl =
      process.env.EXTERNAL_API_URL || 'http://localhost:5173'; // Default si no está definida
  }

  async interactionStream(interactionDtoStream: InteractionDtoStream) {
    return await interactionStream(this.openai, {
      prompt: interactionDtoStream.prompt,
    });
  }

  async getDummyDataAsJson() {
    const response = await axios.get('http://localhost:3000/reservas/slots');

    const today = new Date();
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(today.getMonth() + 1);

    const filteredData = response.data
      .map((lawyer: any) => ({
        ...lawyer,
        slots: lawyer.slots.filter(
          (slot: any) =>
            new Date(slot.dateStart) >= today &&
            new Date(slot.dateStart) <= oneMonthLater,
        ),
      }))
      .filter((lawyer: any) => lawyer.slots.length > 0); // Eliminar abogados sin slots en el rango

    console.log('Datos filtrados:', JSON.stringify(filteredData, null, 2));

    // Añadir un enlace dinámico a cada resultado usando EXTERNAL_API_URL
    const resultsWithActions = filteredData.map((lawyer) => ({
      ...lawyer,
      slots: lawyer.slots.map((slot) => ({
        ...slot,
        action: {
          text: 'Reservar cita',
          url: `${this.externalApiUrl}/slots/${slot.id}`, // Usar EXTERNAL_API_URL
        },
      })),
    }));

    return {
      totalResults: resultsWithActions.length,
      results: resultsWithActions,
    };
  }

  // getDummyDataAsJson() {
  //   const today = new Date();
  //   const oneMonthLater = new Date();
  //   oneMonthLater.setMonth(today.getMonth() + 1);

  //   const filteredData = DUMMY_DATA.list.filter(
  //     (item) =>
  //       new Date(item.dateStart) >= today &&
  //       new Date(item.dateStart) <= oneMonthLater,
  //   );

  //   Añadir un enlace dinámico a cada resultado
  //   const resultsWithUrls = filteredData.map((item) => ({
  //     ...item,
  //     url: `http://localhost:3000/slots/${item.id}`, // URL dinámica
  //   }));

  //   console.log(
  //     'Resultados de DUMMY_DATA filtrados a 1 mes vista con URL:',
  //     JSON.stringify(resultsWithUrls, null, 2),
  //   );

  //   return {
  //     totalResults: resultsWithUrls.length,
  //     results: resultsWithUrls,
  //   };
  // }
}
