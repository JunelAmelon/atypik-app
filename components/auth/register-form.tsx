'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

import { UserRole, useAuth } from '@/lib/auth/auth-context';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, UserRound, Car } from 'lucide-react';

const commonFieldsSchema = {
  firstName: z.string().min(2, 'Le prénom doit comporter au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit comporter au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  confirmPassword: z.string(),
};

const parentSchema = z.object({
  ...commonFieldsSchema,
  address: z.string().min(5, 'Adresse trop courte'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

const driverSchema = z.object({
  ...commonFieldsSchema,
  licenseNumber: z.string().min(5, 'Numéro de permis trop court'),
  insuranceNumber: z.string().min(5, 'Numéro d\'assurance trop court'),
  address: z.string().min(5, 'Adresse trop courte'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

type ParentFormValues = z.infer<typeof parentSchema>;
type DriverFormValues = z.infer<typeof driverSchema>;

export function RegisterForm() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('parent');
  const { register } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const parentForm = useForm<ParentFormValues>({
    resolver: zodResolver(parentSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      confirmPassword: '',
    },
  });

  const driverForm = useForm<DriverFormValues>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      licenseNumber: '',
      insuranceNumber: '',
      address: '',
      password: '',
      confirmPassword: '',
    },
  });

  const isParentSubmitting = parentForm.formState.isSubmitting;
  const isDriverSubmitting = driverForm.formState.isSubmitting;

  const onParentSubmit = async (data: ParentFormValues) => {
    try {
      await register(data, 'parent');
      toast({
        title: 'Inscription réussie',
        description: 'Votre compte parent a été créé avec succès',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Erreur d\'inscription',
        description: 'Une erreur est survenue lors de l\'inscription',
        variant: 'destructive',
      });
    }
  };

  const onDriverSubmit = async (data: DriverFormValues) => {
    try {
      await register(data, 'driver');
      toast({
        title: 'Inscription réussie',
        description: 'Votre candidature de chauffeur a été soumise',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Erreur d\'inscription',
        description: 'Une erreur est survenue lors de l\'inscription',
        variant: 'destructive',
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 w-full"
    >
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Inscription</h2>
        <p className="text-muted-foreground text-sm">
          Créez votre compte en quelques clics
        </p>
      </div>

      <Tabs
        defaultValue="parent"
        onValueChange={(value) => setSelectedRole(value as UserRole)}
      >
        <TabsList className="grid grid-cols-2 mb-8 p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-xl">
          <TabsTrigger value="parent" className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-primary data-[state=active]:shadow-sm">
            <UserRound size={18} />
            <span>Parent</span>
          </TabsTrigger>
          <TabsTrigger value="driver" className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-primary data-[state=active]:shadow-sm">
            <Car size={18} />
            <span>Chauffeur</span>
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="parent" className="mt-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Form {...parentForm}>
                <form onSubmit={parentForm.handleSubmit(onParentSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={parentForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Prénom</FormLabel>
                          <FormControl>
                            <Input placeholder="Marie" {...field} className="h-11 bg-background/50 border-input/50 focus:border-primary focus:ring-1 focus:ring-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={parentForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Dupont" {...field} className="h-11 bg-background/50 border-input/50 focus:border-primary focus:ring-1 focus:ring-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={parentForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="exemple@email.com" {...field} className="h-11 bg-background/50 border-input/50 focus:border-primary focus:ring-1 focus:ring-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={parentForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="06 12 34 56 78" {...field} className="h-11 bg-background/50 border-input/50 focus:border-primary focus:ring-1 focus:ring-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={parentForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Adresse</FormLabel>
                        <FormControl>
                          <Input placeholder="123 rue des Lilas, 75001 Paris" {...field} className="h-11 bg-background/50 border-input/50 focus:border-primary focus:ring-1 focus:ring-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={parentForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Mot de passe</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} className="h-11 bg-background/50 border-input/50 focus:border-primary focus:ring-1 focus:ring-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={parentForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Confirmer</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} className="h-11 bg-background/50 border-input/50 focus:border-primary focus:ring-1 focus:ring-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isParentSubmitting}
                    className="w-full h-11 text-base mt-2 bg-primary hover:bg-primary/90 shadow-sm transition-all duration-200 hover:shadow-md"
                  >
                    {isParentSubmitting ? (
                      <Loader size="sm" className="mr-2" />
                    ) : null}
                    Créer mon compte
                  </Button>
                </form>
              </Form>
            </motion.div>
          </TabsContent>

          <TabsContent value="driver" className="mt-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Form {...driverForm}>
                <form onSubmit={driverForm.handleSubmit(onDriverSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={driverForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Prénom</FormLabel>
                          <FormControl>
                            <Input placeholder="Thomas" {...field} className="h-11 bg-background/50 border-input/50 focus:border-primary focus:ring-1 focus:ring-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={driverForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Martin" {...field} className="h-11 bg-background/50 border-input/50 focus:border-primary focus:ring-1 focus:ring-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={driverForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="exemple@email.com" {...field} className="h-11 bg-background/50 border-input/50 focus:border-primary focus:ring-1 focus:ring-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={driverForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="06 12 34 56 78" {...field} className="h-11 bg-background/50 border-input/50 focus:border-primary focus:ring-1 focus:ring-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={driverForm.control}
                      name="licenseNumber"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-sm font-medium">N° de permis</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="123456789" {...field} className="h-12 pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" />
                              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="14" x="3" y="5" rx="2"/><path d="M7 12h10"/><path d="M7 16h10"/><path d="M7 8h10"/></svg>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={driverForm.control}
                      name="insuranceNumber"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-sm font-medium">N° d&apos;assurance</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="987654321" {...field} className="h-12 pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" />
                              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={driverForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="text-sm font-medium">Adresse</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="123 rue des Lilas, 75001 Paris" {...field} className="h-12 pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={driverForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Mot de passe</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} className="h-11 bg-background/50 border-input/50 focus:border-primary focus:ring-1 focus:ring-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={driverForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Confirmer</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} className="h-11 bg-background/50 border-input/50 focus:border-primary focus:ring-1 focus:ring-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isDriverSubmitting}
                    className="w-full h-11 text-base mt-2 bg-primary hover:bg-primary/90 shadow-sm transition-all duration-200 hover:shadow-md"
                  >
                    {isDriverSubmitting ? (
                      <Loader size="sm" className="mr-2" />
                    ) : null}
                    Soumettre ma candidature
                  </Button>
                </form>
              </Form>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>

      <div className="text-center text-sm">
        <p className="text-muted-foreground">
          Déjà inscrit ?{' '}
          <Link href="/login" className="text-primary hover:underline font-medium inline-flex items-center transition-colors">
            <ChevronLeft className="h-3 w-3 mr-1" />
            Se connecter
          </Link>
        </p>
      </div>
    </motion.div>
  );
}