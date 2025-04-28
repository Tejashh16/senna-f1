import React from 'react';
import { Task, Event } from '../../types';

interface CalendarDayProps {
  day: {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
  };
  tasks: Task[];
  events: Event[];
  currentMonth: number;
  onTaskClick: (task: Task) => void;
  onEventClick: (event: Event) => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ 
  day, 
  tasks, 
  events, 
  currentMonth, 
  onTaskClick, 
  onEventClick 
}) => {
  const { date, isCurrentMonth, isToday } = day;
  const dayNumber = date.getDate();
  
  // Limit items to show
  const maxItemsToShow = 3;
  const totalItems = tasks.length + events.length;
  const tasksToShow = tasks.slice(0, maxItemsToShow - events.length);
  const eventsToShow = events.slice(0, maxItemsToShow - tasksToShow.length);
  const hiddenItems = totalItems - tasksToShow.length - eventsToShow.length;
  
  return (
    <div 
      className={`min-h-[100px] p-1 border-b border-r ${
        !isCurrentMonth 
          ? 'bg-gray-50 text-gray-400' 
          : 'bg-white text-gray-800'
      } ${isToday ? 'bg-blue-50' : ''}`}
    >
      <div className="flex items-center justify-between">
        <span 
          className={`text-sm font-medium ${
            isToday 
              ? 'bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center' 
              : ''
          }`}
        >
          {dayNumber}
        </span>
        
        {isCurrentMonth && (totalItems > 0) && (
          <span className="text-xs text-gray-500">{totalItems} items</span>
        )}
      </div>
      
      <div className="mt-1 space-y-1 overflow-y-auto max-h-[80px]">
        {/* Tasks */}
        {tasksToShow.map(task => (
          <div 
            key={task.id}
            onClick={() => onTaskClick(task)}
            className={`text-xs truncate p-1 rounded ${
              task.priority === 'high' 
                ? 'bg-red-100 text-red-800' 
                : task.priority === 'medium' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-green-100 text-green-800'
            } cursor-pointer hover:opacity-80`}
          >
            {task.title}
          </div>
        ))}
        
        {/* Events */}
        {eventsToShow.map(event => (
          <div 
            key={event.id}
            onClick={() => onEventClick(event)}
            className="text-xs truncate p-1 rounded bg-purple-100 text-purple-800 cursor-pointer hover:opacity-80"
          >
            {event.title}
          </div>
        ))}
        
        {/* More indicator */}
        {hiddenItems > 0 && (
          <div className="text-xs text-gray-500 p-1">
            +{hiddenItems} more...
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarDay;