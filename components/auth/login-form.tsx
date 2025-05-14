'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAuth } from '@/lib/auth/auth-context';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: FormValues) => {
    try {
      await login(data.email, data.password);
      toast({
        title: 'Connexion réussie',
        description: 'Bienvenue sur Atypik Transport',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Erreur de connexion',
        description: 'Email ou mot de passe incorrect',
        variant: 'destructive',
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 w-full"
    >
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Bienvenue</h2>
        <p className="text-muted-foreground text-base">
          Connectez-vous à votre espace chauffeur
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-medium">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      placeholder="Entrez votre email" 
                      {...field}
                      className="h-12 pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-medium">Mot de passe</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      {...field}
                      className="h-12 pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary/30"
              />
              <label htmlFor="remember" className="text-sm text-muted-foreground">
                Se souvenir de moi
              </label>
            </div>
            <Button variant="link" className="p-0 h-auto text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              Mot de passe oublié ?
            </Button>
          </div>

          <div className="space-y-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md transition-all duration-300 hover:shadow-lg rounded-xl"
            >
              Connexion
            </Button>

            <div className="pt-6 border-t mt-6">
              <p className="text-sm text-muted-foreground mb-3 text-center">Accès rapide pour test</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-11 border-primary/30 hover:border-primary hover:bg-primary/5"
                  onClick={() => {
                    // Simuler un utilisateur parent pour le test
                    localStorage.setItem('atypik_user', JSON.stringify({
                      id: '1',
                      email: 'parent@example.com',
                      name: 'Marie Dubois',
                      role: 'parent',
                    }));
                    window.location.href = '/parent/dashboard';
                  }}
                >
                  Dashboard Parent
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-11 border-primary/30 hover:border-primary hover:bg-primary/5"
                  onClick={() => {
                    // Simuler un utilisateur chauffeur pour le test
                    localStorage.setItem('atypik_user', JSON.stringify({
                      id: '2',
                      email: 'driver@example.com',
                      name: 'Thierry Bernard',
                      role: 'driver',
                    }));
                    window.location.href = '/driver/dashboard';
                  }}
                >
                  Dashboard Chauffeur
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>

      <div className="text-center text-sm">
        <p className="text-muted-foreground">
          Vous n&apos;avez pas de compte ?{' '}
          <Link
            href="/register"
            className="text-primary hover:underline font-medium transition-colors"
          >
            Inscrivez-vous gratuitement
          </Link>
        </p>
      </div>
    </motion.div>
  );
}