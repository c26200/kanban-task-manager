import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";

const SortableTask = ({ task, deleteTask, updateTask }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { type: "Task", task } });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-white/5 p-3 rounded-lg border border-dashed border-white/20 min-h-[50px] opacity-50"
      />
    );
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard 
        task={task} 
        deleteTask={deleteTask} 
        updateTask={updateTask}
      />
    </div>
  );
};

export default SortableTask;