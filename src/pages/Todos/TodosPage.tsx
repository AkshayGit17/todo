import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import useTodo from "../../hooks/useTodo";

const Todos = () => {
  const {
    todos,
    loading,
    error,
    addTodo,
    deleteTodo,
    toggleTodo,
    updateTodoText,
  } = useTodo();

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>
      <AddTodo onAdd={addTodo} />
      <TodoList
        todos={activeTodos}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
        onUpdate={updateTodoText}
      />
      <TodoList
        todos={completedTodos}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
        onUpdate={updateTodoText}
      />
    </div>
  );
};

export default Todos;
