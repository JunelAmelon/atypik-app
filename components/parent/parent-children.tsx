'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Plus, User, AlertTriangle, Pencil } from 'lucide-react';
import { motion } from 'framer-motion';
import { AddChildDialog } from './add-child-dialog';
import { useToast } from '@/hooks/use-toast';

export function ParentChildren() {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Mock children data - initial state
  const [children, setChildren] = useState([
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
  ]);
  
  // Fonction pour ajouter un nouvel enfant
  const handleAddChild = (data: any) => {
    const newChild = {
      id: `${Date.now()}`, // ID unique basé sur le timestamp
      name: `${data.firstName} ${data.lastName}`,
      age: parseInt(data.age),
      school: data.school,
      avatar: null,
      needs: data.specialNeeds ? data.specialNeeds.split(',').map((need: string) => need.trim()) : []
    };
    
    setChildren([...children, newChild]);
    
    toast({
      title: 'Enfant ajouté',
      description: `${newChild.name} a été ajouté avec succès`,
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8 px-2 sm:px-4 md:px-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Mes enfants</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
          Gérez les profils de vos enfants
        </p>
      </div>
      
      <div className="flex justify-end">
        <Button 
          className="bg-primary hover:bg-primary/90 h-9 sm:h-10 text-xs sm:text-sm w-full sm:w-auto max-w-[200px]"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
          Ajouter un enfant
        </Button>
      </div>
      
      {/* Dialog pour ajouter un enfant */}
      <AddChildDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen}
        onAddChild={handleAddChild}
      />

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {children.map((child) => (
          <motion.div
            key={child.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden">
              <div className="relative h-32 sm:h-40 bg-gradient-to-r from-primary/20 to-primary/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <User className="h-16 w-16 sm:h-20 sm:w-20 text-primary/40" />
                </div>
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 bg-background/80 hover:bg-background/90">
                    <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-row items-start gap-3 sm:gap-4">
                  <Avatar className="h-14 w-14 sm:h-16 sm:w-16 border-2 border-primary">
                    <AvatarImage src={child.avatar || undefined} alt={child.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg sm:text-xl">
                      {child.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 w-full">
                    <div className="flex flex-row items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold">{child.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {child.age} ans • {child.school}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs h-7 sm:h-8 w-auto">
                        Modifier
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3">
                      {child.needs.map((need, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-[10px] sm:text-xs py-0 h-5 bg-primary/5 text-primary border-primary/20"
                        >
                          {need}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-4">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="text-[10px] sm:text-xs h-7 sm:h-8 bg-primary/10 text-primary hover:bg-primary/20"
                      >
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        <span className="hidden xs:inline">Besoins spécifiques</span>
                        <span className="xs:hidden">Besoins</span>
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="text-[10px] sm:text-xs h-7 sm:h-8 bg-primary/10 text-primary hover:bg-primary/20"
                      >
                        <User className="h-3 w-3 mr-1" />
                        <span className="hidden xs:inline">Chauffeurs attitrés</span>
                        <span className="xs:hidden">Chauffeurs</span>
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