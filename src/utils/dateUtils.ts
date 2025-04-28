/**
 * Format a date string to a more readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Get the name of the month for a given date
 */
export function getMonthName(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long' });
}

/**
 * Generate calendar data for a month
 */
export function getMonthData(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  // Get the first day of the month
  const firstDay = new Date(year, month, 1);
  const firstDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Get the last day of the month
  const lastDay = new Date(year, month + 1, 0);
  const lastDate = lastDay.getDate();
  
  // Get today's date for highlighting
  const today = new Date();
  
  // Create array for the days
  const days = [];
  
  // Add days from previous month to fill the first week
  const daysFromPrevMonth = firstDayOfWeek;
  const prevMonth = new Date(year, month, 0);
  const prevMonthLastDate = prevMonth.getDate();
  
  for (let i = prevMonthLastDate - daysFromPrevMonth + 1; i <= prevMonthLastDate; i++) {
    days.push({
      date: new Date(year, month - 1, i),
      isCurrentMonth: false,
      isToday: false,
    });
  }
  
  // Add days from current month
  for (let i = 1; i <= lastDate; i++) {
    const date = new Date(year, month, i);
    const isToday = date.getDate() === today.getDate() && 
                    date.getMonth() === today.getMonth() && 
                    date.getFullYear() === today.getFullYear();
    
    days.push({
      date,
      isCurrentMonth: true,
      isToday,
    });
  }
  
  // Add days from next month to complete the last week
  const totalDaysAdded = days.length;
  const daysFromNextMonth = 42 - totalDaysAdded; // 6 weeks × 7 days = 42
  
  for (let i = 1; i <= daysFromNextMonth; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
      isToday: false,
    });
  }
  
  // Group days into weeks
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  
  return weeks;
}