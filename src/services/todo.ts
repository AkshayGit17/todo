import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export const addTodo = async (text: string): Promise<void> => {
  const currentUser = auth.currentUser;
  
  if (!currentUser) {
    throw new Error('User not authenticated!!');
  }

  try {
    const todosCollection = collection(db, 'users', currentUser.uid, 'todos');
    await addDoc(todosCollection, {text, completed: false});
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Failed to add todo.');
    }
  }
};

export const toggleTodo = async (id: string, completed: boolean): Promise<void> => {
  const currentUser = auth.currentUser;
  
  if (!currentUser) {
    throw new Error('User not authenticated!!');
  }

  try {
    const docRef = doc(db, 'users', currentUser.uid, 'todos', id);
    await updateDoc(docRef, { completed });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Failed to toggle todo.');
    }
  }
};

export const deleteTodo = async (id: string): Promise<void> => {
  const currentUser = auth.currentUser;
  
  if (!currentUser) {
    throw new Error('User not authenticated!!');
  }

  try {
    const docRef = doc(db, 'users', currentUser.uid, 'todos', id);
    await deleteDoc(docRef);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Failed to delete todo.');
    }
  }
};

export const updateTodoText = async (id: string, text: string): Promise<void> => {
  const currentUser = auth.currentUser;
  
  if (!currentUser) {
    throw new Error('User not authenticated!!');
  }

  try {
    const docRef = doc(db, 'users', currentUser.uid, 'todos', id);
    await updateDoc(docRef, { text });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Failed to update todo text.');
    }
  }
};