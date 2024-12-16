import { useState } from "react";
import { Todo } from "../../types/todo";
import AddTodo from "./components/AddTodo/AddTodo";
import useTodo from "../../hooks/useTodo";

const Todos = () => {
  const { todos, loading, error, addTodo, deleteTodo, toggleTodo } = useTodo();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>
      <AddTodo onAdd={addTodo} />
    </div>
  );
};

export default Todos;
