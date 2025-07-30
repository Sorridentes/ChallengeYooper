import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HeroesArray from "./pages/HeroesArray.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CharacterDetail from "./pages/CharacterDetail.jsx";

const router = createBrowserRouter([
  { path: "/", element: <HeroesArray /> },
  { path: "/descricao", element: <CharacterDetail /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <footer>Criado por Rodrigo Silva</footer>
  </StrictMode>
);
