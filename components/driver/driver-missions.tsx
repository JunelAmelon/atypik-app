'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search, Filter, Clock, User, AlertTriangle } from 'lucide-react';

export function DriverMissions() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock missions data
  const missions = [
    {
      id: '1',
      status: 'pending',
      time: '08:30',
      child: {
        name: 'Lucas Dubois',
        age: 8,
        needs: ['TDAH', 'Allergie gluten']
      },
      from: {
        name: 'Domicile',
        address: '123 rue des Lilas, Paris'
      },
      to: {
        name: 'École Montessori',
        address: '45 avenue Victor Hugo, Paris'
      }
    },
    {
      id: '2',
      status: 'completed',
      time: '16:30',
      child: {
        name: 'Emma Martin',
        age: 7,
        needs: ['Anxiété']
      },
      from: {
        name: 'École Montessori',
        address: '45 avenue Victor Hugo, Paris'
      },
      to: {
        name: 'Centre de loisirs',
        address: '12 rue des Sports, Paris'
      }
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Missions</h1>
        <p className="text-muted-foreground mt-2">
          Gérez vos missions de transport
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CardTitle>Liste des missions</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-[200px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending">
            <TabsList className="mb-4">
              <TabsTrigger value="pending">À venir</TabsTrigger>
              <TabsTrigger value="completed">Terminées</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {missions
                .filter(m => m.status === 'pending')
                .map(mission => (
                  <div
                    key={mission.id}
                    className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg"
                  >
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary font-medium">
                      {mission.time}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-primary" />
                          <h4 className="font-medium">
                            {mission.child.name} ({mission.child.age} ans)
                          </h4>
                        </div>
                        <Button variant="secondary" size="sm" className="h-7 text-xs bg-primary/10 text-primary hover:bg-primary/20">
                          <AlertTriangle className="h-3 w-3 mr-1 text-primary" />
                          Voir besoins
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {mission.child.needs.map((need, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="text-[10px] h-5 py-0 bg-primary/5 text-primary border-primary/20"
                          >
                            {need}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium">{mission.from.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {mission.from.address}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium">{mission.to.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {mission.to.address}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end mt-3">
                        <Button
                          size="sm"
                          className="text-xs bg-primary hover:bg-primary/90"
                        >
                          Voir détails
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {missions
                .filter(m => m.status === 'completed')
                .map(mission => (
                  <div
                    key={mission.id}
                    className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg opacity-75"
                  >
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary font-medium">
                      {mission.time}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-primary" />
                          <h4 className="font-medium">
                            {mission.child.name} ({mission.child.age} ans)
                          </h4>
                        </div>
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                          Terminée
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {mission.child.needs.map((need, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="text-[10px] h-5 py-0 bg-primary/5 text-primary border-primary/20"
                          >
                            {need}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium">{mission.from.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {mission.from.address}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium">{mission.to.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {mission.to.address}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                        >
                          Voir détails
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}