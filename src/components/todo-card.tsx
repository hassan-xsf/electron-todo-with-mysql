import { Trash2, Calendar } from "lucide-react";
import { Todo } from "../types/todo";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { format } from "date-fns";
import { CreateTodoDialog } from "./create-todo";

interface TodoCardProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onEdit: (todo: Omit<Todo, "id">) => void;
  onToggle: (todo: Todo) => void;
}

export function TodoCard({ todo, onDelete, onEdit, onToggle }: TodoCardProps) {
  return (
    <div
      className={`rounded-lg p-4 text-white space-y-4 w-full h-[180px] max-w-md shadow-xl flex flex-col ${
        todo.color.startsWith("#") ? "" : todo.color
      } ${todo.completed ? "opacity-50" : ""}`}
      style={{
        backgroundColor: todo.color.startsWith("#") ? todo.color : undefined,
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2">
          <h3
            className={`font-bold  text-white text-lg break-words truncate ${
              todo.completed ? "line-through" : ""
            }`}
          >
            {todo.title[0].toUpperCase() + todo.title.slice(1)}
          </h3>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <CreateTodoDialog
            todo={todo}
            mode="edit"
            onSubmit={(editedTodo) => onEdit(editedTodo)}
          />
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/20"
            onClick={() => onDelete(todo.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo)}
            className="border-white data-[state=checked]:bg-white/20 data-[state=checked]:border-white"
          />
        </div>
      </div>
      <p
        className={`text-sm text-white/90 break-words flex-grow overflow-y-auto ${
          todo.completed ? "line-through" : ""
        }`}
      >
        {todo.description}
      </p>
      {todo.deadline && (
        <div
          className={`flex items-center text-sm text-white/90 mt-auto ${
            todo.completed ? "line-through" : ""
          }`}
        >
          <Calendar className="h-4 w-4 mr-2 shrink-0" />
          {format(new Date(todo.deadline), "MM/dd/yyyy")}
        </div>
      )}
    </div>
  );
}
