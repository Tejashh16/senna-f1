import React from 'react';
import { Check, Calendar, GraduationCap, ArrowRight } from 'lucide-react';
import { Task, Event, Mark, AppPage } from '../types';
import { formatDate } from '../utils/dateUtils';

interface DashboardProps {
  tasks: Task[];
  events: Event[];
  marks: Mark[];
  navigateTo: (page: AppPage) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ tasks, events, marks, navigateTo }) => {
  // Get upcoming tasks (not completed, sorted by due date)
  const upcomingTasks = [...tasks]
    .filter(task => !task.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);
  
  // Get upcoming events (sorted by date)
  const upcomingEvents = [...events]
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
  
  // Get recent marks (sorted by date, newest first)
  const recentMarks = [...marks]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  
  // Calculate statistics
  const completedTasksCount = tasks.filter(task => task.completed).length;
  const totalTasksCount = tasks.length;
  const completionRate = totalTasksCount > 0 
    ? Math.round((completedTasksCount / totalTasksCount) * 100) 
    : 0;
  
  // Calculate average mark
  const averageMark = marks.length > 0
    ? marks.reduce((sum, mark) => sum + ((mark.score / mark.maxScore) * 100), 0) / marks.length
    : 0;

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Welcome to SennaFloww</h1>
          <p className="mt-2 text-blue-100">Brought to you by Your Personal Academic Management System — because even geniuses need a little help sometimes.</p>
          <p className="mt-1 text-blue-200 text-sm">Built by Tejash</p>
          
          {/* Quick stats */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-white">Tasks Completion</p>
                  <p className="text-2xl font-bold text-white">{completionRate}%</p>
                </div>
                <div className="p-3 bg-white bg-opacity-30 rounded-full">
                  <Check size={20} color="white" />
                </div>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-white">Upcoming Events</p>
                  <p className="text-2xl font-bold text-white">{upcomingEvents.length}</p>
                </div>
                <div className="p-3 bg-white bg-opacity-30 rounded-full">
                  <Calendar size={20} color="white" />
                </div>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-white">Average Score</p>
                  <p className="text-2xl font-bold text-white">{averageMark.toFixed(1)}%</p>
                </div>
                <div className="p-3 bg-white bg-opacity-30 rounded-full">
                  <GraduationCap size={20} color="white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dashboard sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upcoming tasks */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Tasks</h2>
            <button 
              onClick={() => navigateTo('tasks')} 
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              View All <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="p-4">
            {upcomingTasks.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
              Zero tasks detected. Either you’re a genius or a future problem. Add a task to find out!
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingTasks.map(task => (
                  <div 
                    key={task.id} 
                    className={`p-3 rounded-md border-l-4 ${
                      task.priority === 'high' 
                        ? 'border-red-500 bg-red-50' 
                        : task.priority === 'medium' 
                          ? 'border-yellow-500 bg-yellow-50' 
                          : 'border-green-500 bg-green-50'
                    }`}
                  >
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      Due: {formatDate(task.dueDate)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Upcoming events */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
            <button 
              onClick={() => navigateTo('calendar')} 
              className="text-sm text-purple-600 hover:text-purple-800 flex items-center"
            >
              View All <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="p-4">
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                No events found. Your social life and your calendar are both suspiciously quiet... Fix it — add an event!
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="p-3 rounded-md border-l-4 border-purple-500 bg-purple-50">
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {formatDate(event.date)} • {event.startTime} - {event.endTime}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Recent marks */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Recent Marks</h2>
            <button 
              onClick={() => navigateTo('marks')} 
              className="text-sm text-teal-600 hover:text-teal-800 flex items-center"
            >
              View All <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="p-4">
            {recentMarks.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                No marks recorded yet. Add your academic scores.
              </div>
            ) : (
              <div className="space-y-3">
                {recentMarks.map(mark => {
                  const percentage = (mark.score / mark.maxScore) * 100;
                  return (
                    <div key={mark.id} className="p-3 rounded-md border-l-4 border-teal-500 bg-teal-50">
                      <div className="flex justify-between">
                        <div className="font-medium">{mark.subject}</div>
                        <div className={`font-bold ${
                          percentage >= 90 ? 'text-green-600' : 
                          percentage >= 80 ? 'text-blue-600' : 
                          percentage >= 70 ? 'text-yellow-600' : 
                          percentage >= 60 ? 'text-orange-600' : 
                          'text-red-600'
                        }`}>
                          {percentage.toFixed(1)}%
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {mark.testName} • {formatDate(mark.date)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer credit */}
      <div className="text-center text-sm text-gray-500 pt-4">
  <div>SennaFloww – Built with ❤️ by Tejash Kanagaraj</div>
  <div>Hit that follow button 👉 @tejashh.kanagaraj</div>
</div>

    </div>
  );
};

export default Dashboard;
