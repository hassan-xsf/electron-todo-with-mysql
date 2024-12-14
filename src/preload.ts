// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { Todo } from "./types/todo";

// Expose a method to send the 'create-todo' event to the main process
contextBridge.exposeInMainWorld("electron", {
  createTodo: (todo: Omit<Todo, "id">) =>
    ipcRenderer.invoke("create-todo", todo),
  deleteTodo: (todoId: number) => ipcRenderer.invoke("delete-todo", todoId),
  editTodo: (todo: Todo) => ipcRenderer.invoke("edit-todo", todo),
  toggleTodo: (todo: Todo) => ipcRenderer.invoke("toggle-todo", todo),
  loadTodos: () => ipcRenderer.invoke("load-todos"),
  healthCheck: (msg: string) => ipcRenderer.send("health-check", msg),
  minimize: () => ipcRenderer.send("window-minimize"),
  maximize: () => ipcRenderer.send("window-maximize"),
  close: () => ipcRenderer.send("window-close"),
});
