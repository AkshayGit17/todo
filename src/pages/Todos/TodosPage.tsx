import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import useTodo from "../../hooks/useTodo";
import { useAuth } from "../../context/AuthContext";

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

  const { signOut, error: authError } = useAuth();

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

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <>
      <header className="grid grid-cols-3">
        <h1 className="col-span-2 text-3xl font-bold">Todos</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </header>
      <main className="max-w-4xl mx-auto p-6 space-y-8">
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
    </>
  );
};

export default Todos;
