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
  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <ul className="scrollbar max-h-[24rem] overflow-scroll">
      {[...activeTodos, ...completedTodos].map((todo) => (
        <li
          key={todo.id}
          className="flex justify-between items-center p-4 mt-2 bg-white border border-gray-300 rounded-lg shadow-sm"
        >
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id, !todo.completed)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            {todo.completed ? (
              <span className="line-through text-gray-500">{todo.text}</span>
            ) : (
              <TodoText todo={todo} onUpdate={onUpdate} />
            )}
          </div>
          <TrashIcon
            onClick={() => onDelete(todo.id)}
            className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-700"
          />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
