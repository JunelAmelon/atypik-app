'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Plus, User, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export function ParentChildren() {
  // Mock children data
  const children = [
    {
      id: '1',
      name: 'Lucas Dubois',
      age: 8,
      school: 'École Montessori Étoile',
      avatar: null,
      needs: ['TDAH', 'Allergie gluten']
    },
    {
      id: '2',
      name: 'Léa Dubois',
      age: 6,
      school: 'École Montessori Étoile',
      avatar: null,
      needs: ['Anxiété']
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mes enfants</h1>
          <p className="text-muted-foreground mt-2">
            Gérez les profils et besoins de vos enfants
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un enfant
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {children.map((child) => (
          <motion.div
            key={child.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16 border-2 border-primary">
                    <AvatarImage src={child.avatar || undefined} alt={child.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                      {child.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{child.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {child.age} ans • {child.school}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        Modifier
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {child.needs.map((need, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-primary/5 text-primary border-primary/20"
                        >
                          {need}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
                      >
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Besoins spécifiques
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
                      >
                        <User className="h-3 w-3 mr-1" />
                        Chauffeurs attitrés
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}