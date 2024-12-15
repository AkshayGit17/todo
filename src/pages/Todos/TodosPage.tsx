import { useState } from "react";
import { Todo } from "../../types/todo";
import AddTodo from "./components/AddTodo/AddTodo";

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = async (text: string) => {
    const newTodo = { id: new Date().toString(), text, completed: false };
    setTodos((todos) => [...todos, newTodo]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>
      <AddTodo onAdd={addTodo} />
    </div>
  );
};

export default Todos;
