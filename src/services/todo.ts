import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { displayToast } from "../utils";

export const addTodo = async (text: string): Promise<void> => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    displayToast({ message: "User not authenticated!!", type: "error" });
    return;
  }

  try {
    const todosCollection = collection(db, "users", currentUser.uid, "todos");
    await addDoc(todosCollection, { text, completed: false });
    displayToast({ message: "Todo created successfully!", type: "success" });
  } catch (error) {
    let errorMsg = "";
    if (error instanceof Error) {
      errorMsg = error.message;
    } else {
      errorMsg = "Failed to add todo.";
    }
    displayToast({ message: errorMsg, type: "error" });
  }
};

export const toggleTodo = async (
  id: string,
  completed: boolean
): Promise<void> => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    displayToast({ message: "User not authenticated!!", type: "error" });
    return;
  }

  try {
    const docRef = doc(db, "users", currentUser.uid, "todos", id);
    await updateDoc(docRef, { completed });
    displayToast({
      message: completed ? "Todo marked as done!" : "Todo reverted to pending",
      type: "success",
    });
  } catch (error) {
    let errorMsg = "";
    if (error instanceof Error) {
      errorMsg = error.message;
    } else {
      errorMsg = "Failed to toggle todo.";
    }
    displayToast({ message: errorMsg, type: "error" });
  }
};

export const deleteTodo = async (id: string): Promise<void> => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    displayToast({ message: "User not authenticated!!", type: "error" });
    return;
  }

  try {
    const docRef = doc(db, "users", currentUser.uid, "todos", id);
    await deleteDoc(docRef);
    displayToast({ message: "Todo deleted successfully!", type: "success" });
  } catch (error) {
    let errorMsg = "";
    if (error instanceof Error) {
      errorMsg = error.message;
    } else {
      errorMsg = "Failed to delete todo.";
    }
    displayToast({ message: errorMsg, type: "error" });
  }
};

export const updateTodoText = async (
  id: string,
  text: string
): Promise<void> => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    displayToast({ message: "User not authenticated!!", type: "error" });
    return;
  }

  try {
    const docRef = doc(db, "users", currentUser.uid, "todos", id);
    await updateDoc(docRef, { text });
    displayToast({
      message: "Todo text updated successfully!",
      type: "success",
    });
  } catch (error) {
    let errorMsg = "";
    if (error instanceof Error) {
      errorMsg = error.message;
    } else {
      errorMsg = "Failed to update todo text.";
    }
    displayToast({ message: errorMsg, type: "error" });
  }
};
