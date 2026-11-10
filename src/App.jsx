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

  // --- CRUD ---

  const createTask = (columnId) => {
    const newTask = {
      id: uuidv4(),
      columnId,
      content: `New task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const updateTask = (id, content) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, content } : task)));
  };

  // --- DRAG & DROP ---

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

    // 1. Over another task
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

    // 2. Over an empty column
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

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="app">
      <header className="titleblock">
        <div className="tb-left">
          <div className="k">DRAWING No. 04 — BOARD LAYOUT</div>
          <h1>KANBAN FLOW</h1>
        </div>

        <div className="tb-right">
          <div className="tb-cell"><span className="k">TASKS</span><span className="v">{pad(tasks.length)}</span></div>
          <div className="tb-cell"><span className="k">SHEET</span><span className="v">01 / 01</span></div>
          <div className="tb-cell"><span className="k">SCALE</span><span className="v">1:1</span></div>
          <div className="tb-cell"><span className="k">STATES</span><span className="v">03</span></div>
          <button
            className="reset"
            onClick={() => {
              if (window.confirm("Reset the board?")) setTasks(INITIAL_TASKS);
            }}
          >
            RESET
          </button>
        </div>
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="board">
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

      <footer className="legend">
        <div className="items">
          <span>— — ZONE LIMIT</span>
          <span>▭ TASK CARD</span>
          <span>DRAG TO MOVE</span>
        </div>
        <span>05 TASKS · LOCALSTORAGE</span>
      </footer>
    </div>
  );
}

export default App;
