import { useRef, useState } from "react";
import {
  GptMessage,
  HumanMessage,
  TypingLoader,
  TextMessageBox,
} from "../../components";
import { prosConsDiscusserStreamGeneratorUseCase } from "../../../core/use-cases";

interface Messages {
  text: string;
  isGpt: boolean;
}

export const ProsConsStreamPage = () => {
  const abortController = useRef(new AbortController());
  const isRunning = useRef(false);
  const [isLoading, setIsloading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);

  const handlePost = async (text: string) => {
    if (isRunning.current) {
      // Abort the previous stream
      abortController.current.abort();
      abortController.current = new AbortController(); // Create a new controller
    }

    setIsloading(true);
    isRunning.current = true;

    // Add the user's message to the state
    setMessages((prev) => [...prev, { text, isGpt: false }]);

    try {
      // Get the generator stream
      const stream = prosConsDiscusserStreamGeneratorUseCase(
        text,
        abortController.current.signal
      );

      // Add an empty GPT message to the state for streaming
      setMessages((prev) => [...prev, { text: "", isGpt: true }]);

      for await (const chunk of stream) {
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          lastMessage.text += chunk; // Accumulate chunks in the last message
          return newMessages;
        });
      }
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Error durante la operación:", error);
        setMessages((prev) => [
          ...prev,
          { text: "Error interno durante el procesamiento.", isGpt: true },
        ]);
      }
    } finally {
      setIsloading(false);
      isRunning.current = false;
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola, soy GPT-3 de Reservas. ¿En qué puedo ayudarte?" />
          {messages.map((message, index: number) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
            ) : (
              <HumanMessage key={index} text={message.text} />
            )
          )}
          {isLoading && (
            <div className="col-start-1 col-end-12">
              <TypingLoader className="fade-in" />
            </div>
          )}
        </div>
      </div>

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder={"Escribe aquí tu mensaje"}
        disableCorrections={true}
      />
    </div>
  );
};
