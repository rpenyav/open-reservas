export async function* prosConsDiscusserStreamGeneratorUseCase(
  prompt: string,
  abortSignal: AbortSignal
): AsyncGenerator<string> {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
        signal: abortSignal,
      }
    );

    if (!resp.ok) {
      console.error(`Error en la petición: ${resp.status} ${resp.statusText}`);
      yield "Error en la solicitud al servidor.";
      return;
    }

    const reader = resp.body?.getReader();

    if (!reader) {
      console.error("No se pudo obtener el lector del cuerpo de la respuesta");
      yield "Error: no se pudo leer la respuesta.";
      return;
    }

    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const decodedChunk = decoder.decode(value, { stream: true });
      yield decodedChunk; // Emitir cada fragmento decodificado
    }
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.log("Operación abortada por el usuario.");
      return; // Finaliza silenciosamente en caso de aborto
    }
    console.error("Error durante la operación:", error);
    yield "Error interno durante el procesamiento.";
  }
}
