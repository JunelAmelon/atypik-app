'use client';

import { Car, Clock, MapPin, Navigation, User, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

export function ParentUpcomingTrip() {
  // Simulated active trip
  const trip = {
    id: '123',
    status: 'active',
    child: {
      name: 'Lucas',
      avatar: null,
    },
    driver: {
      name: 'Thomas Bernard',
      avatar: null,
      rating: 4.9,
      car: 'Renault Espace Gris',
      plate: 'AB-123-CD',
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
    <Card className="border-2 border-primary/20 bg-secondary/50">
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Car className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Transport en cours</h3>
                <p className="text-sm text-muted-foreground">
                  <Clock className="inline-block h-3 w-3 mr-1" /> 
                  Départ {trip.departureTime} · Arrivée prévue {trip.arrivalTime}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="text-xs">
                <Navigation className="h-3 w-3 mr-1" />
                Voir sur la carte
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                Contacter
              </Button>
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Avatar className="h-10 w-10 border-2 border-primary">
                <AvatarImage src={trip.child.avatar || undefined} alt={trip.child.name} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {trip.child.name[0]}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h4 className="font-medium">{trip.child.name}</h4>
                <p className="text-sm text-muted-foreground">Route vers l&apos;école</p>
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
                    <p className="text-sm font-medium">{trip.from.name}</p>
                    <p className="text-xs text-muted-foreground">{trip.from.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{trip.to.name}</p>
                    <p className="text-xs text-muted-foreground">{trip.to.address}</p>
                  </div>
                </div>
                
                <div className="text-right space-y-3">
                  <div>
                    <p className="text-xs font-medium text-green-600">
                      <CheckCircle2 className="h-3 w-3 inline-block mr-1" />
                      Départ confirmé
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium">{trip.arrivalTime}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>En route</span>
                <span className="font-medium">
                  {trip.timeEstimate} restant ({trip.distance})
                </span>
              </div>
              <Progress value={trip.progress} className="h-2" />
              
              <div className="flex justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={trip.driver.avatar || undefined} alt={trip.driver.name} />
                    <AvatarFallback className="bg-accent/10 text-accent">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <p className="text-sm font-medium">{trip.driver.name}</p>
                    <p className="text-xs flex items-center text-muted-foreground">
                      {trip.driver.car} · {trip.driver.plate}
                    </p>
                  </div>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="sm" className="text-xs">
                    <MapPin className="h-3 w-3 mr-1" />
                    Suivi en direct
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