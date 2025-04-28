import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import MarkForm from '../components/marks/MarkForm';
import MarksList from '../components/marks/MarksList';
import MarksStats from '../components/marks/MarksStats';
import { Mark } from '../types';

interface MarksPageProps {
  marks: Mark[];
  onAddMark: (mark: Omit<Mark, 'id'>) => void;
  onUpdateMark: (mark: Mark) => void;
  onDeleteMark: (id: string) => void;
}

const MarksPage: React.FC<MarksPageProps> = ({
  marks,
  onAddMark,
  onUpdateMark,
  onDeleteMark,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const handleAddMark = (mark: Omit<Mark, 'id'>) => {
    onAddMark(mark);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Academic Marks</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 flex items-center transition-colors"
        >
          <Plus size={18} className="mr-1" />
          Add New Mark
        </button>
      </div>

      {showForm && (
        <MarkForm onAddMark={handleAddMark} onCancel={() => setShowForm(false)} />
      )}

      {/* Toggle between list and stats */}
      <div className="flex justify-center space-x-2 bg-white rounded-lg shadow-sm p-1">
        <button
          onClick={() => setShowStats(false)}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            !showStats 
              ? 'bg-teal-100 text-teal-800'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          List View
        </button>
        <button
          onClick={() => setShowStats(true)}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            showStats 
              ? 'bg-teal-100 text-teal-800'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Statistics
        </button>
      </div>

      {showStats ? (
        <MarksStats marks={marks} />
      ) : (
        <MarksList 
          marks={marks} 
          onDeleteMark={onDeleteMark} 
          onShowStats={() => setShowStats(true)} 
        />
      )}
    </div>
  );
};

export default MarksPage;