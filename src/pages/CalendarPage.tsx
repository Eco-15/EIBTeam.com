import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { DatabaseService, Announcement, ScheduleEvent } from '@/lib/database';
import { Calendar, Clock, MapPin, Users, Bell, Plus, ChevronLeft, ChevronRight, MessageSquare, X, ExternalLink } from 'lucide-react';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [scheduleEvents, setScheduleEvents] = useState<ScheduleEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load announcements and schedule events
  React.useEffect(() => {
    const loadData = async () => {
      try {
        const [announcementsList, scheduleList] = await Promise.all([
          DatabaseService.getAnnouncements(),
          DatabaseService.getScheduleEvents()
        ]);
        
        setAnnouncements(announcementsList);
        setScheduleEvents(scheduleList);
      } catch (error) {
        console.error('Error loading calendar data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Convert schedule events to display format with proper date handling
  const events = scheduleEvents.map(event => {
    // Get the next occurrence of this day of the week
    const today = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const targetDay = dayNames.indexOf(event.day_of_week);
    const currentDay = today.getDay();
    
    let daysUntilEvent = targetDay - currentDay;
    if (daysUntilEvent < 0) {
      daysUntilEvent += 7; // Next week
    }
    
    const eventDate = new Date(today);
    eventDate.setDate(today.getDate() + daysUntilEvent);
    
    return {
      id: event.id,
      title: event.title,
      date: eventDate.toISOString().split('T')[0],
      time: `${event.start_time}${event.end_time ? ` - ${event.end_time}` : ''} ${event.timezone}`,
      location: event.zoom_link ? 'Virtual Meeting' : 'Office',
      type: event.event_type,
      dayOfWeek: event.day_of_week,
      zoomLink: event.zoom_link,
      description: event.description
    };
  });

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
                    <div className="p-6">
                      <div className="space-y-4">
                        {events.length > 0 ? events.slice(0, 5).map((event) => (
                          <div key={event.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className={`p-2 rounded-full ${
                              event.type === 'meeting' ? 'bg-yellow-100' :
                              event.type === 'training' ? 'bg-blue-100' :
                              event.type === 'call' ? 'bg-green-100' :
                              'bg-purple-100'
                            }`}>
                              <Calendar className={`h-5 w-5 ${
                                event.type === 'meeting' ? 'text-yellow-600' :
                                event.type === 'training' ? 'text-blue-600' :
                                event.type === 'call' ? 'text-green-600' :
                                'text-purple-600'
                              }`} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{event.title}</h4>
                              {event.description && (
                                <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                              )}
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{event.dayOfWeek} {event.time}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{event.location}</span>
                                </div>
                                {event.zoomLink && (
                                  <a
                                    href={event.zoomLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 text-xs"
                                  >
                                    Join Meeting
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        )) : (
                          <div className="text-center py-8">
                            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 mb-2">No upcoming events scheduled</p>
                            <p className="text-sm text-gray-400">Events will appear here when admins create them</p>
                          </div>
                        )}
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
                        {announcements.length > 0 ? announcements.map((announcement) => (
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
                        )) : (
                          <div className="text-center py-8">
                            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 mb-2">No announcements yet</p>
                            <p className="text-sm text-gray-400">Announcements will appear here when admins create them</p>
                          </div>
                        )}
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