import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HeroesArray from "./pages/HeroesArray.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CharacterDetail from "./pages/CharacterDetail.jsx";

// Componente wrapper para controlar estados globais
function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [countFavorite, setCountFavorite] = useState(
    JSON.parse(localStorage.getItem("countFavorite")) || 0
  );

  useEffect(() => {});

  function onSwitchFavorite(taskId) {
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
    setTasks(updatedTasks);
    setCountFavorite(updatedTasks.filter((task) => task.favorite).length);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    localStorage.setItem(
      "countFavorite",
      JSON.stringify(updatedTasks.filter((task) => task.favorite).length)
    );
    return updatedTasks;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <HeroesArray
          tasks={tasks}
          setTasks={setTasks}
          countFavorite={countFavorite}
          onSwitchFavorite={onSwitchFavorite}
        />
      ),
    },
    {
      path: "/descricao",
      element: (
        <CharacterDetail
          tasks={tasks}
          setTasks={setTasks}
          countFavorite={countFavorite}
          setCountFavorite={setCountFavorite}
          onSwitchFavorite={onSwitchFavorite}
        />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
export default App;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
