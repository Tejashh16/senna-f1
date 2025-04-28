import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Event } from '../../types';

interface EventFormProps {
  onAddEvent: (event: Omit<Event, 'id'>) => void;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ onAddEvent, onCancel }) => {
  const [event, setEvent] = useState<Omit<Event, 'id'>>({
    title: '',
    description: '',
    date: new Date().toISOString().substring(0, 10),
    startTime: '09:00',
    endTime: '10:00',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Format the date as ISO
    const formattedEvent = {
      ...event,
      date: new Date(event.date).toISOString(),
    };
    onAddEvent(formattedEvent);
    // Reset form
    setEvent({
      title: '',
      description: '',
      date: new Date().toISOString().substring(0, 10),
      startTime: '09:00',
      endTime: '10:00',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mb-6 border-l-4 border-purple-500">
      <div className="space-y-3">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Event Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={event.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Event title"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={event.description}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Add details about this event..."
          />
        </div>
        
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
          <div className="w-full sm:w-1/2">
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={event.startTime}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="w-full sm:w-1/2">
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={event.endTime}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
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
            className="px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center"
          >
            <Plus size={16} className="mr-1" /> Add Event
          </button>
        </div>
      </div>
    </form>
  );
};

export default EventForm;