'use client';

import { 
  CalendarRange, 
  Map, 
  Clock, 
  Plus,
  Bell,
  UserRound,
  AlertTriangle,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth/auth-context';
import { ParentCalendarView } from '@/components/parent/parent-calendar-view';
import { ParentChildListCard } from '@/components/parent/parent-child-list-card';
import { ParentUpcomingTrip } from '@/components/parent/parent-upcoming-trip';

export function ParentDashboard() {
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
          Bienvenue sur votre tableau de bord de transport sécurisé
        </p>
      </div>

      <motion.div variants={itemVariants}>
        <ParentUpcomingTrip />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarRange className="h-5 w-5 text-primary" />
                  <span>Planning de la semaine</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 gap-1 text-xs"
                  onClick={() => router.push('/parent/calendar')}
                >
                  <span>Voir tout</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ParentCalendarView />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ParentChildListCard />
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <span>Notifications récentes</span>
            </CardTitle>
            <CardDescription>
              Vos 3 dernières notifications importantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                <div className="mt-1 p-2 bg-primary/10 rounded-full">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Retard du chauffeur</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Thomas sera en retard de 10 minutes ce matin pour le transport de Lucas
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">Il y a 25 min</span>
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                      Contacter
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                <div className="mt-1 p-2 bg-success/10 rounded-full">
                  <UserRound className="h-4 w-4 text-success" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Nouveau chauffeur attribué</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Marie Dupont sera la nouvelle chauffeure de Léa à partir de lundi
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">Hier</span>
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                      Voir profil
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                <div className="mt-1 p-2 bg-warning/10 rounded-full">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Modification d&apos;horaire</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Le transport de vendredi a été décalé de 16h30 à 17h en raison du trafic
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">Il y a 2 jours</span>
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                      Confirmer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <span>Dernières évaluations</span>
              </div>
            </CardTitle>
            <CardDescription>
              Les retours sur les derniers transports de vos enfants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="received">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="received">Reçues</TabsTrigger>
                <TabsTrigger value="given">Données</TabsTrigger>
              </TabsList>
              <TabsContent value="received" className="space-y-4">
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Thomas Bernard</h4>
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
                    &quot;Lucas a été très calme pendant le trajet. Il a beaucoup discuté de son nouveau jeu vidéo.&quot;
                  </p>
                </div>
                
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Marie Leroy</h4>
                      <p className="text-sm text-muted-foreground">Transport du 10/06</p>
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
                    &quot;Léa était un peu anxieuse ce matin mais s&apos;est détendue après quelques minutes.&quot;
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="given" className="space-y-4">
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Thomas Bernard</h4>
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
                      <h4 className="font-medium">Marie Leroy</h4>
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
                    &quot;Marie a su gérer l&apos;anxiété matinale de Léa avec beaucoup de patience.&quot;
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}