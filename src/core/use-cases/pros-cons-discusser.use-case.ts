import { ProsConsDiscusserResponse } from "../../interfaces";

export const prosConsDiscusserUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!resp.ok) throw new Error("Error en la petición");
    const data = (await resp.json()) as ProsConsDiscusserResponse;
    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    return {
      ok: false,
      content: "no se pudo realizar la operación",
    };
  }
};
