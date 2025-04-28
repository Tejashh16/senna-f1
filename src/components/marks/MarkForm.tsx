import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Mark } from '../../types';

interface MarkFormProps {
  onAddMark: (mark: Omit<Mark, 'id'>) => void;
  onCancel: () => void;
}

const MarkForm: React.FC<MarkFormProps> = ({ onAddMark, onCancel }) => {
  const [mark, setMark] = useState<Omit<Mark, 'id'>>({
    subject: '',
    testName: '',
    score: 0,
    maxScore: 100,
    date: new Date().toISOString().substring(0, 10),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMark({ 
      ...mark, 
      [name]: name === 'score' || name === 'maxScore' ? parseFloat(value) : value 
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Format the date as ISO
    const formattedMark = {
      ...mark,
      date: new Date(mark.date).toISOString(),
    };
    onAddMark(formattedMark);
    // Reset form
    setMark({
      subject: '',
      testName: '',
      score: 0,
      maxScore: 100,
      date: new Date().toISOString().substring(0, 10),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mb-6 border-l-4 border-teal-500">
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
          <div className="w-full sm:w-1/2">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={mark.subject}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="e.g., Mathematics"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label htmlFor="testName" className="block text-sm font-medium text-gray-700 mb-1">
              Test Name
            </label>
            <input
              type="text"
              id="testName"
              name="testName"
              value={mark.testName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="e.g., Midterm Exam"
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
          <div className="w-full sm:w-1/3">
            <label htmlFor="score" className="block text-sm font-medium text-gray-700 mb-1">
              Your Score
            </label>
            <input
              type="number"
              id="score"
              name="score"
              value={mark.score}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          
          <div className="w-full sm:w-1/3">
            <label htmlFor="maxScore" className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Score
            </label>
            <input
              type="number"
              id="maxScore"
              name="maxScore"
              value={mark.maxScore}
              onChange={handleChange}
              min="1"
              step="0.01"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          
          <div className="w-full sm:w-1/3">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={mark.date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
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
            className="px-4 py-2 text-sm bg-teal-600 text-white rounded-md hover:bg-teal-700 flex items-center"
          >
            <Plus size={16} className="mr-1" /> Add Mark
          </button>
        </div>
      </div>
    </form>
  );
};

export default MarkForm;