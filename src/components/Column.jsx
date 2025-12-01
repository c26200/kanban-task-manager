import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import SortableTask from "./SortableTask";

const Column = ({ col, tasks, createTask, deleteTask, updateTask }) => {
  const { setNodeRef } = useDroppable({
    id: col.id,
  });

  return (
    <div className="w-[350px] flex flex-col">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-gray-400 font-semibold uppercase text-xs tracking-wider">
          {col.title}
        </h2>
        <span className="bg-white/10 text-gray-400 text-xs px-2 py-0.5 rounded-full font-medium">
          {tasks.length}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className="flex-1 bg-column rounded-2xl p-3 flex flex-col gap-3 overflow-y-auto border border-transparent hover:border-white/5 transition-colors h-full min-h-[150px]"
      >
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
            />
          ))}
        </SortableContext>
      </div>

      <button
        onClick={() => createTask(col.id)}
        className="mt-3 flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all text-sm font-medium group"
      >
        <div className="p-1 bg-white/5 rounded group-hover:bg-highlight group-hover:text-white transition-colors">
          <Plus size={16} />
        </div>
        Add Task
      </button>
    </div>
  );
};

export default Column;