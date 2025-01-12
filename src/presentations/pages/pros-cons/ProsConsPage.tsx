import { useState } from "react";
import {
  GptMessage,
  HumanMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components";
import { prosConsDiscusserUseCase } from "../../../core/use-cases";

interface Messages {
  text: string;
  isGpt: boolean;
  info?: {
    role: string;
    content: string;
  };
}

export const ProsConsPage = () => {
  const [isLoading, setIsloading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);

  const handlePost = async (text: string) => {
    setIsloading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const { ok, content } = await prosConsDiscusserUseCase(text);
    setIsloading(false);
    if (!ok) return;

    setMessages((prev) => [...prev, { text: content, isGpt: true }]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola, soy GPT-3 de Reservas. ¿En qué puedo ayudarte?" />
          {messages.map((message, index: number) =>
            message.isGpt ? (
              <GptMessage text={message.text} key={index} />
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
        placeholder={"Escribe aqui el mensaje"}
        disableCorrections={true}
      />
      {/* <TextMessageBoxFile onSendMessage={handlePost} /> */}
      {/* <TextMessageBoxSelect
        onSendMessage={handlePost}
        placeholder={""}
        disableCorrections={false}
        options={[
          { id: "1", text: "uno" },
          { id: "2", text: "dos" },
        ]}
      /> */}
    </div>
  );
};
