import React, { createContext, useContext, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Task, Event, Mark } from '../types';

interface DataContextType {
  tasks: Task[];
  events: Event[];
  marks: Mark[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (id: string) => void;
  addMark: (mark: Omit<Mark, 'id'>) => void;
  updateMark: (mark: Mark) => void;
  deleteMark: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [events, setEvents] = useLocalStorage<Event[]>('events', []);
  const [marks, setMarks] = useLocalStorage<Mark[]>('marks', []);

  // Tasks functions
  const addTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Events functions
  const addEvent = (newEvent: Omit<Event, 'id'>) => {
    const event: Event = {
      ...newEvent,
      id: Date.now().toString(),
    };
    setEvents([...events, event]);
  };

  const updateEvent = (updatedEvent: Event) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  // Marks functions
  const addMark = (newMark: Omit<Mark, 'id'>) => {
    const mark: Mark = {
      ...newMark,
      id: Date.now().toString(),
    };
    setMarks([...marks, mark]);
  };

  const updateMark = (updatedMark: Mark) => {
    setMarks(marks.map(mark => mark.id === updatedMark.id ? updatedMark : mark));
  };

  const deleteMark = (id: string) => {
    setMarks(marks.filter(mark => mark.id !== id));
  };

  const value = {
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
    deleteMark,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};