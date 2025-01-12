import { RouterProvider } from "react-router-dom";
import { router } from "./presentations/router/router";

const OpenReservas = () => {
  return <RouterProvider router={router} />;
};

export default OpenReservas;
