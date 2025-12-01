import { GripVertical, Trash2 } from "lucide-react";

const TaskCard = ({ task, deleteTask }) => {
  return (
    <div 
      // CAMBIOS VISUALES AQUÍ:
      // 1. p-3 (antes p-4) -> Más compacto
      // 2. min-h-[auto] -> Para que se ajuste al texto
      // 3. hover:ring-2 -> Efecto de borde más bonito al pasar mouse
      className="bg-card p-3 rounded-lg border border-white/5 shadow-sm hover:border-white/10 group flex items-start gap-2 cursor-grab relative pr-7 hover:ring-1 hover:ring-blue-500/30 transition-all"
    >
      {/* Botón de agarre más sutil */}
      <button className="text-gray-600 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing transition-opacity mt-0.5">
        <GripVertical size={14} />
      </button>
      
      {/* Texto más compacto y gris claro */}
      <p className="text-sm text-gray-300 leading-tight whitespace-pre-wrap break-words w-full">
        {task.content}
      </p>

      {/* Botón de borrar más pequeño */}
      <button 
        onClick={() => deleteTask(task.id)}
        className="absolute right-2 top-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-white/5 rounded"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
};

export default TaskCard;