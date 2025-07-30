import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { DatabaseService, Announcement, ScheduleEvent } from '@/lib/database';
import { Calendar, Clock, MapPin, Users, Bell, ChevronLeft, ChevronRight, MessageSquare, X, ExternalLink, Eye } from 'lucide-react';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [scheduleEvents, setScheduleEvents] = useState<ScheduleEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

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
                          <div 
                            key={announcement.id} 
                            className="border-l-4 border-yellow-500 pl-4 cursor-pointer hover:bg-gray-50 p-3 rounded-r-lg transition-colors group"
                            onClick={() => {
                              setSelectedAnnouncement(announcement);
                              setShowAnnouncementModal(true);
                            }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 text-sm">{announcement.title}</h4>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                                  announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  announcement.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {announcement.priority}
                                </span>
                                <Eye className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{announcement.message}</p>
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

              {/* Event Detail Modal */}
              {showEventModal && selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-gray-900">{selectedEvent.title}</h3>
                        <button
                          onClick={() => {
                            setShowEventModal(false);
                            setSelectedEvent(null);
                          }}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-6">
                      {/* Event Type Badge */}
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedEvent.type === 'meeting' ? 'bg-yellow-100 text-yellow-800' :
                          selectedEvent.type === 'training' ? 'bg-blue-100 text-blue-800' :
                          selectedEvent.type === 'call' ? 'bg-green-100 text-green-800' :
                          selectedEvent.type === 'bom' ? 'bg-purple-100 text-purple-800' :
                          selectedEvent.type === 'hierarchy' ? 'bg-indigo-100 text-indigo-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
                        </span>
                      </div>

                      {/* Event Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <Calendar className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-700">Schedule</p>
                              <p className="text-gray-600">{selectedEvent.dayOfWeek}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <Clock className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-700">Time</p>
                              <p className="text-gray-600">{selectedEvent.time}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <MapPin className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-700">Location</p>
                              <p className="text-gray-600">{selectedEvent.location}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      {selectedEvent.description && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                          <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{selectedEvent.description}</p>
                        </div>
                      )}

                      {/* Zoom Link */}
                      {selectedEvent.zoomLink && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-blue-900">Virtual Meeting</h4>
                              <p className="text-sm text-blue-700">Join the meeting using the link below</p>
                            </div>
                            <a
                              href={selectedEvent.zoomLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                            >
                              <span>Join Meeting</span>
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Announcement Detail Modal */}
              {showAnnouncementModal && selectedAnnouncement && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-semibold text-gray-900">{selectedAnnouncement.title}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            selectedAnnouncement.priority === 'high' ? 'bg-red-100 text-red-800' :
                            selectedAnnouncement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            selectedAnnouncement.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {selectedAnnouncement.priority}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setShowAnnouncementModal(false);
                            setSelectedAnnouncement(null);
                          }}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-6">
                      {/* Author Info */}
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                          <span className="text-black font-medium text-sm">
                            {selectedAnnouncement.author_name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{selectedAnnouncement.author_name}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(selectedAnnouncement.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Message</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedAnnouncement.message}</p>
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Target Audience</h4>
                          <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {selectedAnnouncement.target_audience === 'all' ? 'All Members' : 
                             selectedAnnouncement.target_audience.charAt(0).toUpperCase() + selectedAnnouncement.target_audience.slice(1)}
                          </span>
                        </div>
                        
                        {selectedAnnouncement.expires_at && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Expires</h4>
                            <p className="text-gray-600">
                              {new Date(selectedAnnouncement.expires_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CalendarPage;