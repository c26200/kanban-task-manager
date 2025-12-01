import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import {
  DndContext,
  closestCorners,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { COLUMNS, INITIAL_TASKS } from "./data/board";
import TaskCard from "./components/TaskCard";
import Column from "./components/Column";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("kanban-tasks");
    return savedTasks ? JSON.parse(savedTasks) : INITIAL_TASKS;
  });
  
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } })
  );

  useEffect(() => {
    localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // --- CRUD FUNCTIONS ---

  const createTask = (columnId) => {
    const newTask = {
      id: uuidv4(),
      columnId,
      content: `Nueva tarea ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };

  // NUEVA FUNCIÓN: Actualizar el texto de la tarea
  const updateTask = (id, content) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, content } : task
    );
    setTasks(newTasks);
  };

  // --- DRAG & DROP LOGIC ---

  const handleDragStart = (event) => {
    setActiveTask(event.active.data.current?.task);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";

    if (!isActiveTask) return;

    // 1. Sobre otra tarea
    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
        }
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    // 2. Sobre una columna vacía
    const isOverColumn = COLUMNS.some((col) => col.id === overId);
    if (isActiveTask && isOverColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        tasks[activeIndex].columnId = overId;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const handleDragEnd = () => {
    setActiveTask(null);
  };

  return (
    <div className="h-screen w-full flex flex-col p-10 bg-main text-white items-center">
      <div className="w-full max-w-7xl mb-10 flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight">Kanban Flow</h1>
        <button 
          onClick={() => {
             if(confirm("¿Resetear tablero?")) setTasks(INITIAL_TASKS)
          }}
          className="text-xs text-gray-500 hover:text-white transition-colors"
        >
          Reset Board
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-8 h-full justify-center w-full max-w-7xl">
          {COLUMNS.map((col) => (
            <Column
              key={col.id}
              col={col}
              tasks={tasks.filter((t) => t.columnId === col.id)}
              createTask={createTask}
              deleteTask={deleteTask}
              updateTask={updateTask} 
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default App;