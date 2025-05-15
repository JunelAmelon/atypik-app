'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Clock, MapPin, User, AlertTriangle, CheckCircle2, Navigation, Phone, Car } from 'lucide-react';

// Mock upcoming missions data
const upcomingMissions = [
  {
    id: '1',
    time: '10:30',
    child: {
      name: 'Emma Martin',
      age: 7,
      avatar: null,
      needs: ['Anxiété']
    },
    from: {
      name: 'École Montessori Étoile',
      address: '45 avenue Victor Hugo, Paris'
    },
    to: {
      name: 'Centre de loisirs',
      address: '12 rue des Sports, Paris'
    }
  },
  {
    id: '2',
    time: '15:45',
    child: {
      name: 'Lucas Dubois',
      age: 8,
      avatar: null,
      needs: ['TDAH', 'Allergie gluten']
    },
    from: {
      name: 'École Montessori Étoile',
      address: '45 avenue Victor Hugo, Paris'
    },
    to: {
      name: 'Domicile',
      address: '123 rue des Lilas, Paris'
    }
  },
  {
    id: '3',
    time: '17:00',
    child: {
      name: 'Léa Dubois',
      age: 6,
      avatar: null,
      needs: ['Anxiété']
    },
    from: {
      name: 'Centre de loisirs',
      address: '12 rue des Sports, Paris'
    },
    to: {
      name: 'Domicile',
      address: '123 rue des Lilas, Paris'
    }
  }
];

export function DriverUpcomingMissions() {
  return (
    <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-primary/5 dark:from-gray-800 dark:to-gray-700/80 rounded-xl border-t-4 border-t-primary">
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/20">
              <Clock className="h-5 w-5 text-primary dark:text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg whitespace-nowrap">Missions à venir</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary dark:text-primary" /> 
                Aujourd&apos;hui · {upcomingMissions.length} missions planifiées
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs font-medium whitespace-nowrap text-primary dark:text-primary hover:text-primary dark:hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 border-primary/10 dark:border-primary/20"
          >
            <Clock className="h-3.5 w-3.5 mr-1.5 text-primary" />
            Planning complet
          </Button>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-4">
          {upcomingMissions.map((mission, index) => {
            return (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-5 border border-primary/10 shadow-md"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-12 w-12 border-2 border-primary shadow-md">
                    <AvatarImage src={mission.child.avatar || undefined} alt={mission.child.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
                      {mission.child.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-base">{mission.child.name} ({mission.child.age} ans)</h4>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="h-8 text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 border-amber-200 dark:border-amber-800/30 shadow-sm"
                      >
                        <AlertTriangle className="h-3.5 w-3.5 mr-1.5 text-amber-500 dark:text-amber-400" />
                        Voir besoins
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {mission.child.needs.map((need, i) => (
                        <Badge 
                          key={i} 
                          variant="outline" 
                          className="text-[10px] h-5 py-0 px-2 bg-primary/5 text-primary border-primary/20 font-medium shadow-sm"
                        >
                          {need}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6 mt-2">
                  <div className="flex items-start">
                    <div className="flex flex-col items-center mr-3">
                      <div className="h-6 w-6 rounded-full border-2 border-green-500 bg-green-100 dark:bg-green-900/30 flex items-center justify-center shadow-sm">
                        <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="w-0.5 h-10 bg-gradient-to-b from-green-500 to-primary"></div>
                      <div className="h-6 w-6 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center shadow-sm">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-6 flex-1">
                      <div className="p-2.5 rounded-lg border border-primary/200 dark:border-primary/800/30">
                        <p className="text-sm font-medium flex items-center gap-2 text-black dark:text-white">
                          <MapPin className="h-4 w-4 text-primary dark:text-primary" />
                          {mission.from.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{mission.from.address}</p>
                        <div className="flex justify-end">
                          <p className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center mt-1">
                            <CheckCircle2 className="h-3 w-3 mr-1 text-green-600 dark:text-green-400" />
                            Départ effectué
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-2.5 rounded-lg border border-primary/200 dark:border-primary/800/30">
                        <p className="text-sm font-medium flex items-center gap-2 text-black dark:text-white">
                          <MapPin className="h-4 w-4 text-primary dark:text-primary" />
                          {mission.to.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{mission.to.address}</p>
                        <div className="flex justify-end">
                          <p className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1 text-gray-700 dark:text-gray-300" />
                            Arrivée prévue: 08:30
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 mt-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Prochain trajet à {mission.time}</h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Clock className="h-3 w-3 text-primary dark:text-primary" />
                        <span className="font-medium text-primary dark:text-primary">15 min</span> restant · 5.2 km
                      </p>
                    </div>
                    <div className="bg-primary/5 dark:bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 dark:border-primary/30 shadow-sm">
                      <p className="text-sm font-bold text-primary dark:text-primary">68%</p>
                    </div>
                  </div>
                  
                  <div className="relative h-2.5 bg-primary/10 dark:bg-primary/20 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/80 rounded-full progress-bar"
                      data-progress={68}
                    ></div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="shadow-sm"
                    >
                      <Button 
                        size="sm" 
                        className="text-xs font-medium whitespace-nowrap bg-primary hover:bg-primary/90 text-white"
                      >
                        <MapPin className="h-3.5 w-3.5 mr-1.5" />
                        Voir détails
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}