'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter,
  Download,
  Eye,
  Clock,
  FileIcon,
  Share2
} from 'lucide-react';

// Mock documents data
const documents = [
  {
    id: '1',
    name: 'Autorisation de transport',
    type: 'PDF',
    size: '1.2 MB',
    status: 'validated',
    uploadedAt: '15/02/2024',
    tags: ['Important', 'Transport']
  },
  {
    id: '2',
    name: 'Fiche médicale - Lucas',
    type: 'PDF',
    size: '842 KB',
    status: 'pending',
    uploadedAt: '14/02/2024',
    tags: ['Médical', 'Lucas']
  },
  {
    id: '3',
    name: 'Attestation d\'assurance',
    type: 'PDF',
    size: '1.5 MB',
    status: 'validated',
    uploadedAt: '10/02/2024',
    tags: ['Administratif']
  },
  {
    id: '4',
    name: 'Ordonnance médicale - Léa',
    type: 'PDF',
    size: '980 KB',
    status: 'expired',
    uploadedAt: '01/01/2024',
    tags: ['Médical', 'Léa']
  }
];

export function ParentDocuments() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6 sm:space-y-8 px-2 sm:px-4 md:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Documents</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
            Gérez vos documents importants
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 h-9 sm:h-10 text-xs sm:text-sm w-full sm:w-auto">
          <Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
          Ajouter un document
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <CardTitle className="text-base sm:text-lg">Liste des documents</CardTitle>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 sm:pl-9 h-8 sm:h-10 text-xs sm:text-sm w-full sm:w-[200px]"
                />
              </div>
              <Button variant="outline" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-secondary/50 rounded-lg"
              >
                <div className="hidden sm:flex p-2.5 sm:p-3 rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 sm:block">
                      <div className="sm:hidden p-2 rounded-lg bg-primary/10 mr-1">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-medium truncate">{doc.name}</h4>
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mt-1">
                          <FileIcon className="h-3 w-3" />
                          <span>{doc.type}</span>
                          <span className="hidden xs:inline">•</span>
                          <span>{doc.size}</span>
                          <span className="hidden xs:inline">•</span>
                          <Clock className="h-3 w-3" />
                          <span>{doc.uploadedAt}</span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        doc.status === 'validated' ? 'default' :
                        doc.status === 'pending' ? 'secondary' :
                        'destructive'
                      }
                      className="hidden sm:inline-flex"
                    >
                      {doc.status === 'validated' ? 'Validé' :
                       doc.status === 'pending' ? 'En attente' :
                       'Expiré'}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-[10px] sm:text-xs py-0 h-5 bg-primary/5 text-primary border-primary/20"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex-1" />
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                      <Button variant="ghost" size="sm" className="h-7 sm:h-8 text-[10px] sm:text-xs flex-1 sm:flex-auto">
                        <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="hidden xs:inline">Partager</span>
                        <span className="xs:hidden">Part.</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 sm:h-8 text-[10px] sm:text-xs flex-1 sm:flex-auto">
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Voir
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 sm:h-8 text-[10px] sm:text-xs flex-1 sm:flex-auto">
                        <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="hidden xs:inline">Télécharger</span>
                        <span className="xs:hidden">Téléch.</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}