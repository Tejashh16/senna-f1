import React, { useMemo } from 'react';
import { Mark } from '../../types';

interface MarksStatsProps {
  marks: Mark[];
}

const MarksStats: React.FC<MarksStatsProps> = ({ marks }) => {
  // Calculate statistics
  const stats = useMemo(() => {
    // Group marks by subject
    const subjectMap = marks.reduce((acc, mark) => {
      if (!acc[mark.subject]) {
        acc[mark.subject] = [];
      }
      acc[mark.subject].push(mark);
      return acc;
    }, {} as Record<string, Mark[]>);
    
    // Calculate average for each subject
    const subjectStats = Object.entries(subjectMap).map(([subject, subjectMarks]) => {
      const percentages = subjectMarks.map(mark => (mark.score / mark.maxScore) * 100);
      const sum = percentages.reduce((a, b) => a + b, 0);
      const average = sum / percentages.length;
      const highest = Math.max(...percentages);
      const lowest = Math.min(...percentages);
      
      return {
        subject,
        average,
        highest,
        lowest,
        count: subjectMarks.length,
      };
    });
    
    // Sort by average performance
    return subjectStats.sort((a, b) => b.average - a.average);
  }, [marks]);
  
  // Calculate overall average
  const overallAverage = useMemo(() => {
    if (marks.length === 0) return 0;
    
    const percentages = marks.map(mark => (mark.score / mark.maxScore) * 100);
    return percentages.reduce((a, b) => a + b, 0) / percentages.length;
  }, [marks]);
  
  // Find best and worst subjects
  const bestSubject = stats.length > 0 ? stats[0].subject : 'N/A';
  const worstSubject = stats.length > 0 ? stats[stats.length - 1].subject : 'N/A';
  
  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-red-600';
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800">Academic Performance</h3>
        <p className="text-sm text-gray-500 mt-1">Based on {marks.length} recorded marks</p>
      </div>
      
      {marks.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No marks. No glory. No fun. Fix that — add your first mark!.
        </div>
      ) : (
        <>
          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-sm font-medium text-gray-500">Overall Average</p>
              <p className={`text-3xl font-bold ${getGradeColor(overallAverage)}`}>
                {overallAverage.toFixed(1)}%
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-sm font-medium text-gray-500">Best Subject</p>
              <p className="text-xl font-semibold text-green-600">{bestSubject}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-sm font-medium text-gray-500">Needs Improvement</p>
              <p className="text-xl font-semibold text-red-500">{worstSubject}</p>
            </div>
          </div>
          
          {/* Graph visualization */}
          <div className="mt-6">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Performance by Subject</h4>
            <div className="space-y-4">
              {stats.map(({ subject, average, highest, lowest, count }) => (
                <div key={subject} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-gray-800">{subject}</span>
                      <span className="text-sm text-gray-500 ml-2">({count} tests)</span>
                    </div>
                    <span className={`font-bold ${getGradeColor(average)}`}>{average.toFixed(1)}%</span>
                  </div>
                  
                  <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                    {/* Average marker */}
                    <div
                      className="absolute top-0 bottom-0 left-0 bg-blue-500 rounded-l-full"
                      style={{ width: `${average}%` }}
                    ></div>
                    
                    {/* Highest marker */}
                    <div 
                      className="absolute top-0 bottom-0 w-1 bg-green-500" 
                      style={{ left: `${highest}%` }}
                    ></div>
                    
                    {/* Lowest marker */}
                    <div 
                      className="absolute top-0 bottom-0 w-1 bg-red-500" 
                      style={{ left: `${lowest}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500">
                    <div>Lowest: {lowest.toFixed(1)}%</div>
                    <div>Highest: {highest.toFixed(1)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Performance over time - to be implemented */}
          <div className="mt-6">
            <h4 className="text-lg font-medium text-gray-800 mb-2">Recent Trends</h4>
            <p className="text-sm text-gray-500">
              {stats.some(s => s.count > 1) 
                ? stats.filter(s => s.count > 1).length > 0 
                  ? `You're showing improvement in ${stats.filter(s => s.count > 1).length} subjects.`
                  : "Continue taking tests to see your performance trends."
                : "Add more test results to see trends over time."}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default MarksStats;
