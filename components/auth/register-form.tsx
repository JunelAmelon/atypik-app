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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Créer un compte</h2>
        <p className="text-muted-foreground">
          Choisissez votre profil et complétez le formulaire
        </p>
      </div>

      <Tabs
        defaultValue="parent"
        value={selectedRole}
        onValueChange={(value) => setSelectedRole(value as UserRole)}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 h-11">
          <TabsTrigger value="parent" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <UserRound className="mr-2 h-5 w-5" />
            Parent
          </TabsTrigger>
          <TabsTrigger value="driver" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Car className="mr-2 h-5 w-5" />
            Chauffeur
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
                          <FormLabel>Prénom</FormLabel>
                          <FormControl>
                            <Input placeholder="Marie" {...field} className="h-11" />
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
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Dupont" {...field} className="h-11" />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="exemple@email.com" {...field} className="h-11" />
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
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="06 12 34 56 78" {...field} className="h-11" />
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
                        <FormLabel>Adresse</FormLabel>
                        <FormControl>
                          <Input placeholder="123 rue des Lilas, 75001 Paris" {...field} className="h-11" />
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
                          <FormLabel>Mot de passe</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} className="h-11" />
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
                          <FormLabel>Confirmer</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} className="h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isParentSubmitting}
                    className="w-full h-11 text-base mt-2"
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
                          <FormLabel>Prénom</FormLabel>
                          <FormControl>
                            <Input placeholder="Thomas" {...field} className="h-11" />
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
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Martin" {...field} className="h-11" />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="exemple@email.com" {...field} className="h-11" />
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
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="06 12 34 56 78" {...field} className="h-11" />
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
                        <FormItem>
                          <FormLabel>N° de permis</FormLabel>
                          <FormControl>
                            <Input placeholder="123456789" {...field} className="h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={driverForm.control}
                      name="insuranceNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>N° d&apos;assurance</FormLabel>
                          <FormControl>
                            <Input placeholder="987654321" {...field} className="h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={driverForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mot de passe</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} className="h-11" />
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
                          <FormLabel>Confirmer</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} className="h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isDriverSubmitting}
                    className="w-full h-11 text-base mt-2"
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
          <Link href="/login" className="text-primary hover:underline font-medium inline-flex items-center">
            <ChevronLeft className="h-3 w-3 mr-1" />
            Se connecter
          </Link>
        </p>
      </div>
    </motion.div>
  );
}