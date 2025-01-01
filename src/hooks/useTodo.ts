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
        setLoading(false);
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
      await addDoc(userTodoCollection, newTodo);
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
    } catch (error) {
      setError("Failed to toggle todo");
    }
  };

  const updateTodoText = async (id: string, text: string) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      setError("User not authenticated");
      return;
    }

    const docRef = doc(db, "users", currentUser.uid, "todos", id);

    try {
      await updateDoc(docRef, { text });
    } catch (error) {
      setError("Failed to update todo text");
    }
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    deleteTodo,
    toggleTodo,
    updateTodoText,
  };
};

export default useTodo;
