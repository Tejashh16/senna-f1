import React, { useState } from 'react';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import CalendarView from '../components/calendar/CalendarView';
import EventForm from '../components/calendar/EventForm';
import { Task, Event } from '../types';

interface CalendarPageProps {
  tasks: Task[];
  events: Event[];
  onAddEvent: (event: Omit<Event, 'id'>) => void;
  onUpdateEvent: (event: Event) => void;
  onDeleteEvent: (id: string) => void;
}

const CalendarPage: React.FC<CalendarPageProps> = ({
  tasks,
  events,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);

  const handleAddEvent = (event: Omit<Event, 'id'>) => {
    onAddEvent(event);
    setShowForm(false);
  };

  const handleTaskClick = (task: Task) => {
    // For future implementation: show task details
    console.log('Task clicked:', task);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const handleCloseEventDetails = () => {
    setShowEventDetails(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      onDeleteEvent(selectedEvent.id);
      handleCloseEventDetails();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center transition-colors"
        >
          <Plus size={18} className="mr-1" />
          Add Event
        </button>
      </div>

      {showForm && (
        <EventForm onAddEvent={handleAddEvent} onCancel={() => setShowForm(false)} />
      )}

      <CalendarView
        tasks={tasks}
        events={events}
        onTaskClick={handleTaskClick}
        onEventClick={handleEventClick}
      />

      {/* Event Details Modal */}
      {showEventDetails && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-gray-800">{selectedEvent.title}</h2>
                <button
                  onClick={handleCloseEventDetails}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="flex items-center text-gray-600">
                  <CalendarIcon size={18} className="mr-2" />
                  <span>
                    {new Date(selectedEvent.date).toLocaleDateString()} • {selectedEvent.startTime} - {selectedEvent.endTime}
                  </span>
                </div>
                
                {selectedEvent.description && (
                  <p className="text-gray-700 mt-2">{selectedEvent.description}</p>
                )}
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={handleDeleteEvent}
                  className="px-3 py-1.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                >
                  Delete
                </button>
                <button
                  onClick={handleCloseEventDetails}
                  className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;