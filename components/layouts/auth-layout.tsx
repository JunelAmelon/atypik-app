'use client';

import { Logo } from '@/components/logo';
import { ModeToggle } from '@/components/mode-toggle';
import { AuthGuard } from '@/lib/auth/auth-guard';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-background">
        <header className="py-4 px-4 flex justify-between items-center">
          <Logo />
          <ModeToggle />
        </header>
        
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-[1000px] grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden md:block"
            >
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 bg-[#f1f5f9] rounded-3xl">
                  <Image
                    src="https://images.pexels.com/photos/8534188/pexels-photo-8534188.jpeg"
                    alt="Atypik Transport Sécurisé"
                    fill
                    className="object-contain p-8"
                  />
                </div>
              </div>
            </motion.div>
            
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-card rounded-3xl p-8 max-w-md mx-auto w-full"
              >
                {children}
              </motion.div>
            </div>
          </div>
        </main>
        
        <footer className="py-4 text-center text-sm text-muted-foreground">
          © 2025 Atypik Transport - Tous droits réservés
        </footer>
      </div>
    </AuthGuard>
  );
}