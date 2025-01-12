import { useState } from "react";
import {
  GptMessage,
  HumanMessage,
  TextMessageBox,
  TextMessageBoxFile,
  TextMessageBoxSelect,
  TypingLoader,
} from "../../components";

interface Messages {
  text: string;
  isGpt: boolean;
}

export const OrtographyPage = () => {
  const [isLoading, setIsloading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);

  const handlePost = async (text: string) => {
    setIsloading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);
    setIsloading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola, soy GPT-3 de Reservas. ¿En qué puedo ayudarte?" />
          {messages.map((message, index: number) =>
            message.isGpt ? (
              <GptMessage key={index} text="esto es de openai" />
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
