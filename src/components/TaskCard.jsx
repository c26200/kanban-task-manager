import { useState } from "react";
import { GripVertical, Trash2 } from "lucide-react";

const TaskCard = ({ task, deleteTask, updateTask }) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      setEditMode(false);
    }
  };

  if (editMode) {
    return (
      <div
        className="bg-card p-3 rounded-lg border border-white/5 shadow-sm flex items-start gap-2 relative min-h-[60px]"
      >
        <textarea
          className="bg-transparent text-white w-full resize-none border-none rounded focus:outline-none text-sm leading-tight custom-scrollbar"
          value={task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={onKeyDown}
          onChange={(e) => updateTask(task.id, e.target.value)}
          rows={3}
          style={{ height: "auto" }}
        />
      </div>
    );
  }

  return (
    <div
      onClick={toggleEditMode}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      className="bg-card p-3 rounded-lg border border-white/5 shadow-sm hover:border-white/10 group flex items-start gap-2 cursor-grab relative pr-7 hover:ring-1 hover:ring-blue-500/30 transition-all min-h-[40px] text-left"
    >
      <button className="text-gray-600 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing transition-opacity mt-0.5">
        <GripVertical size={14} />
      </button>

      <p className="text-sm text-gray-300 leading-tight whitespace-pre-wrap break-words w-full select-none pointer-events-none">
        {task.content}
      </p>

      {mouseIsOver && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.id);
          }}
          className="absolute right-2 top-2 text-gray-500 hover:text-red-400 transition-all p-1 hover:bg-white/5 rounded z-10"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
};

export default TaskCard;