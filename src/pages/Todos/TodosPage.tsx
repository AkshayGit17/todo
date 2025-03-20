import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Todos = () => {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    const data = await signOut();

    toast.info(`${data.success ? 'You have been logged out.' : data.errorMessage}`, {
      position: 'top-right',
      autoClose: 1500,
    });
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
          <AddTodo />
        </section>
        <section>
          <TodoList />
        </section>
      </main>
    </>
  );
};

export default Todos;
