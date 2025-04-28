import React, { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import TaskForm from '../components/tasks/TaskForm';
import TaskItem from '../components/tasks/TaskItem';
import { Task } from '../types';

interface TasksPageProps {
  tasks: Task[];
  onAddTask: (task: Omit<Task, 'id'>) => void;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

type FilterOption = 'all' | 'active' | 'completed';
type SortOption = 'date' | 'priority';

const TasksPage: React.FC<TasksPageProps> = ({ 
  tasks, 
  onAddTask, 
  onUpdateTask, 
  onDeleteTask 
}) => {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<FilterOption>('all');
  const [sort, setSort] = useState<SortOption>('date');

  // Filter and sort tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === 'date') {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else {
      // Sort by priority: high -> medium -> low
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
  });

  const handleAddTask = (task: Omit<Task, 'id'>) => {
    onAddTask(task);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Your Tasks</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center transition-colors"
        >
          <Plus size={18} className="mr-1" />
          Add New Task
        </button>
      </div>

      {showForm && (
        <TaskForm onAddTask={handleAddTask} onCancel={() => setShowForm(false)} />
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-wrap items-center justify-between p-4 border-b gap-3">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-sm rounded-md ${
                filter === 'all'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-3 py-1 text-sm rounded-md ${
                filter === 'active'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 text-sm rounded-md ${
                filter === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Due Date</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>

        <div className="p-4">
          {sortedTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {filter === 'all'
                ? 'No tasks yet. Add your first task to get started!'
                : filter === 'active'
                ? 'No active tasks. Great job!'
                : 'No completed tasks yet.'}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onUpdateTask={onUpdateTask}
                  onDeleteTask={onDeleteTask}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;