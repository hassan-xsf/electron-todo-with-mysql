import { DraggableProvided, DroppableProvided } from "react-beautiful-dnd";

export interface Todo {
  id: string;
  title: string;
  description: string;
  deadline?: string;
  completed: boolean;
  color: string;
}

export interface TodosResponseType extends ResponseType {
  data?: {
    todos: Todo[];
  };
}
export type ResponseType = {
  success: boolean;
  error?: string;
};

export type TodoColor =
  | "orange"
  | "green"
  | "blue"
  | "red"
  | "yellow"
  | "purple"
  | "pink"
  | "cyan"
  | "custom";

export const colorMap: Record<TodoColor, string> = {
  orange: "bg-orange-500 hover:bg-orange-600",
  green: "bg-emerald-500 hover:bg-emerald-600",
  blue: "bg-blue-500 hover:bg-blue-600",
  red: "bg-red-500 hover:bg-red-600",
  yellow: "bg-yellow-500 hover:bg-yellow-600",
  purple: "bg-purple-500 hover:bg-purple-600",
  pink: "bg-pink-500 hover:bg-pink-600",
  cyan: "bg-cyan-500 hover:bg-cyan-600",
  custom: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
};

export interface DraggableRenderProps {
  draggableProps: DraggableProvided["draggableProps"];
  dragHandleProps: DraggableProvided["dragHandleProps"];
}

export interface DroppableRenderProps {
  droppableProps: DroppableProvided["droppableProps"];
  placeholder: DroppableProvided["placeholder"];
}
