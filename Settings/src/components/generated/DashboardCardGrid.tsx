import React from 'react';
import { motion } from 'framer-motion';
import { Flame, CheckCircle, Rocket, Target, Calendar, FileText } from 'lucide-react';
interface DashboardCard {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  gradient: string;
  buttonText: string;
  buttonVariant: 'primary' | 'secondary';
}
const dashboardCards: DashboardCard[] = [{
  id: 'viral',
  title: '3 viral opportunities detected',
  subtitle: 'to review',
  icon: Flame,
  gradient: 'from-green-400 to-emerald-600',
  buttonText: 'Review',
  buttonVariant: 'secondary'
}, {
  id: 'content',
  title: '12 content pieces ready',
  subtitle: 'to publish',
  icon: CheckCircle,
  gradient: 'from-blue-400 to-indigo-600',
  buttonText: 'Generate',
  buttonVariant: 'secondary'
}, {
  id: 'campaign',
  title: 'Campaign performing 340% ROAS',
  subtitle: 'to optimize',
  icon: Rocket,
  gradient: 'from-orange-400 to-red-500',
  buttonText: 'View Details',
  buttonVariant: 'secondary'
}, {
  id: 'analysis',
  title: 'Brand analysis complete',
  subtitle: 'to implement',
  icon: Target,
  gradient: 'from-purple-400 to-indigo-600',
  buttonText: 'Review',
  buttonVariant: 'secondary'
}, {
  id: 'scheduled',
  title: '5 posts scheduled via GHL',
  subtitle: 'to monitor',
  icon: Calendar,
  gradient: 'from-teal-400 to-cyan-600',
  buttonText: 'Review',
  buttonVariant: 'secondary'
}, {
  id: 'blog',
  title: 'Blog publishing active',
  subtitle: 'to manage',
  icon: FileText,
  gradient: 'from-pink-400 to-rose-500',
  buttonText: 'Review',
  buttonVariant: 'secondary'
}];
const DashboardCardGrid: React.FC = () => {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dashboardCards.map((card, index) => {
      const Icon = card.icon;
      return <motion.div key={card.id} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: index * 0.1
      }} whileHover={{
        y: -4,
        transition: {
          duration: 0.2
        }
      }} className="bg-white/20 backdrop-blur-md rounded-3xl shadow-xl border border-white/30 overflow-hidden hover:shadow-2xl hover:bg-white/25 transition-all duration-300 hover:shadow-white/20">
            {/* Card Header with Gradient */}
            <div className={`h-32 bg-gradient-to-br ${card.gradient} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute top-4 right-4">
                <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                  <Icon className="w-6 h-6 text-white drop-shadow-sm" />
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/5 rounded-full" />
            </div>
            
            {/* Card Content */}
            <div className="p-6" style={{
          display: "block"
        }}>
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white mb-1 drop-shadow-sm">
                  {card.title}
                </h3>
                <p className="text-sm text-white/80">
                  {card.subtitle}
                </p>
              </div>
              
              <motion.button whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} className="w-full py-2.5 px-4 rounded-2xl font-medium transition-all duration-200 bg-white/30 backdrop-blur-sm text-white border border-white/40 hover:bg-white/40 hover:border-white/60 shadow-lg">
                {card.buttonText}
              </motion.button>
            </div>
          </motion.div>;
    })}
    </div>;
};
export default DashboardCardGrid;