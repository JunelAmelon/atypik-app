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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">WELCOME BACK</h2>
        <p className="text-muted-foreground text-sm">
          Welcome back! Please enter your details.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your email" 
                    {...field}
                    className="h-11 bg-background"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      {...field}
                      className="h-11 bg-background"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
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
                className="h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="remember" className="text-sm text-muted-foreground">
                Remember me
              </label>
            </div>
            <Button variant="link" className="p-0 h-auto text-sm font-normal">
              Forgot password
            </Button>
          </div>

          <div className="space-y-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 text-base bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? (
                <Loader size="sm" className="mr-2" />
              ) : null}
              Sign in
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full h-11 text-base"
            >
              <Image src="https://www.google.com/favicon.ico" alt="Google" width={20} height={20} className="mr-2" />
              Sign in with Google
            </Button>
          </div>
        </form>
      </Form>

      <div className="text-center text-sm">
        <p className="text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="text-primary hover:underline font-medium"
          >
            Sign up for free!
          </Link>
        </p>
      </div>
    </motion.div>
  );
}