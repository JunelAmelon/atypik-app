'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui/loader';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const formSchema = z.object({
  childId: z.string().min(1, 'Veuillez sélectionner un enfant'),
  transportType: z.enum(['aller', 'retour', 'aller-retour']),
  date: z.date(),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format d\'heure invalide'),
});

type FormValues = z.infer<typeof formSchema>;

interface TransportEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate?: Date;
  onAddEvent?: (data: FormValues) => void;
}

export function TransportEventDialog({ 
  open, 
  onOpenChange, 
  selectedDate = new Date(),
  onAddEvent 
}: TransportEventDialogProps) {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      childId: '',
      transportType: 'aller-retour',
      date: selectedDate,
      time: '08:00',
    },
  });

  const { isSubmitting } = form.formState;

  // Données fictives pour la démo
  const mockChildren = [
    { id: '1', name: 'Lucas Dubois' },
    { id: '2', name: 'Léa Dubois' },
  ];

  const onSubmit = async (data: FormValues) => {
    try {
      // Simule un délai d'ajout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onAddEvent) {
        onAddEvent(data);
      }
      
      toast({
        title: 'Transport programmé',
        description: 'Le transport a été ajouté au calendrier',
      });
      
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la programmation',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Programmer un transport</DialogTitle>
          <DialogDescription>
            Pour le {selectedDate ? format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr }) : ''}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="childId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enfant</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un enfant" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockChildren.map((child) => (
                        <SelectItem key={child.id} value={child.id}>
                          {child.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transportType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de transport</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="aller">Aller (matin)</SelectItem>
                      <SelectItem value="retour">Retour (après-midi)</SelectItem>
                      <SelectItem value="aller-retour">Aller-retour</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Heure de prise en charge</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader size="sm" className="mr-2" />
                    Enregistrement...
                  </>
                ) : (
                  'Programmer'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
