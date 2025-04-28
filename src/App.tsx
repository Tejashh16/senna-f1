import React, { useState } from 'react';
import { DataProvider, useData } from './contexts/DataContext';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import TasksPage from './pages/TasksPage';
import CalendarPage from './pages/CalendarPage';
import MarksPage from './pages/MarksPage';
import { AppPage } from './types';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppPage>('dashboard');
  const { 
    tasks, 
    events, 
    marks, 
    addTask, 
    updateTask, 
    deleteTask,
    addEvent,
    updateEvent,
    deleteEvent,
    addMark,
    updateMark,
    deleteMark
  } = useData();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard 
            tasks={tasks} 
            events={events} 
            marks={marks} 
            navigateTo={setCurrentPage} 
          />
        );
      case 'tasks':
        return (
          <TasksPage
            tasks={tasks}
            onAddTask={addTask}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        );
      case 'calendar':
        return (
          <CalendarPage
            tasks={tasks}
            events={events}
            onAddEvent={addEvent}
            onUpdateEvent={updateEvent}
            onDeleteEvent={deleteEvent}
          />
        );
      case 'marks':
        return (
          <MarksPage
            marks={marks}
            onAddMark={addMark}
            onUpdateMark={updateMark}
            onDeleteMark={deleteMark}
          />
        );
      default:
        return <Dashboard tasks={tasks} events={events} marks={marks} navigateTo={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 sm:pb-6">
        {renderPage()}
      </main>
    </div>
  );
};

function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}

export default App;