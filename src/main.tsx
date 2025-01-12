import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import OpenReservas from "./OpenReservas";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OpenReservas />
  </StrictMode>
);
