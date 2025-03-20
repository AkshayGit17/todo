import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { TrashIcon } from "@heroicons/react/24/outline";

import { auth, db } from "../../../../firebaseConfig";
import { Todo } from "../../../../types/todo";
import TodoText from "../TodoText/TodoText";
import { deleteTodo, toggleTodo } from "../../../../services/todo";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setError('User not authenticated!!');
      return;
    }
    const todosCollection = collection(db, 'users', currentUser.uid, 'todos');
    const unsubscribe = onSnapshot(todosCollection, (snapshot) => {
      const fetchedTodos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Todo));
      setLoading(false);
      setTodos(fetchedTodos);
    }, err => {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch todos.');
      }
      setTodos([]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-lg font-semibold text-red-500">Error: {error}</p>
      </div>
    );
  }


  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <ul className="scrollbar max-h-[24rem] overflow-scroll">
      {[...activeTodos, ...completedTodos].map((todo) => (
        <li
          key={todo.id}
          className="flex justify-between items-center p-4 mt-2 bg-white border border-gray-300 rounded-lg shadow-sm"
        >
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id, !todo.completed)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            {todo.completed ? (
              <span className="line-through text-gray-500">{todo.text}</span>
            ) : (
              <TodoText todo={todo} />
            )}
          </div>
          <TrashIcon
            onClick={() => deleteTodo(todo.id)}
            className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-700"
          />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
