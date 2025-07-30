import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HerosArray from "./pages/HerosArray.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CharacterDetail from "./pages/CharacterDetail.jsx";

const router = createBrowserRouter([
  { path: "/", element: <HerosArray /> },
  { path: "/descrição", element: <CharacterDetail /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
