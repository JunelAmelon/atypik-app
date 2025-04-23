'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Clock, MapPin, User, AlertTriangle } from 'lucide-react';

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
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <span>Missions à venir aujourd&apos;hui</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingMissions.map((mission, index) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary/50 p-4 rounded-lg"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary font-medium shrink-0">
                  {mission.time}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <h4 className="font-medium truncate">
                        {mission.child.name}
                      </h4>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        ({mission.child.age} ans)
                      </span>
                    </div>
                    <Button variant="secondary" size="sm" className="h-7 text-xs bg-primary/10 text-primary hover:bg-primary/20 shrink-0">
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
              
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">{mission.from.name}</p>
                    <p className="text-xs text-muted-foreground">{mission.from.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">{mission.to.name}</p>
                    <p className="text-xs text-muted-foreground">{mission.to.address}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-3">
                <Button size="sm" variant="default" className="text-xs bg-primary hover:bg-primary/90">
                  Voir détails
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}