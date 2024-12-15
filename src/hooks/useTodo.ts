import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { Todo } from "../types/todo";
import { collection, onSnapshot } from "firebase/firestore";

const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setTodos([]);
      setLoading(false);
      return;
    }
    const userTodoCollection = collection(
      db,
      "users",
      currentUser.uid,
      "todos"
    );

    const unsubscribe = onSnapshot(
      userTodoCollection,
      (snapshot) => {
        const fetchedTodos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Todo, "id">),
        }));
        setTodos(fetchedTodos);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { todos, loading, error };
};

export default useTodo;
