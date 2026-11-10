import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableTask from "./SortableTask";

const ZONE = { todo: "ZONE A", "in-progress": "ZONE B", done: "ZONE C" };
const STATUS = { todo: "PENDING", "in-progress": "ACTIVE", done: "COMPLETED" };

const Column = ({ col, tasks, createTask, deleteTask, updateTask }) => {
  const { setNodeRef } = useDroppable({ id: col.id });

  return (
    <section className="zone">
      <div className="zone-head">
        <span className="t">
          {ZONE[col.id] || "ZONE"} — {col.title.toUpperCase()}
        </span>
        <span className="c">{String(tasks.length).padStart(2, "0")}</span>
      </div>

      <div ref={setNodeRef} className="zone-cards">
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <SortableTask
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
              status={STATUS[col.id] || "PENDING"}
            />
          ))}
        </SortableContext>
      </div>

      <button className="add" onClick={() => createTask(col.id)}>
        + ADD TASK
      </button>
    </section>
  );
};

export default Column;
