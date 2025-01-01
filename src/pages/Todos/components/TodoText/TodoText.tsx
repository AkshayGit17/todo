import React, { useState } from "react";
import { Todo } from "../../../../types/todo";

interface TodoTextProps {
  todo: Todo;
  onUpdate: (id: string, text: string) => Promise<void>;
}

const TodoText = ({ todo, onUpdate }: TodoTextProps) => {
  const { id, text } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleBlur = () => {
    if (editText.trim() !== "") {
      onUpdate(id, editText);
    } else {
      setEditText(text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setEditText(text);
      setIsEditing(false);
    }
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          autoFocus
          className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      ) : (
        <span onClick={handleTextClick}>{text}</span>
      )}
    </div>
  );
};

export default TodoText;
