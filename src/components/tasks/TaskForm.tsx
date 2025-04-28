import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Task } from '../../types';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id'>) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, onCancel }) => {
  const [task, setTask] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    dueDate: new Date().toISOString().substring(0, 10),
    completed: false,
    priority: 'medium',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ensure dueDate is in ISO format
    const formattedTask = {
      ...task,
      dueDate: new Date(task.dueDate).toISOString(),
    };
    onAddTask(formattedTask);
    // Reset form
    setTask({
      title: '',
      description: '',
      dueDate: new Date().toISOString().substring(0, 10),
      completed: false,
      priority: 'medium',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mb-6 border-l-4 border-blue-500">
      <div className="space-y-3">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What needs to be done?"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add details about this task..."
          />
        </div>
        
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
          <div className="w-full sm:w-1/2">
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="w-full sm:w-1/2">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={task.priority}
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
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center"
          >
            <X size={16} className="mr-1" /> Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <Plus size={16} className="mr-1" /> Add Task
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;