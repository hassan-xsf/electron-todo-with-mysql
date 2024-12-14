import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Todo, TodoColor, colorMap } from "../types/todo";
import { Plus, Pencil } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { Label } from "./ui/label";
import { replaceTextEmojis } from "@/lib/text-to-emoji";

interface CreateTodoDialogProps {
  onSubmit: (todo: Omit<Todo, "id">) => void;
  todo?: Todo;
  mode?: "create" | "edit";
}

export function CreateTodoDialog({
  onSubmit,
  todo,
  mode = "create",
}: CreateTodoDialogProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<Omit<Todo, "id">>({
    title: "",
    description: "",
    deadline: "",
    completed: false,
    color: colorMap.blue,
  });
  const [customColor, setCustomColor] = useState("#3b82f6");

  useEffect(() => {
    if (todo && mode === "edit") {
      setFormData({
        title: todo.title,
        description: todo.description,
        deadline: todo.deadline || "",
        completed: todo.completed,
        color: todo.color.startsWith("#") ? "custom" : todo.color,
      });
      setCustomColor(todo.color.startsWith("#") ? todo.color : "#3b82f6");
    }
  }, [todo, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      setError("Please fill in all required fields");
      return;
    }
    if (formData.title.length > 28) {
      setError("Maximum title length is 28 characters");
      return;
    }
    onSubmit({
      ...formData,
      title: replaceTextEmojis(formData.title),
      description: replaceTextEmojis(formData.description),
      color: formData.color === "custom" ? customColor : formData.color,
    });
    setOpen(false);
    setError("");
    if (mode === "create") {
      setFormData({
        title: "",
        description: "",
        deadline: "",
        completed: false,
        color: colorMap.blue,
      });
      setCustomColor("#3b82f6");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "create" ? (
          <Button
            variant="default"
            className="w-full text-white bg-gradient-to-r from-purple-500 to-pink-500"
          >
            <Plus className="mr-1 h-5 w-5 text-white" /> New Note
          </Button>
        ) : (
          <Button variant="ghost" size="icon" className="hover:bg-white/20">
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Todo" : "Edit Todo"}
          </DialogTitle>
        </DialogHeader>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline (Optional)</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, deadline: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(colorMap) as TodoColor[]).map((color) => (
                <Button
                  key={color}
                  type="button"
                  className={`${
                    color === "custom"
                      ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
                      : colorMap[color]
                  } h-6 w-6 rounded-full p-0 ${
                    formData.color ===
                    (color === "custom" ? "custom" : colorMap[color])
                      ? "ring-2 ring-offset-2 dark:ring-offset-gray-900"
                      : ""
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      color: color === "custom" ? "custom" : colorMap[color],
                    }))
                  }
                />
              ))}
            </div>
          </div>
          {formData.color === "custom" && (
            <div className="flex items-center space-x-2">
              <Input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="w-12 h-12 p-1"
              />
              <span>Custom Color</span>
            </div>
          )}
          <Button type="submit" className="w-full">
            {mode === "create" ? "Create Todo" : "Update Todo"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
