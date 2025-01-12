export const prosConsDiscusserStreamUseCase = async (
  prompt: string
): Promise<ReadableStreamDefaultReader<Uint8Array> | null> => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!resp.ok) {
      console.error(`Error en la petición: ${resp.status} ${resp.statusText}`);
      return null;
    }

    const reader = resp.body?.getReader();

    if (!reader) {
      console.error("No se pudo obtener el lector del cuerpo de la respuesta");
      return null;
    }

    return reader; // Devuelve el reader válido
  } catch (error) {
    console.error("Error durante la operación:", error);
    return null; // Devuelve null en caso de fallo
  }
};
