'use client';

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export function ParentCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6 sm:space-y-8 px-2 sm:px-4 md:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Planning</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
            Consultez et gérez le planning de transport
          </p>
        </div>
      </div>
      
      <Card className="bg-white dark:bg-background">
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
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}