import { Navigate, createBrowserRouter } from "react-router-dom";
import { InteractionsPage, SlotDetailsPage } from "../pages";
import { DashboardLayout } from "../layout/DashboardLayout";
import { NotFound } from "../pages/NotFound";

export const menuRoutes = [
  {
    to: "/interactions",
    icon: "fa-solid fa-spell-check",
    title: "Interactions",
    description: "Chat Bot",
    component: <InteractionsPage />,
  },
  // {
  //   to: "/slots/:id",
  //   icon: "fa-solid fa-calendar",
  //   title: "Slot Details",
  //   description: "Detalles del slot",
  //   component: <SlotDetailsPage />, // Este será el componente que crearás para mostrar la información del slot
  // },
  // {
  //   to: "/pros-cons",
  //   icon: "fa-solid fa-code-compare",
  //   title: "Pros & Cons",
  //   description: "Comparar pros y contras",
  //   component: <ProsConsPage />,
  // },
  // {
  //   to: "/pros-cons-stream",
  //   icon: "fa-solid fa-water",
  //   title: "Como stream",
  //   description: "Con stream de mensajes",
  //   component: <ProsConsStreamPage />,
  // },
  // {
  //   to: "/translate",
  //   icon: "fa-solid fa-language",
  //   title: "Traducir",
  //   description: "Textos a otros idiomas",
  //   component: <TranslatePage />,
  // },
  // {
  //   to: "/text-to-audio",
  //   icon: "fa-solid fa-podcast",
  //   title: "Texto a audio",
  //   description: "Convertir texto a audio",
  //   component: <TextToAudioPage />,
  // },
  // {
  //   to: "/image-generation",
  //   icon: "fa-solid fa-image",
  //   title: "Imágenes",
  //   description: "Generar imágenes",
  //   component: <ImageGenerationPage />,
  // },
  // {
  //   to: "/image-tunning",
  //   icon: "fa-solid fa-wand-magic",
  //   title: "Editar imagen",
  //   description: "Generación continua",
  //   component: <ImageTunningPage />,
  // },
  // {
  //   to: "/audio-to-text",
  //   icon: "fa-solid fa-comment-dots",
  //   title: "Audio a texto",
  //   description: "Convertir audio a texto",
  //   component: <AudioToTextPage />,
  // },
  // {
  //   to: "/assistant",
  //   icon: "fa-solid fa-user",
  //   title: "Asistente",
  //   description: "Información del asistente",
  //   component: <AssistantPage />,
  // },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      ...menuRoutes.map((route) => ({
        path: route.to,
        element: route.component,
      })),
      { path: "", element: <Navigate to={menuRoutes[0].to} /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
