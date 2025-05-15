'use client';

import { 
  Star, 
  Clock, 
  MapPin, 
  User, 
  AlertTriangle, 
  ChevronRight,
  Smile,
  Activity,
  HeartPulse
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth/auth-context';
import { DriverMissionCard } from '@/components/driver/driver-mission-card';
import { DriverUpcomingMissions } from '@/components/driver/driver-upcoming-missions';
import { DriverStatsCard } from '@/components/driver/driver-stats-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function DriverDashboard() {
  const router = useRouter();
  const { user } = useAuth();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120
      }
    }
  };

  // Stats data
  const stats = [
    { 
      label: 'Missions aujourd\'hui', 
      value: '3', 
      icon: <Clock className="h-5 w-5 text-orange-500" />,
      progress: 75,
      trend: 'up'
    },
    { 
      label: 'Km parcourus', 
      value: '27.5', 
      icon: <MapPin className="h-5 w-5 text-orange-500" />,
      progress: 60,
      trend: 'up'
    },
    { 
      label: 'Note moyenne', 
      value: '4.9/5', 
      icon: <Star className="h-5 w-5 text-orange-500" />,
      progress: 98,
      trend: 'stable'
    },
    { 
      label: 'Enfants transportés', 
      value: '5', 
      icon: <User className="h-5 w-5 text-orange-500" />,
      progress: 100,
      trend: 'up'
    },
  ];

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants}>
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-2xl font-bold">Bonjour, {user?.name || 'Chauffeur'} </h1>
          <p className="text-muted-foreground">Voici un aperçu de votre journée de transport</p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full border-0 bg-gradient-to-br from-white to-orange-50/30 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-xl overflow-hidden border-l-4 border-l-orange-500">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.label}</p>
                      <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                    <div className="p-2.5 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shadow-sm">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="mt-auto pt-2">
                    <div className="h-2.5 w-full bg-gray-100 dark:bg-gray-600/50 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className={`h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full progress-bar`}
                        data-progress={stat.progress}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Current Mission */}
      <motion.div variants={itemVariants}>
        <DriverMissionCard />
      </motion.div>

      {/* Upcoming Missions & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <DriverUpcomingMissions />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DriverStatsCard />
        </motion.div>
      </div>

      {/* Child Profile Section */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-orange-50/20 dark:from-gray-800 dark:to-gray-700/80 rounded-xl border-t-4 border-t-orange-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 dark:bg-primary/10 rounded-bl-full -z-0"></div>
          <CardHeader className="pb-0 relative z-10">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3">
                <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xl">
                  LD
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-white">Lucas Dubois</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-orange-500" />
                    École Montessori Étoile
                  </p>
                </div>
              </CardTitle>
              <div className="flex items-center gap-1 text-orange-600 bg-orange-100 px-3 py-1 rounded-full text-sm font-medium">
                <Star className="h-4 w-4 fill-orange-500" />
                4.9
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {/* About Section */}
              <div>
                <div className="flex items-center gap-2 text-orange-600 mb-2">
                  <Smile className="h-4 w-4 text-orange-500" />
                  <h4 className="text-sm font-semibold text-orange-600">À propos</h4>
                </div>
                <p className="text-sm">
                  Lucas est sociable mais a du mal à rester concentré pendant les longs trajets. Passionné de jeux vidéo.
                </p>
              </div>
              
              {/* Special Needs */}
              <div>
                <div className="flex items-center gap-2 text-orange-600 mb-3">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <h4 className="text-sm font-semibold text-orange-600">Besoins spécifiques</h4>
                </div>
                <div className="grid gap-3">
                  <div className="flex items-start gap-3 p-3 bg-red-50/50 rounded-lg border border-red-100">
                    <div className="p-2 bg-red-100 rounded-lg text-red-600">
                      <HeartPulse className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Allergie sévère au gluten</p>
                      <p className="text-xs text-muted-foreground mt-1">EpiPen dans son sac</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50/50 rounded-lg border border-red-100">
                    <div className="p-2 bg-red-100 rounded-lg text-red-600">
                      <Activity className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">TDAH diagnostiqué</p>
                      <p className="text-xs text-muted-foreground mt-1">Activités pour concentration</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Button */}
              <Button 
                variant="ghost" 
                className="w-full mt-2 text-orange-600 hover:bg-orange-100/50 hover:text-orange-700"
                onClick={() => router.push('/driver/children/lucas-dubois')}
              >
                Voir fiche complète <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}