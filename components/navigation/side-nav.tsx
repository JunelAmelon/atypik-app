'use client';

import { usePathname, useRouter } from 'next/navigation';
import { 
  CalendarRange, 
  Home, 
  MessageSquare,
  UserRound,
  MapPin,
  Car,
  GraduationCap,
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  HelpCircle,
  BarChart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth/auth-context';
import { Button } from '@/components/ui/button';

interface SideNavProps {
  className?: string;
}

export function SideNav({ className }: SideNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  
  if (!user) return null;
  
  const isParent = user.role === 'parent';
  
  const parentNavItems = [
    {
      icon: LayoutDashboard,
      label: 'Tableau de bord',
      href: '/parent/dashboard',
    },
    {
      icon: Users,
      label: 'Mes enfants',
      href: '/parent/children',
    },
    {
      icon: CalendarRange,
      label: 'Planning',
      href: '/parent/calendar',
    },
    {
      icon: MapPin,
      label: 'Suivi en temps réel',
      href: '/parent/tracking',
    },
    {
      icon: FileText,
      label: 'Documents',
      href: '/parent/documents',
    },
    {
      icon: MessageSquare,
      label: 'Messagerie',
      href: '/parent/messages',
    },
  ];
  
  const driverNavItems = [
    {
      icon: LayoutDashboard,
      label: 'Tableau de bord',
      href: '/driver/dashboard',
    },
    {
      icon: Car,
      label: 'Missions du jour',
      href: '/driver/missions',
    },
    {
      icon: CalendarRange,
      label: 'Planning',
      href: '/driver/calendar',
    },
    {
      icon: BarChart,
      label: 'Statistiques',
      href: '/driver/stats',
    },
    {
      icon: GraduationCap,
      label: 'Formations',
      href: '/driver/formations',
    },
    {
      icon: MessageSquare,
      label: 'Messagerie',
      href: '/driver/messages',
    },
  ];

  const bottomNavItems = [
    {
      icon: Settings,
      label: 'Paramètres',
      href: `/${user.role}/settings`,
    },
    {
      icon: HelpCircle,
      label: 'Aide',
      href: `/${user.role}/help`,
    },
  ];
  
  const navItems = isParent ? parentNavItems : driverNavItems;
  
  return (
    <div className={cn("py-4", className)}>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-primary">
          Menu principal
        </h2>
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Button
                key={item.href}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-x-3 font-medium",
                  isActive 
                    ? "bg-primary/10" 
                    : "hover:bg-primary/5"
                )}
                onClick={() => router.push(item.href)}
              >
                <item.icon className={cn(
                  "h-5 w-5",
                  isActive ? "text-primary" : "text-primary"
                )} />
                <span className={isActive ? "text-primary" : "text-foreground"}>
                  {item.label}
                </span>
              </Button>
            );
          })}
        </div>
      </div>

      <div className="px-3 py-2 mt-4">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-primary">
          Paramètres
        </h2>
        <div className="space-y-1">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Button
                key={item.href}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-x-3 font-medium",
                  isActive 
                    ? "bg-primary/10" 
                    : "hover:bg-primary/5"
                )}
                onClick={() => router.push(item.href)}
              >
                <item.icon className={cn(
                  "h-5 w-5",
                  isActive ? "text-primary" : "text-primary"
                )} />
                <span className={isActive ? "text-primary" : "text-foreground"}>
                  {item.label}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}