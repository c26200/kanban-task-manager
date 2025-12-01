import { v4 as uuidv4 } from 'uuid'; // Si no tienes uuid, usaremos strings simples por ahora

export const INITIAL_TASKS = [
  {
    id: '1',
    columnId: 'todo',
    content: 'Analizar competidores',
  },
  {
    id: '2',
    columnId: 'todo',
    content: 'Diseñar wireframes de alta fidelidad',
  },
  {
    id: '3',
    columnId: 'in-progress',
    content: 'Configurar base de datos (Supabase)',
  },
  {
    id: '4',
    columnId: 'in-progress',
    content: 'Implementar autenticación',
  },
  {
    id: '5',
    columnId: 'done',
    content: 'Crear repositorio en GitHub',
  },
];

export const COLUMNS = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];