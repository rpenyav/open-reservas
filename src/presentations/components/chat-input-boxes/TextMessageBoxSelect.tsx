interface Option {
  text: string;
}

interface TextMessageBoxSelectProps {
  inputValue: string; // Valor del textarea
  onTextChange: (text: string) => void; // Actualizar texto del textarea
  onSendMessage: () => void; // Enviar mensaje
  placeholder?: string;
  options: Option[];
  onOptionSelect: (option: Option) => void; // Enviar al seleccionar
  isLoading: boolean; // Estado de carga
  onAbort: () => void; // Acción para abortar
}

export const TextMessageBoxSelect = ({
  inputValue,
  onTextChange,
  onSendMessage,
  placeholder = "Escribe aquí...",
  options,
  onOptionSelect,
  isLoading,
  onAbort,
}: TextMessageBoxSelectProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Evita un salto de línea en el textarea
      onSendMessage(); // Llama a la función de envío
    }
  };

  return (
    <div className="flex gap-2 items-start">
      {/* Textarea */}
      <textarea
        className="flex w-full border rounded-sm text-gray-800 focus:outline-none focus:border-indigo-300 pt-2 pl-4 h-10"
        value={inputValue}
        placeholder={placeholder}
        rows={1}
        onChange={(e) => onTextChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {/* Select */}
      <select
        className="flex w-1/4 border rounded-sm text-gray-800 focus:outline-none focus:border-indigo-300 pt-1 pl-4 h-10"
        onChange={(e) =>
          onOptionSelect(
            options.find((opt) => opt.text === e.target.value) || { text: "" }
          )
        }
        defaultValue=""
      >
        <option value="" disabled>
          Selecciona una especialidad
        </option>
        {options.map((option) => (
          <option key={option.text} value={option.text}>
            {option.text}
          </option>
        ))}
      </select>

      {/* Button */}
      <button
        className={`p-2 rounded ${
          isLoading
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        onClick={isLoading ? onAbort : onSendMessage}
      >
        {isLoading ? "Abortar" : "Enviar"}
      </button>
    </div>
  );
};
