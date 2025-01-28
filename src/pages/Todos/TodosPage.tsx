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

  const { signOut } = useAuth();

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
      <header className="relative p-4">
        <h1 className="text-3xl font-bold text-center">Todos</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute top-4 right-4"
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
            todos={todos}
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
