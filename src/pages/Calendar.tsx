import { useState } from 'react';
import { Card, Button } from '../components/ui';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  color: string;
}

const mockEvents: Event[] = [
  { id: '1', title: 'Team Meeting', date: '2024-12-15', time: '10:00 AM', color: 'bg-blue-500' },
  { id: '2', title: 'Project Deadline', date: '2024-12-18', time: '5:00 PM', color: 'bg-red-500' },
  { id: '3', title: 'Client Call', date: '2024-12-20', time: '2:00 PM', color: 'bg-green-500' },
  { id: '4', title: 'Code Review', date: '2024-12-22', time: '11:00 AM', color: 'bg-purple-500' },
];

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return mockEvents.filter((event) => event.date === dateStr);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calendar</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your schedule and events</p>
        </div>
        <Button>
          <Plus size={18} className="mr-2" />
          New Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={previousMonth}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    aria-label="Previous month"
                  >
                    <ChevronLeft size={20} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    aria-label="Next month"
                  >
                    <ChevronRight size={20} className="text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {days.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-semibold text-gray-600 dark:text-gray-400 py-2"
                  >
                    {day}
                  </div>
                ))}

                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                  <div key={`empty-${index}`} />
                ))}

                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const events = getEventsForDate(day);
                  const today = isToday(day);

                  return (
                    <div
                      key={day}
                      className={`aspect-square p-2 border rounded-lg ${
                        today
                          ? 'bg-blue-50 dark:bg-blue-900 border-blue-500'
                          : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                      } cursor-pointer transition-colors`}
                    >
                      <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">{day}</div>
                      <div className="space-y-1">
                        {events.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs text-white px-1 py-0.5 rounded truncate ${event.color}`}
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        ))}
                        {events.length > 2 && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            +{events.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                {mockEvents.map((event) => (
                  <div key={event.id} className="flex gap-3">
                    <div className={`w-1 rounded-full ${event.color}`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        {event.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}{' '}
                        at {event.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Events</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockEvents.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mockEvents.filter((e) => {
                      const eventDate = new Date(e.date);
                      return (
                        eventDate.getMonth() === currentDate.getMonth() &&
                        eventDate.getFullYear() === currentDate.getFullYear()
                      );
                    }).length}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
