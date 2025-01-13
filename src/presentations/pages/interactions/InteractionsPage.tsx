import { useRef, useState, useEffect } from "react";
import {
  GptMessage,
  HumanMessage,
  TypingLoader,
  TextMessageBoxSelect,
} from "../../components";
import { interactionStreamGenUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
}

export const InteractionsPage = () => {
  const abortController = useRef(new AbortController());
  const isRunning = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Ref para el scroll
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState(""); // Texto del textarea

  const handlePost = async (text: string) => {
    if (isRunning.current) {
      abortController.current.abort(); // Abortar si ya hay una operación en curso
      abortController.current = new AbortController();
      return; // Salir si la acción actual es abortar
    }

    setIsLoading(true);
    isRunning.current = true;
    setMessages((prev) => [...prev, { text: text.trim(), isGpt: false }]);

    const stream = interactionStreamGenUseCase(
      text.trim(),
      abortController.current.signal
    );

    setMessages((messages) => [...messages, { text: "", isGpt: true }]);

    try {
      for await (const text of stream) {
        setMessages((messages) => {
          const newMessages = [...messages];
          newMessages[newMessages.length - 1].text = text;
          return newMessages;
        });
      }
    } catch (error) {
      console.log("Operación abortada o error:", error);
    } finally {
      isRunning.current = false;
      setIsLoading(false);
      setInputText(""); // Limpiar el texto del textarea
    }
  };

  const handleOptionSelect = (option: string) => {
    const combinedText = inputText ? `${inputText} (${option})` : option;
    handlePost(combinedText);
  };

  // Efecto para hacer scroll automáticamente al final
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-1">
          {/* Bienvenida */}
          <GptMessage
            text={`Bienvenida/o. Planifica tus citas legales con Inteligencia Artificial.  
Escribe la fecha y hora, rango de fechas, nombre de tu agente legal o especialidad.`}
          />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
            ) : (
              <HumanMessage key={index} text={message.text} />
            )
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}

          {/* Div de referencia para el scroll */}
          <div ref={messagesEndRef}></div>
        </div>
      </div>

      <TextMessageBoxSelect
        inputValue={inputText} // Texto actual del textarea
        onTextChange={setInputText} // Actualizar texto ingresado
        onSendMessage={() => handlePost(inputText)} // Enviar solo lo escrito
        placeholder="Escribe aquí lo que deseas"
        options={[{ text: "Laboral" }, { text: "Civil" }, { text: "Penal" }]} // Opciones del select
        onOptionSelect={(option) => handleOptionSelect(option.text)} // Enviar al seleccionar
        isLoading={isLoading} // Indicar si está cargando
        onAbort={() => {
          if (isRunning.current) {
            abortController.current.abort();
          }
        }} // Función para abortar
      />
    </div>
  );
};
