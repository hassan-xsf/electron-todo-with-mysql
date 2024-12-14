import { ResponseType, Todo } from "./todo";

declare global {
  interface Window {
    electron: {
      createTodo: (todo: Todo) => Promise<ResponseType>;
      deleteTodo: (todoId: number) => Promise<ResponseType>;
      editTodo: (todo: Todo) => Promise<TodosResponseType>;
      toggleTodo: (todo: Todo) => Promise<TodosResponseType>;
      loadTodos: () => Promise<TodosResponseType>;
      healthCheck: (msg: string) => void;
      minimize: () => () => void;
      maximize: () => () => void;
      close: () => () => void;
    };
  }
}

export {};
