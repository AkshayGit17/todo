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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white shadow rounded-md"
    >
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        disabled={isSubmitting}
        placeholder="New Todo"
        className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className={`ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isSubmitting ? "cursor-not-allowed" : "hover:bg-blue-600"
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default AddTodo;
