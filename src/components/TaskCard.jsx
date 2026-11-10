import { useState } from "react";

const TaskCard = ({ task, deleteTask, updateTask, status = "PENDING" }) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const canEdit = Boolean(updateTask);

  const toggleEditMode = () => {
    if (!canEdit) return;
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      setEditMode(false);
    }
  };

  const code = `T-${String(task.id).slice(0, 4).toUpperCase()}`;

  if (editMode) {
    return (
      <div className="card">
        <textarea
          className="card-input"
          value={task.content}
          autoFocus
          placeholder="Task content"
          onBlur={toggleEditMode}
          onKeyDown={onKeyDown}
          onChange={(e) => updateTask(task.id, e.target.value)}
          rows={3}
        />
      </div>
    );
  }

  return (
    <div
      className="card"
      onClick={toggleEditMode}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <div className="card-row">
        <span className="code">
          {code} / {status}
        </span>
        {mouseIsOver && deleteTask && (
          <button
            className="del"
            title="Delete task"
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task.id);
            }}
          >
            ×
          </button>
        )}
      </div>
      <div className="txt">{task.content}</div>
    </div>
  );
};

export default TaskCard;
