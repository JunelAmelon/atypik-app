'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, User } from 'lucide-react';

export function DriverCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Mock data for calendar events
  const events = [
    {
      date: new Date(),
      missions: [
        {
          time: '08:30',
          child: 'Lucas Dubois',
          from: 'Domicile',
          to: 'École Montessori'
        },
        {
          time: '16:30',
          child: 'Emma Martin',
          from: 'École Montessori',
          to: 'Centre de loisirs'
        }
      ]
    }
  ];

  // Find events for selected date
  const selectedDateEvents = events.find(
    event => event.date.toDateString() === date?.toDateString()
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Planning</h1>
        <p className="text-muted-foreground mt-2">
          Gérez votre emploi du temps et vos missions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Calendrier</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Missions du jour</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateEvents ? (
              <div className="space-y-4">
                {selectedDateEvents.missions.map((mission, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg"
                  >
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary font-medium">
                      {mission.time}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        <h4 className="font-medium">{mission.child}</h4>
                      </div>
                      
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{mission.from}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{mission.to}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Aucune mission prévue pour cette date</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}