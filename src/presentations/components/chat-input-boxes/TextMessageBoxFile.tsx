import React, { FormEvent, useRef, useState } from "react";

interface Props {
  onSendMessage: (message: string) => void;
  accept?: string;
}

export const TextMessageBoxFile = ({ onSendMessage, accept }: Props) => {
  const [message, setMessage] = useState("");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>();

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim().length === 0) return;

    onSendMessage(message);
    setMessage("");
  };
  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >
      <div className="mr-3">
        <button
          type="button"
          className="flex items-center justity-center text-gray-400 hover:text-gray-600"
          onClick={() => inputFileRef.current?.click()}
        >
          <i className="fa-solid fa-paperclip text-xl" />
        </button>
        <input
          type="file"
          ref={inputFileRef}
          accept={accept}
          onChange={(e: any) => setSelectedFile(e.target.files?.item(0))}
          hidden
        />
      </div>
      <div className="flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            autoFocus
            name="message"
            className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
      <div className="ml-4">
        <button className="btn-primary" disabled={!selectedFile}>
          <span className="mr-2">
            {!selectedFile ? (
              <>Enviar</>
            ) : (
              <>{selectedFile.name.substring(0, 10) + "..."}</>
            )}
          </span>
          <i className="fa-regular fa-paper-plane" />
        </button>
      </div>
    </form>
  );
};
