'use client';

import { Car, Clock, MapPin, Navigation, User, CheckCircle2, AlertTriangle, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

export default function DriverMissionCard() {
  // Simulated active mission
  const mission = {
    id: '123',
    status: 'active',
    child: {
      name: 'Lucas Dubois',
      age: 8,
      avatar: null,
      needs: ['TDAH', 'Allergie gluten']
    },
    parent: {
      name: 'Marie Dubois',
      avatar: null,
      phone: '06 12 34 56 78'
    },
    from: {
      name: 'Domicile',
      address: '123 rue des Lilas, Paris',
    },
    to: {
      name: 'École Montessori Étoile',
      address: '45 avenue Victor Hugo, Paris',
    },
    timeEstimate: '15 min',
    distance: '5.2 km',
    progress: 68,
    departureTime: '08:15',
    arrivalTime: '08:30',
  };
  
  // Fonctions pour gérer les actions
  const handleCallParent = () => {
    // Dans une application réelle, cela pourrait ouvrir l'application téléphone
    // ou utiliser une API d'appel
    window.open(`tel:${mission.parent.phone.replace(/\s/g, '')}`, '_blank');
  };
  
  const handleOpenNavigation = () => {
    // Dans une application réelle, cela ouvrirait Google Maps ou une autre app de navigation
    const address = encodeURIComponent(mission.to.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  };
  
  const handleViewMap = () => {
    // Ouvrir une carte avec l'itinéraire
    const origin = encodeURIComponent(mission.from.address);
    const destination = encodeURIComponent(mission.to.address);
    window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`, '_blank');
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-white to-primary/5 dark:from-gray-800 dark:to-gray-700/80 shadow-lg overflow-hidden border-t-4 border-t-primary rounded-xl">
      <CardContent className="pt-6 relative z-10">
        <div className="flex flex-col space-y-5">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-primary/5 dark:bg-primary/10">
                <Car className="h-4 w-4 text-primary dark:text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg whitespace-nowrap">Mission en cours</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-primary dark:text-primary" /> 
                  Départ {mission.departureTime} · Arrivée prévue {mission.arrivalTime}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs font-medium whitespace-nowrap text-primary dark:text-primary hover:text-primary dark:hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 border-primary/10 dark:border-primary/20"
                onClick={handleCallParent}
              >
                <Phone className="h-3.5 w-3.5 mr-1.5 text-primary dark:text-primary" />
                Appeler parent
              </Button>
              <Button 
                size="sm" 
                className="text-xs font-medium whitespace-nowrap bg-primary hover:bg-primary/90 text-white border-0"
                onClick={handleOpenNavigation}
              >
                <Navigation className="h-3.5 w-3.5 mr-1.5" />
                Navigation
              </Button>
            </div>
          </div>
          
          <div className="bg-card rounded-xl p-5 border border-primary/10 shadow-md">
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
                  <div className="h-6 w-6 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center shadow-sm animate-pulse">
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
                        Arrivée prévue: {mission.arrivalTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 mt-5">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-semibold mb-1">En route vers l&apos;école</h4>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-primary dark:text-primary" />
                    <span className="font-medium text-primary dark:text-primary">{mission.timeEstimate}</span> restant · {mission.distance}
                  </p>
                </div>
                <div className="bg-primary/5 dark:bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 dark:border-primary/30 shadow-sm">
                  <p className="text-sm font-bold text-primary dark:text-primary">{mission.progress}%</p>
                </div>
              </div>
              
              <div className="relative h-2.5 bg-primary/10 dark:bg-primary/20 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/80 rounded-full progress-bar"
                  data-progress={mission.progress}
                ></div>
              </div>
              
              <div className="flex flex-wrap justify-between items-center gap-4 mt-5 pt-4 border-t border-dashed border-primary/20 dark:border-primary/30">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 border border-primary/20 dark:border-primary/30 shadow-sm">
                    <AvatarImage src={mission.parent.avatar || undefined} alt={mission.parent.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 text-primary dark:text-primary font-semibold">
                      {mission.parent.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <p className="text-sm font-semibold">{mission.parent.name}</p>
                    <p className="text-xs flex items-center gap-1.5 text-muted-foreground">
                      <Phone className="h-3 w-3 text-primary dark:text-primary" />
                      {mission.parent.phone}
                    </p>
                  </div>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="shadow-sm"
                >
                  <Button 
                    size="sm" 
                    className="text-xs font-medium whitespace-nowrap bg-primary hover:bg-primary/90 text-white"
                    onClick={handleViewMap}
                  >
                    <MapPin className="h-3.5 w-3.5 mr-1.5" />
                    Voir sur la carte
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { DriverMissionCard }
