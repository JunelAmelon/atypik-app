'use client';

import { useState } from 'react';
import { Car, Clock, MapPin, Navigation, User, CheckCircle2, AlertTriangle, Phone, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { AnimatedRoute } from '@/components/ui/animated-route';
import { AnimatedCounter } from '@/components/ui/animated-counter';

export default function DriverMissionCard() {
  // État pour la popup des besoins
  const [showNeeds, setShowNeeds] = useState(false);

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

  // Composant de popup pour afficher les besoins
  const NeedsPopup = () => (
    <AnimatePresence>
      {showNeeds && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowNeeds(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Besoins spécifiques</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-full"
                onClick={() => setShowNeeds(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center space-x-3 mb-3">
                <Avatar className="h-10 w-10 border border-primary/20">
                  <AvatarImage src={mission.child.avatar || undefined} alt={mission.child.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {mission.child.name.split(' ')[0][0]}{mission.child.name.split(' ')[1]?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{mission.child.name.split(' ')[0]} {mission.child.name.split(' ')[1]?.[0]}.</h4>
                  <p className="text-sm text-muted-foreground">{mission.child.age} ans</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h5 className="text-sm font-semibold flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                Besoins à prendre en compte
              </h5>
              
              <div className="space-y-3 mt-2">
                {mission.child.needs.map((need, index) => (
                  <div key={index} className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800/30">
                    <h6 className="font-medium text-amber-800 dark:text-amber-300 mb-1">{need}</h6>
                    <p className="text-sm text-amber-700 dark:text-amber-400">
                      {need === 'TDAH' ? 
                        "Trouble du déficit de l'attention avec hyperactivité. Prévoir des pauses régulières et un environnement calme." : 
                        "Éviter tout contact avec des aliments contenant du gluten. Vérifier les collations."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                className="w-full" 
                onClick={() => setShowNeeds(false)}
              >
                J'ai compris
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

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
            
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap mt-2 sm:mt-0">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs font-medium whitespace-nowrap text-primary dark:text-primary hover:text-primary dark:hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 border-primary/10 dark:border-primary/20 w-full sm:w-auto"
                onClick={handleCallParent}
              >
                <Phone className="h-3.5 w-3.5 mr-1.5 text-primary dark:text-primary" />
                Appeler parent
              </Button>
              <Button 
                size="sm" 
                className="text-xs font-medium whitespace-nowrap bg-primary hover:bg-primary/90 text-white border-0 w-full sm:w-auto"
                onClick={handleOpenNavigation}
              >
                <Navigation className="h-3.5 w-3.5 mr-1.5" />
                Navigation
              </Button>
            </div>
          </div>
          
          <div className="bg-card rounded-xl p-4 sm:p-5 border border-primary/10 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <Avatar className="h-12 w-12 border-2 border-primary shadow-md">
                <AvatarImage src={mission.child.avatar || undefined} alt={mission.child.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
                  {mission.child.name[0]}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h4 className="font-semibold text-base">{mission.child.name.split(' ')[0]} {mission.child.name.split(' ')[1]?.[0]}. ({mission.child.age} ans)</h4>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="h-8 text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 border-amber-200 dark:border-amber-800/30 shadow-sm w-full sm:w-auto"
                    onClick={() => setShowNeeds(true)}
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
                <div className="space-y-6 flex-1">
                  <div className="mt-4">
                    <AnimatedRoute
                      fromName={mission.from.name}
                      fromAddress={mission.from.address}
                      toName={mission.to.name}
                      toAddress={mission.to.address}
                      progress={mission.progress}
                      fromStatus={
                        <span className="flex items-center">
                          <CheckCircle2 className="h-3 w-3 mr-1 text-green-600 dark:text-green-400" />
                          Départ effectué
                        </span>
                      }
                      toStatus={
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-gray-700 dark:text-gray-300" />
                          Arrivée prévue: {mission.arrivalTime}
                        </span>
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 mt-5">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-semibold mb-1">En route vers l'école</h4>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-primary dark:text-primary" />
                    <span className="font-medium text-primary dark:text-primary">{mission.timeEstimate}</span> restant · {mission.distance}
                  </p>
                </div>
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="bg-primary/5 dark:bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 dark:border-primary/30 shadow-sm"
                >
                  <p className="text-sm font-bold text-primary dark:text-primary">
                    <AnimatedCounter 
                      value={mission.progress} 
                      duration={2} 
                      suffix="%" 
                    />
                  </p>
                </motion.div>
              </div>
              
              <div className="relative h-2.5 bg-primary/10 dark:bg-primary/20 rounded-full overflow-hidden shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${mission.progress}%` }}
                  transition={{ duration: 1.8, delay: 0.3, ease: "easeOut" }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                ></motion.div>
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
                  className="shadow-sm w-full sm:w-auto mt-2 sm:mt-0"
                >
                  <Button 
                    size="sm" 
                    className="text-xs font-medium whitespace-nowrap bg-primary hover:bg-primary/90 text-white w-full sm:w-auto"
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
      
      {/* Popup des besoins */}
      <NeedsPopup />
    </Card>
  );
}

export { DriverMissionCard }
