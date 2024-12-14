import { useEffect, useState } from "react";
import { CreateTodoDialog } from "@/components/create-todo";
import { TodoCard } from "@/components/todo-card";
import { Todo, TodosResponseType } from "@/types/todo";
import { Input } from "@/components/ui/input";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";
import { toast } from "sonner";
import TitleBar from "./components/title-bar";

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState("");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    window.electron.loadTodos().then((data: TodosResponseType) => {
      if (data.data)
        setTodos(
          data.data.todos.map((todo) => ({ ...todo, id: todo.id.toString() }))
        );
    });
  }, []);

  const handleCreateTodo = (todoData: Omit<Todo, "id">) => {
    const createTodo = async () => {
      try {
        const lastId = Math.max(...todos.map((todo) => parseInt(todo.id)), 0);
        const id = (lastId + 1).toString();
        const newTodo: Todo = {
          ...todoData,
          id,
        };
        const response = await window.electron.createTodo(newTodo);
        if (response.success) {
          setTodos((prev) => [...prev, newTodo]);
          toast.success("Todo created successfully");
        }
      } catch (error) {
        toast.error("There was an error creating the todo");
      }
    };

    createTodo();
  };

  const handleEditTodo = async (editedTodo: Todo, todos: Todo) => {
    try {
      const res = await window.electron.editTodo(editedTodo);
      if (!res.success)
        return toast.error("There was an error updating the todo");
      toast.success("Todo updated successfully");
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editedTodo.id ? { ...todo, ...editedTodo } : todo
        )
      );
    } catch (error) {
      toast.error("There was an error deleting the todo");
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      const res = await window.electron.deleteTodo(Number(id));
      if (!res.success)
        return toast.error("There was an error deleting the todo");
      toast.success("Todo deleted successfully");
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      toast.error("There was an error deleting the todo");
    }
  };

  const handleToggleTodo = async (todo: Todo) => {
    try {
      const res = await window.electron.toggleTodo({
        ...todo,
        completed: !todo.completed,
      });
      if (!res.success)
        return toast.error("There was an error toggling the todo");

      setTodos((prev) =>
        prev.map((t) =>
          t.id === todo.id ? { ...t, completed: !t.completed } : t
        )
      );
      toast.success("Todo toggled successfully");
    } catch (error) {
      toast.error("There was an error toggling the todo");
    }
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground tracking-tight">
      <TitleBar />
      <div className="mx-auto p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            📝 EasyNotes
            <span className="text-xs font-extralight italic"> v1.0</span>
          </h1>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <CreateTodoDialog onSubmit={handleCreateTodo} />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-foreground"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          <Input
            type="search"
            placeholder="Search notes..."
            value={search}
            className="ring-1 ring-white/50"
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {filteredTodos &&
              filteredTodos.map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  onDelete={handleDeleteTodo}
                  onEdit={(editedTodo) =>
                    handleEditTodo({ ...editedTodo, id: todo.id }, todo)
                  }
                  onToggle={handleToggleTodo}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
