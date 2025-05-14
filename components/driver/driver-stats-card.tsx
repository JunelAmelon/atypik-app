'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star, BarChart, Banknote } from 'lucide-react';

export function DriverStatsCard() {
  return (
    <Card className="border-0 shadow-lg overflow-hidden">
      <div className="bg-orange-500 h-3 w-full"></div>
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/20">
              <BarChart className="h-5 w-5 text-primary dark:text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg whitespace-nowrap">Statistiques</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-primary dark:text-primary" /> 
                Performance et activité
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-white to-yellow-50/50 dark:from-background dark:to-yellow-900/5 p-4 rounded-xl border border-yellow-200/50 dark:border-yellow-800/20 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 shadow-sm">
                  <Star className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <span className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Note moyenne</span>
              </div>
              <div className="flex items-center">
                <span className="text-3xl font-bold text-yellow-700 dark:text-yellow-400">4.9</span>
                <span className="text-xs font-medium text-yellow-600/70 dark:text-yellow-500/70 ml-1 mt-2">/5</span>
              </div>
            </div>
            
            <div className="relative h-2.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full progress-bar"
                data-progress={98}
              ></div>
            </div>
            
            <div className="flex justify-between mt-2">
              <p className="text-xs text-yellow-600/80 dark:text-yellow-500/80">
                Basé sur 128 évaluations
              </p>
              <p className="text-xs font-medium text-yellow-700 dark:text-yellow-400">
                Excellent
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-500"></span>
              Cette semaine
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-white to-teal-50/50 dark:from-background dark:to-teal-900/5 p-4 rounded-xl border border-teal-200/50 dark:border-teal-800/20 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-6 w-6 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400">M</span>
                  </div>
                  <p className="text-xs font-medium text-teal-700 dark:text-teal-400">Missions</p>
                </div>
                <div className="flex items-baseline">
                  <p className="text-2xl font-bold text-teal-700 dark:text-teal-400">24</p>
                  <p className="text-xs font-medium text-teal-600/70 dark:text-teal-500/70 ml-2">
                    <span className="text-green-600 dark:text-green-400">+8%</span> vs sem. dernière
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-white to-teal-50/50 dark:from-background dark:to-teal-900/5 p-4 rounded-xl border border-teal-200/50 dark:border-teal-800/20 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-6 w-6 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400">KM</span>
                  </div>
                  <p className="text-xs font-medium text-teal-700 dark:text-teal-400">Km parcourus</p>
                </div>
                <div className="flex items-baseline">
                  <p className="text-2xl font-bold text-teal-700 dark:text-teal-400">187</p>
                  <p className="text-xs font-medium text-teal-600/70 dark:text-teal-500/70 ml-2">
                    <span className="text-green-600 dark:text-green-400">+5%</span> vs sem. dernière
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-green-50/50 dark:from-background dark:to-green-900/5 p-4 rounded-xl border border-green-200/50 dark:border-green-800/20 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 shadow-sm">
                  <Banknote className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm font-medium text-green-800 dark:text-green-300">Gains du mois</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-green-700 dark:text-green-400">1 250€</span>
              </div>
            </div>
            
            <div className="relative h-2.5 bg-green-100 dark:bg-green-900/30 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full progress-bar"
                data-progress={75}
              ></div>
            </div>
            
            <div className="flex justify-between mt-2">
              <p className="text-xs text-green-600/80 dark:text-green-500/80">
                Objectif: 1 500€
              </p>
              <p className="text-xs font-medium text-green-700 dark:text-green-400 flex items-center gap-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span>
                +12% vs mois dernier
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}