'use client';

import { 
  CalendarRange, 
  MapPin,
  Clock, 
  UserRound,
  Car,
  AlertTriangle,
  Star,
  BarChart,
  Banknote
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth/auth-context';
import { DriverMissionCard } from '@/components/driver/driver-mission-card';
import { DriverUpcomingMissions } from '@/components/driver/driver-upcoming-missions';
import { DriverStatsCard } from '@/components/driver/driver-stats-card';

export function DriverDashboard() {
  const router = useRouter();
  const { user } = useAuth();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Bonjour, {user?.name?.split(' ')[0]}</h1>
        <p className="text-muted-foreground">
          Bienvenue sur votre espace chauffeur
        </p>
      </div>

      <motion.div variants={itemVariants}>
        <DriverMissionCard />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="md:col-span-2">
          <DriverUpcomingMissions />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DriverStatsCard />
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <span>Mes évaluations récentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Lucas Dubois (8 ans)</h4>
                    <p className="text-sm text-muted-foreground">Transport du 12/06</p>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-4 w-4 ${star <= 5 ? "text-yellow-500 fill-yellow-500" : "text-muted"}`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm mt-2">
                  &quot;Trajet parfait, Thomas est toujours très professionnel et à l&apos;heure.&quot;
                </p>
              </div>
              
              <div className="bg-secondary/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Léa Dubois (6 ans)</h4>
                    <p className="text-sm text-muted-foreground">Transport du 09/06</p>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-4 w-4 ${star <= 4 ? "text-yellow-500 fill-yellow-500" : "text-muted"}`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm mt-2">
                  &quot;Excellent chauffeur qui a su gérer l&apos;anxiété matinale de ma fille.&quot;
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <span>Profil enfant du jour</span>
            </CardTitle>
            <CardDescription>
              Consultez les besoins spécifiques de l&apos;enfant que vous transportez
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-secondary/50 p-4 rounded-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserRound className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">Lucas Dubois</h3>
                  <p className="text-sm text-muted-foreground">8 ans • École Montessori Étoile</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">À propos de Lucas</h4>
                  <p className="text-sm text-muted-foreground">
                    Lucas est un enfant très sociable mais a parfois du mal à rester concentré pendant les longs trajets. Il aime beaucoup parler de ses jeux vidéo préférés.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Besoins spécifiques</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Allergie sévère au gluten</p>
                        <p className="text-xs text-muted-foreground">EpiPen dans son sac de transport</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">TDAH diagnostiqué</p>
                        <p className="text-xs text-muted-foreground">Besoin d&apos;activités pour rester concentré</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button size="sm" variant="default" className="w-full bg-primary hover:bg-primary/90">
                    Voir fiche complète
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}