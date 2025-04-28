import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Task, Event } from '../../types';
import CalendarDay from './CalendarDay';
import { getMonthData, getMonthName } from '../../utils/dateUtils';

interface CalendarViewProps {
  tasks: Task[];
  events: Event[];
  onTaskClick: (task: Task) => void;
  onEventClick: (event: Event) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ 
  tasks, 
  events, 
  onTaskClick, 
  onEventClick 
}) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  const monthData = getMonthData(currentDate);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">
          {getMonthName(currentDate)} {currentDate.getFullYear()}
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={handleToday}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Today
          </button>
          <button 
            onClick={handlePrevMonth}
            className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={handleNextMonth}
            className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7">
        {/* Calendar header with day names */}
        {dayNames.map((day, index) => (
          <div 
            key={index} 
            className="py-2 text-center text-sm font-medium text-gray-500 border-b"
          >
            {day}
          </div>
        ))}
        
        {/* Calendar grid */}
        {monthData.map((week, weekIndex) => (
          React.Children.toArray(
            week.map((day, dayIndex) => {
              // Filter tasks and events for this day
              const dayTasks = tasks.filter(task => 
                new Date(task.dueDate).toDateString() === day.date.toDateString()
              );
              
              const dayEvents = events.filter(event => 
                new Date(event.date).toDateString() === day.date.toDateString()
              );
              
              return (
                <CalendarDay 
                  key={`${weekIndex}-${dayIndex}`}
                  day={day}
                  tasks={dayTasks}
                  events={dayEvents}
                  currentMonth={currentDate.getMonth()}
                  onTaskClick={onTaskClick}
                  onEventClick={onEventClick}
                />
              );
            })
          )
        ))}
      </div>
    </div>
  );
};

export default CalendarView;