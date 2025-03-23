import React, { useState } from "react";
import { Todo } from "../../../../types/todo";
import { updateTodoText } from "../../../../services/todo";

interface TodoTextProps {
  isEditing: boolean;
  enableEdit: (id: string) => void;
  cancelEdit: (id: string) => void;
  todo: Todo;
}

const TodoText = ({
  isEditing,
  enableEdit,
  cancelEdit,
  todo,
}: TodoTextProps) => {
  const { id, text } = todo;
  const [editText, setEditText] = useState(text);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleBlur = async () => {
    if (editText.trim() !== "") {
      await updateTodoText(id, editText);
    } else {
      setEditText(text);
    }
    cancelEdit(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setEditText(text);
      cancelEdit(id);
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
        <span onClick={() => enableEdit(id)}>{text}</span>
      )}
    </div>
  );
};

export default TodoText;
