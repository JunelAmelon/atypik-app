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

  return (
    <Card className="border-2 border-primary/20 bg-card">
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Car className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium whitespace-nowrap">Mission en cours</h3>
                <p className="text-sm text-muted-foreground">
                  <Clock className="inline-block h-3 w-3 mr-1" /> 
                  Départ {mission.departureTime} · Arrivée prévue {mission.arrivalTime}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-xs whitespace-nowrap text-primary hover:text-primary hover:bg-primary/10">
                <Phone className="h-3 w-3 mr-1 text-primary" />
                Appeler parent
              </Button>
              <Button size="sm" className="text-xs whitespace-nowrap bg-primary hover:bg-primary/90">
                <Navigation className="h-3 w-3 mr-1" />
                Navigation
              </Button>
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-4 border shadow-sm">
            <div className="flex items-center space-x-3 mb-3">
              <Avatar className="h-10 w-10 border-2 border-primary">
                <AvatarImage src={mission.child.avatar || undefined} alt={mission.child.name} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {mission.child.name[0]}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{mission.child.name} ({mission.child.age} ans)</h4>
                  <Button variant="secondary" size="sm" className="h-7 text-xs bg-primary/10 text-primary hover:bg-primary/20">
                    <AlertTriangle className="h-3 w-3 mr-1 text-primary" />
                    Voir besoins
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {mission.child.needs.map((need, i) => (
                    <Badge key={i} variant="outline" className="text-[10px] h-5 py-0 bg-primary/5 text-primary border-primary/20">
                      {need}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-1 mb-4">
              <div className="flex items-start">
                <div className="flex flex-col items-center mr-2">
                  <div className="h-5 w-5 rounded-full border-2 border-green-500 bg-green-100 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="w-0.5 h-6 bg-muted"></div>
                  <div className="h-5 w-5 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                </div>
                
                <div className="space-y-3 flex-1">
                  <div>
                    <p className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      {mission.from.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{mission.from.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      {mission.to.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{mission.to.address}</p>
                  </div>
                </div>
                
                <div className="text-right space-y-3">
                  <div>
                    <p className="text-xs font-medium text-green-600">
                      <CheckCircle2 className="h-3 w-3 inline-block mr-1" />
                      Fait
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium">{mission.arrivalTime}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>En route vers l&apos;école</span>
                <span className="font-medium">
                  {mission.timeEstimate} restant ({mission.distance})
                </span>
              </div>
              <Progress value={mission.progress} className="h-2" />
              
              <div className="flex flex-wrap justify-between items-center gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={mission.parent.avatar || undefined} alt={mission.parent.name} />
                    <AvatarFallback className="bg-accent/10 text-accent">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <p className="text-sm font-medium">{mission.parent.name}</p>
                    <p className="text-xs text-muted-foreground">{mission.parent.phone}</p>
                  </div>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button size="sm" className="text-xs whitespace-nowrap bg-primary hover:bg-primary/90">
                    <MapPin className="h-3 w-3 mr-1" />
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