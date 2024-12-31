import { TrashIcon } from "@heroicons/react/24/outline";

import { Todo } from "../../../../types/todo";
import TodoText from "../TodoText/TodoText";

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => Promise<void>;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onUpdate: (id: string, text: string) => Promise<void>;
}

const TodoList = ({ todos, onDelete, onToggle, onUpdate }: TodoListProps) => {
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id, !todo.completed)}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-300"
            />
            {todo.completed ? (
              <span className="line-through text-gray-500">{todo.text}</span>
            ) : (
              <TodoText todo={todo} onUpdate={onUpdate} />
            )}
          </div>
          <TrashIcon
            onClick={() => onDelete(todo.id)}
            className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-700"
          />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
