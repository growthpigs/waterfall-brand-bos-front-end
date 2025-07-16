import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, Users, FileText, Video, Mail, Hash } from 'lucide-react';
import PageLayout from '../shared/PageLayout';
import PageHeader from '../shared/PageHeader';
import { perfectCardShadow, glassCardStyles } from '../../lib/utils';

interface ContentItem {
  id: string;
  title: string;
  type: 'article' | 'video' | 'social' | 'email';
  time: string;
  status: 'scheduled' | 'published' | 'draft';
  platform?: string;
}

interface DayContent {
  [key: number]: ContentItem[];
}

const getContentIcon = (type: ContentItem['type']) => {
  switch (type) {
    case 'article':
      return <FileText className="w-4 h-4" />;
    case 'video':
      return <Video className="w-4 h-4" />;
    case 'social':
      return <Hash className="w-4 h-4" />;
    case 'email':
      return <Mail className="w-4 h-4" />;
  }
};

const getStatusColor = (status: ContentItem['status']) => {
  switch (status) {
    case 'scheduled':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
    case 'published':
      return 'bg-green-500/20 text-green-400 border-green-400/30';
    case 'draft':
      return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
  }
};

const CalendarDay: React.FC<{
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  content: ContentItem[];
  onClick: () => void;
}> = ({ day, isCurrentMonth, isToday, content, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        min-h-[120px] p-3 rounded-xl border cursor-pointer transition-all duration-300
        ${isCurrentMonth ? 'bg-black/15 backdrop-blur-lg border-purple-500/30 hover:bg-black/20 hover:border-orange-500/40' : 'bg-black/5 border-purple-500/10'}
        ${isToday ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-transparent' : ''}
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`text-sm font-medium ${isCurrentMonth ? 'text-white/90' : 'text-white/40'}`}>
          {day}
        </span>
        {content.length > 0 && (
          <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">
            {content.length}
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        {content.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-1 text-xs text-white/70"
          >
            {getContentIcon(item.type)}
            <span className="truncate">{item.title}</span>
          </div>
        ))}
        {content.length > 3 && (
          <span className="text-xs text-white/50">+{content.length - 3} more</span>
        )}
      </div>
    </motion.div>
  );
};

const ContentDetailPanel: React.FC<{
  date: Date;
  content: ContentItem[];
  onClose: () => void;
}> = ({ date, content, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={glassCardStyles + ' p-6 border border-purple-500/30'}
      style={{ boxShadow: perfectCardShadow }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white/95">
          {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </h3>
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white/90 transition-colors"
        >
          ×
        </button>
      </div>

      <div className="space-y-3">
        {content.length > 0 ? (
          content.map((item) => (
            <div
              key={item.id}
              className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-purple-400/20 hover:border-orange-400/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getContentIcon(item.type)}
                  <h4 className="font-medium text-white/90">{item.title}</h4>
                </div>
                <span className={`text-xs px-2 py-1 rounded-lg border ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-white/60">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{item.time}</span>
                </div>
                {item.platform && (
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{item.platform}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-white/60 text-center py-8">No content scheduled for this day</p>
        )}
      </div>

      <button className="mt-6 w-full bg-gradient-to-r from-purple-500 to-orange-500 text-white py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center space-x-2">
        <Plus className="w-5 h-5" />
        <span>Add Content</span>
      </button>
    </motion.div>
  );
};

const ContentCalendarPage: React.FC = () => {
  console.log('[ContentCalendar] rendered successfully');
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);


  // Sample content data
  const contentData: DayContent = {
    5: [
      { id: '1', title: 'AI in Finance Blog Post', type: 'article', time: '10:00 AM', status: 'scheduled' },
      { id: '2', title: 'LinkedIn Authority Update', type: 'social', time: '2:00 PM', status: 'scheduled', platform: 'LinkedIn' }
    ],
    8: [
      { id: '3', title: 'Client Success Story', type: 'video', time: '11:00 AM', status: 'published' },
      { id: '4', title: 'Newsletter: Q4 Insights', type: 'email', time: '3:00 PM', status: 'scheduled' }
    ],
    12: [
      { id: '5', title: 'Authority Building Guide', type: 'article', time: '9:00 AM', status: 'draft' },
      { id: '6', title: 'Twitter Thread: Industry Trends', type: 'social', time: '1:00 PM', status: 'scheduled', platform: 'Twitter' },
      { id: '7', title: 'Case Study Video', type: 'video', time: '4:00 PM', status: 'scheduled' }
    ],
    15: [
      { id: '8', title: 'Monthly Webinar Promo', type: 'email', time: '10:00 AM', status: 'scheduled' }
    ],
    18: [
      { id: '9', title: 'Expert Interview', type: 'video', time: '2:00 PM', status: 'draft' },
      { id: '10', title: 'LinkedIn Pulse Article', type: 'article', time: '5:00 PM', status: 'scheduled', platform: 'LinkedIn' }
    ],
    22: [
      { id: '11', title: 'Year-End Review Post', type: 'article', time: '11:00 AM', status: 'draft' },
      { id: '12', title: 'Thank You Email', type: 'email', time: '3:00 PM', status: 'draft' },
      { id: '13', title: 'Holiday Message', type: 'social', time: '12:00 PM', status: 'scheduled', platform: 'All Platforms' }
    ],
    25: [
      { id: '14', title: 'Christmas Special Content', type: 'video', time: '10:00 AM', status: 'scheduled' }
    ],
    28: [
      { id: '15', title: 'Year in Review', type: 'article', time: '2:00 PM', status: 'draft' },
      { id: '16', title: 'New Year Preview', type: 'email', time: '4:00 PM', status: 'draft' }
    ]
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthLastDay - i)
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i)
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i)
      });
    }

    return days;
  };

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

  const days = getDaysInMonth(currentDate);
  const today = new Date();

  return (
    <PageLayout pageTitle="Content Calendar" placeholder="Ask about content scheduling...">
      {/* Orange gradient background with fire accents */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 -z-10" />
      <div className="fixed inset-0 bg-gradient-to-tr from-red-500/20 via-transparent to-orange-500/10 -z-10" />
          {/* Header - Global Standard */}
          <PageHeader 
            title="Content Calendar"
            subtitle="Plan and schedule your authority-building content across all channels"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar Grid */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={glassCardStyles + ' p-6 border border-purple-500/30'}
                style={{ boxShadow: perfectCardShadow }}
              >
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-white/95">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigateMonth('prev')}
                      className="p-2 bg-black/20 backdrop-blur-sm rounded-lg border border-purple-400/20 hover:border-orange-400/30 transition-all duration-300"
                    >
                      <ChevronLeft className="w-5 h-5 text-white/90" />
                    </button>
                    <button
                      onClick={() => setCurrentDate(new Date())}
                      className="px-4 py-2 bg-black/20 backdrop-blur-sm rounded-lg border border-purple-400/20 hover:border-orange-400/30 transition-all duration-300 text-white/90"
                    >
                      Today
                    </button>
                    <button
                      onClick={() => navigateMonth('next')}
                      className="p-2 bg-black/20 backdrop-blur-sm rounded-lg border border-purple-400/20 hover:border-orange-400/30 transition-all duration-300"
                    >
                      <ChevronRight className="w-5 h-5 text-white/90" />
                    </button>
                  </div>
                </div>

                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-white/75">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {days.map((dayInfo, index) => {
                    const isToday = dayInfo.isCurrentMonth && 
                      dayInfo.date.getDate() === today.getDate() &&
                      dayInfo.date.getMonth() === today.getMonth() &&
                      dayInfo.date.getFullYear() === today.getFullYear();

                    return (
                      <CalendarDay
                        key={index}
                        day={dayInfo.day}
                        isCurrentMonth={dayInfo.isCurrentMonth}
                        isToday={isToday}
                        content={dayInfo.isCurrentMonth ? (contentData[dayInfo.day] || []) : []}
                        onClick={() => setSelectedDate(dayInfo.date)}
                      />
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Detail Panel */}
            <div>
              {selectedDate ? (
                <ContentDetailPanel
                  date={selectedDate}
                  content={contentData[selectedDate.getDate()] || []}
                  onClose={() => setSelectedDate(null)}
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className={glassCardStyles + ' p-6 border border-purple-500/30'}
                  style={{ boxShadow: perfectCardShadow }}
                >
                  <h3 className="text-xl font-semibold text-white/95 mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-purple-400/20">
                      <div className="text-2xl font-bold text-white/95">28</div>
                      <p className="text-sm text-white/75">Total content pieces this month</p>
                    </div>
                    <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-purple-400/20">
                      <div className="text-2xl font-bold text-white/95">12</div>
                      <p className="text-sm text-white/75">Published content</p>
                    </div>
                    <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-purple-400/20">
                      <div className="text-2xl font-bold text-white/95">85%</div>
                      <p className="text-sm text-white/75">Publishing on schedule</p>
                    </div>
                  </div>
                  
                  <button className="mt-6 w-full bg-gradient-to-r from-purple-500 to-orange-500 text-white py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Create Content</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
    </PageLayout>
  );
};

export default ContentCalendarPage;