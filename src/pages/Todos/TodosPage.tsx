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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold">Todos</h1>
      </header>
      <section>
        <AddTodo onAdd={addTodo} />
      </section>
      <section>
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
      </section>
    </main>
  );
};

export default Todos;
