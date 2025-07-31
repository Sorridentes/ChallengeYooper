import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HeroesArray from "./pages/HeroesArray.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CharacterDetail from "./pages/CharacterDetail.jsx";

function onSwitchFavorite(taskId, tasks, countFavorite) {
  const updatedTasks = tasks.map((task) => {
    if (task.id === taskId) {
      if (countFavorite < 5 || task.favorite)
        return { ...task, favorite: !task.favorite };
      else {
        alert("Você já tem 5 favoritos. Remova um para adicionar outro.");
        return task;
      }
    }
    return task;
  });
  return updatedTasks;
}

const router = createBrowserRouter([
  { path: "/", element: <HeroesArray onSwitchFavorite={onSwitchFavorite} /> },
  { path: "/descricao", element: <CharacterDetail /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <footer><span></span></footer>
  </StrictMode>
);
