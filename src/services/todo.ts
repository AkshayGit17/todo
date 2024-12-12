import { auth, db } from "../firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Todo } from "../types/todo";

export const fetchTodos = async (): Promise<Todo[]> => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const todosCollection = collection(db, `users/${user.uid}/todos`);
  const snapshot = await getDocs(todosCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Todo));
};

export const addTodo = async (text: string): Promise<void> => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const todosCollection = collection(db, `users/${user.uid}/todos`);
  await addDoc(todosCollection, { text, completed: false });
};
