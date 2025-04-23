'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star, BarChart, Banknote } from 'lucide-react';

export function DriverStatsCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-primary" />
          <span>Statistiques</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Note moyenne</span>
              </div>
              <span className="text-2xl font-bold">4.9</span>
            </div>
            <Progress value={98} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Basé sur 128 évaluations
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Cette semaine</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">Missions</p>
                <p className="text-xl font-bold mt-1">24</p>
              </div>
              <div className="bg-secondary/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">Km parcourus</p>
                <p className="text-xl font-bold mt-1">187</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Banknote className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Gains du mois</span>
              </div>
              <span className="text-xl font-bold">1 250€</span>
            </div>
            <Progress value={75} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              +12% par rapport au mois dernier
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}