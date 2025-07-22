import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { DatabaseService, Announcement, ScheduleEvent } from '@/lib/database';
import { Calendar, Clock, MapPin, Users, Bell, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [scheduleEvents, setScheduleEvents] = useState<ScheduleEvent[]>([]);

  // Load announcements and schedule events
  React.useEffect(() => {
    const loadData = async () => {
      const announcementsList = await DatabaseService.getAnnouncements();
      setAnnouncements(announcementsList);
      
      const scheduleList = await DatabaseService.getScheduleEvents();
      setScheduleEvents(scheduleList);
    };
    
    loadData();
  }, []);

  // Convert schedule events to display format
  const events = scheduleEvents.map(event => ({
    id: event.id,
    title: event.title,
    date: new Date().toISOString().split('T')[0], // Today's date for demo
    time: `${event.start_time}${event.end_time ? ` - ${event.end_time}` : ''} ${event.timezone}`,
    location: event.zoom_link ? 'Virtual Meeting' : 'TBD',
    type: event.event_type,
    attendees: Math.floor(Math.random() * 20) + 5 // Random for demo
  }));

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === currentDate.getMonth() && 
                     new Date().getFullYear() === currentDate.getFullYear();
      
      const hasEvent = events.some(event => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === day && 
               eventDate.getMonth() === currentDate.getMonth() && 
               eventDate.getFullYear() === currentDate.getFullYear();
      });

      days.push(
        <div
          key={day}
          className={`h-12 flex items-center justify-center cursor-pointer rounded-lg transition-colors ${
            isToday 
              ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold' 
              : hasEvent
              ? 'bg-blue-100 text-blue-800 font-medium hover:bg-blue-200'
              : 'hover:bg-gray-100'
          }`}
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <DashboardSidebar />
      
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Calendar & Announcements</h1>
                <p className="mt-2 text-gray-600">Stay updated with your schedule and important announcements.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Calendar */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">
                          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </h2>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => navigateMonth('prev')}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <ChevronLeft className="h-5 w-5 text-gray-600" />
                          </button>
                          <button
                            onClick={() => navigateMonth('next')}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <ChevronRight className="h-5 w-5 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      {/* Calendar Grid */}
                      <div className="grid grid-cols-7 gap-1 mb-4">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                          <div key={day} className="h-12 flex items-center justify-center font-medium text-gray-500">
                            {day}
                          </div>
                        ))}
                        {renderCalendar()}
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Events */}
                  <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
                        <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-colors flex items-center space-x-2">
                          <Plus className="h-4 w-4" />
                          <span>Add Event</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="space-y-4">
                        {events.slice(0, 5).map((event) => (
                          <div key={event.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                            <div className={`p-2 rounded-full ${
                              event.type === 'meeting' ? 'bg-yellow-100' :
                              event.type === 'training' ? 'bg-blue-100' :
                              event.type === 'client' ? 'bg-green-100' :
                              'bg-purple-100'
                            }`}>
                              <Calendar className={`h-5 w-5 ${
                                event.type === 'meeting' ? 'text-yellow-600' :
                                event.type === 'training' ? 'text-blue-600' :
                                event.type === 'client' ? 'text-green-600' :
                                'text-purple-600'
                              }`} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{event.title}</h4>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{event.time}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{event.location}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="h-4 w-4" />
                                  <span>{event.attendees} attendees</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Announcements */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                        <Bell className="h-5 w-5 text-yellow-600" />
                        <span>Announcements</span>
                      </h3>
                    </div>
                    
                    <div className="p-6">
                      <div className="space-y-6">
                        {announcements.map((announcement) => (
                          <div key={announcement.id} className="border-l-4 border-yellow-500 pl-4">
                            <div className="flex items-start justify-between">
                              <h4 className="font-semibold text-gray-900 text-sm">{announcement.title}</h4>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                                announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                announcement.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {announcement.priority}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{announcement.message}</p>
                            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                              <span>By {announcement.author_name}</span>
                              <span>{new Date(announcement.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CalendarPage;