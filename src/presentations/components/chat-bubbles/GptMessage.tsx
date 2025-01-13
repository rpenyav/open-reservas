import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  text: string;
}

export const GptMessage = ({ text }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [slotId, setSlotId] = useState<string | null>(null); // Identificador del slot

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url: string
  ) => {
    e.preventDefault(); // Evita la navegación
    const id = url.split("/").pop(); // Obtén el último segmento de la URL como ID
    setSlotId(id || null);
    setIsModalOpen(true); // Abre el modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSlotId(null);
  };

  return (
    <div className="col-start-1 col-end-12 p-3 rounded-lg">
      <div className="flex flex-row items-start w-full">
        {/* Ícono */}
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
          G
        </div>
        {/* Contenido */}
        <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-3 shadow rounded-xl w-full">
          <ReactMarkdown
            components={{
              a: ({ href, children, ...props }) => {
                if (href) {
                  return (
                    <a
                      {...props}
                      href={href}
                      onClick={(e) => handleLinkClick(e, href)}
                      className="text-blue-500 underline hover:text-blue-700"
                    >
                      {children}
                    </a>
                  );
                }
                return null;
              },
            }}
          >
            {text}
          </ReactMarkdown>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Detalles del Slot</h2>
            <p className="mb-4">
              <strong>Identificador:</strong> {slotId}
            </p>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
