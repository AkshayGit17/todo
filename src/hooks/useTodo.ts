import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { Todo } from "../types/todo";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

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

  const addTodo = async (text: string) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      setError("User not authenticated");
      return;
    }

    const userTodoCollection = collection(
      db,
      "users",
      currentUser.uid,
      "todos"
    );
    const newTodo = { text, completed: false };

    try {
      const docRef = await addDoc(userTodoCollection, newTodo);
      setTodos((todos) => [...todos, { id: docRef.id, ...newTodo }]);
    } catch (error) {
      setError("Failed to add todo");
    }
  };

  const deleteTodo = async (id: string) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      setError("User not authenticated");
      return;
    }

    const docRef = doc(db, "users", currentUser.uid, "todos", id);

    try {
      await deleteDoc(docRef);
      setTodos((todos) => todos.filter((todo) => todo.id !== id));
    } catch (error) {
      setError("Failed to delete todo");
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      setError("User not authenticated");
      return;
    }

    const docRef = doc(db, "users", currentUser.uid, "todos", id);

    try {
      await updateDoc(docRef, { completed });
      setTodos((todos) =>
        todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
      );
    } catch (error) {
      setError("Failed to update todo");
    }
  };

  return { todos, loading, error, addTodo, deleteTodo, toggleTodo };
};

export default useTodo;
