'use client';

import { motion } from 'framer-motion';
import { MapPin, Car } from 'lucide-react';

interface AnimatedRouteProps {
  fromName: string;
  fromAddress: string;
  toName: string;
  toAddress: string;
  fromStatus?: string;
  toStatus?: string;
  fromTime?: string;
  toTime?: string;
  className?: string;
}

export function AnimatedRoute({
  fromName,
  fromAddress,
  toName,
  toAddress,
  fromStatus,
  toStatus,
  fromTime,
  toTime,
  className,
  progress = 50 // Valeur par du00e9faut de 50%
}: AnimatedRouteProps & { progress?: number }) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Départ */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-2.5 rounded-lg border border-primary/20 dark:border-primary/30 bg-white dark:bg-gray-800 shadow-sm"
      >
        <p className="text-sm font-medium flex items-center gap-2 text-black dark:text-white">
          <MapPin className="h-4 w-4 text-primary dark:text-primary" />
          {fromName}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{fromAddress}</p>
        {fromStatus && (
          <div className="flex justify-end">
            <p className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center mt-1">
              {fromStatus}
            </p>
          </div>
        )}
        {fromTime && (
          <div className="flex justify-end">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center mt-1">
              {fromTime}
            </p>
          </div>
        )}
      </motion.div>

      {/* Ligne animée avec effet de trajet - design simplifié */}
      <div className="relative flex justify-center my-4 h-24">
        {/* Ligne de base */}
        <div className="absolute h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
        
        {/* Ligne de progression */}
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: `${progress}%` }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute w-0.5 bg-primary origin-top"
        ></motion.div>
        
        {/* Point de départ */}
        <div className="absolute top-0 z-10 -translate-y-1/2">
          <div className="h-3 w-3 rounded-full bg-green-500 shadow-md"></div>
        </div>
        
        {/* Icône de voiture qui se déplace en fonction du pourcentage */}
        <motion.div 
          initial={{ opacity: 0, top: 0 }}
          animate={{ opacity: 1, top: `${progress}%` }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="absolute z-20 -ml-3"
          style={{ top: `${progress}%` }}
        >
          <div className="flex items-center justify-center">
            <Car className="h-4 w-4 text-primary" />
          </div>
        </motion.div>
        
        {/* Point d'arrivée */}
        <div className="absolute bottom-0 z-10 translate-y-1/2">
          <div className="h-3 w-3 rounded-full bg-red-500 shadow-md"></div>
        </div>
      </div>

      {/* Arrivée */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="p-2.5 rounded-lg border border-primary/20 dark:border-primary/30 bg-white dark:bg-gray-800 shadow-sm"
      >
        <p className="text-sm font-medium flex items-center gap-2 text-black dark:text-white">
          <MapPin className="h-4 w-4 text-primary dark:text-primary" />
          {toName}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{toAddress}</p>
        {toStatus && (
          <div className="flex justify-end">
            <p className="text-xs font-medium text-primary dark:text-primary flex items-center mt-1">
              {toStatus}
            </p>
          </div>
        )}
        {toTime && (
          <div className="flex justify-end">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center mt-1">
              {toTime}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
