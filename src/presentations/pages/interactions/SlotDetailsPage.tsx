import { useParams } from "react-router-dom";

export const SlotDetailsPage = () => {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Detalles del Slot</h1>
      <p>Estás viendo los detalles del slot con ID: {id}</p>
      {/* Aquí puedes añadir más lógica para cargar y mostrar detalles desde un backend */}
    </div>
  );
};
