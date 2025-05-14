'use client';

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { TransportEventDialog } from './transport-event-dialog';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarPlus, ChevronLeft, ChevronRight, Info, Bus } from 'lucide-react';

// Type pour les événements de transport
type TransportEvent = {
  id: string;
  childId: string;
  childName: string;
  date: Date;
  time: string;
  transportType: 'aller' | 'retour' | 'aller-retour';
};

export function ParentCalendar() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [transportEvents, setTransportEvents] = useState<TransportEvent[]>([]);
  
  // Données fictives pour la démo
  const mockChildren = [
    { id: '1', name: 'Lucas Dubois' },
    { id: '2', name: 'Léa Dubois' },
  ];
  
  // Fonction pour ajouter un nouvel événement de transport
  const handleAddEvent = (data: any) => {
    const childName = mockChildren.find(child => child.id === data.childId)?.name || 'Enfant';
    
    const newEvent: TransportEvent = {
      id: `${Date.now()}`, // ID unique basé sur le timestamp
      childId: data.childId,
      childName,
      date: data.date,
      time: data.time,
      transportType: data.transportType,
    };
    
    setTransportEvents([...transportEvents, newEvent]);
    
    toast({
      title: 'Transport programmé',
      description: `Transport ${data.transportType} ajouté pour ${childName} le ${format(data.date, 'dd/MM/yyyy')} à ${data.time}`,
    });
  };
  
  // Fonction pour vérifier si une date a des événements
  const hasEventsOnDate = (date: Date) => {
    return transportEvents.some(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() && 
             eventDate.getMonth() === date.getMonth() && 
             eventDate.getFullYear() === date.getFullYear();
    });
  };
  
  // Fonction pour obtenir les événements d'une date spécifique
  const getEventsForDate = (date: Date) => {
    return transportEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() && 
             eventDate.getMonth() === date.getMonth() && 
             eventDate.getFullYear() === date.getFullYear();
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8 px-2 sm:px-4 md:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Planning</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
            Consultez et gérez le planning de transport
          </p>
        </div>
        
        <Button 
          className="bg-primary hover:bg-primary/90 h-9 sm:h-10 text-xs sm:text-sm w-full sm:w-auto max-w-[250px]"
          onClick={() => setIsEventDialogOpen(true)}
        >
          <CalendarPlus className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
          Programmer un transport
        </Button>
      </div>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Card className="bg-white dark:bg-background lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg">Calendrier des transports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-[320px] px-4 sm:px-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border mx-auto"
                  modifiers={{
                    hasEvent: (date) => hasEventsOnDate(date),
                  }}
                  modifiersClassNames={{
                    hasEvent: 'bg-primary/10 font-semibold text-primary relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full',
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-background">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg">
                {date ? format(date, 'd MMMM yyyy', { locale: fr }) : 'Détails'}
              </CardTitle>
              {date && (
                <div className="flex text-xs text-muted-foreground">
                  {format(date, 'EEEE', { locale: fr })}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {date && getEventsForDate(date).length > 0 ? (
              <div className="space-y-3">
                {getEventsForDate(date).map((event) => (
                  <div key={event.id} className="p-3 rounded-lg border bg-background/50">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Bus className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">{event.childName}</p>
                          <Badge variant="outline" className="text-[10px] bg-primary/5 text-primary border-primary/20">
                            {event.transportType === 'aller' ? 'Aller' : 
                             event.transportType === 'retour' ? 'Retour' : 'Aller-retour'}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Heure de prise en charge : {event.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <Info className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium">Aucun transport prévu</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">
                  Cliquez sur &quot;Programmer un transport&quot; pour ajouter un trajet à cette date
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={() => setIsEventDialogOpen(true)}
                >
                  <CalendarPlus className="h-3.5 w-3.5 mr-1.5" />
                  Programmer
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Dialog pour programmer un transport */}
      <TransportEventDialog 
        open={isEventDialogOpen} 
        onOpenChange={setIsEventDialogOpen}
        selectedDate={date || new Date()}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
}