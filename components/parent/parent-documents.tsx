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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-muted-foreground mt-2">
            Gérez vos documents importants
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Upload className="h-4 w-4 mr-2" />
          Ajouter un document
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CardTitle>Liste des documents</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-[200px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
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
                className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg"
              >
                <div className="p-3 rounded-lg bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h4 className="font-medium truncate">{doc.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <FileIcon className="h-3 w-3" />
                        <span>{doc.type}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                        <span>•</span>
                        <Clock className="h-3 w-3" />
                        <span>{doc.uploadedAt}</span>
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
                          className="text-xs bg-primary/5 text-primary border-primary/20"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex-1" />
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8">
                        <Share2 className="h-4 w-4 mr-1" />
                        Partager
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8">
                        <Eye className="h-4 w-4 mr-1" />
                        Voir
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8">
                        <Download className="h-4 w-4 mr-1" />
                        Télécharger
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