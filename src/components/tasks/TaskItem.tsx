import React, { useState } from 'react';
import { Check, Pencil, Trash, X, Calendar } from 'lucide-react';
import { Task } from '../../types';
import { formatDate } from '../../utils/dateUtils';

interface TaskItemProps {
  task: Task;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const handleToggleComplete = () => {
    onUpdateTask({ ...task, completed: !task.completed });
  };

  const handleEdit = () => {
    setEditedTask(task);
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdateTask(editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg mb-4 border-l-4 border-blue-500">
        <div className="space-y-3">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Task title"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description"
            rows={2}
          />
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={editedTask.dueDate.substring(0, 10)}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                name="priority"
                value={editedTask.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center"
            >
              <X size={16} className="mr-1" /> Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <Check size={16} className="mr-1" /> Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg mb-4 border-l-4 ${
      task.completed ? 'border-green-500' : `border-${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'blue'}-500`
    }`}>
      <div className="flex items-start">
        <button
          onClick={handleToggleComplete}
          className={`mr-3 mt-1 flex-shrink-0 h-5 w-5 rounded-full border ${
            task.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 bg-white'
          } flex items-center justify-center`}
        >
          {task.completed && <Check size={12} />}
        </button>
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className={`text-lg font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={handleEdit}
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>
          {task.description && (
            <p className={`mt-1 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-500'}`}>
              {task.description}
            </p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className={`px-2 py-1 text-xs rounded-full flex items-center ${priorityColors[task.priority]}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 flex items-center">
              <Calendar size={12} className="mr-1" />
              {formatDate(task.dueDate)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;