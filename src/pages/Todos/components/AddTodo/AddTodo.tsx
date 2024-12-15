import React, { useState } from "react";

const AddTodo = ({ onAdd }: { onAdd: (text: string) => Promise<void> }) => {
  const [todoText, setTodoText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!todoText.trim()) return;

    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(() => res(""), 3000));
      await onAdd(todoText);
      setTodoText("");
    } catch (error) {
      console.log("Error adding todo", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="New Todo"
        className="w-4/5 py-2 px-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      />
      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {isSubmitting ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default AddTodo;
