'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Search,
  Plus,
  User,
  Car,
  MessageSquare,
  Phone,
  Video,
  MoreVertical,
  Send,
  Image as ImageIcon,
  Paperclip,
  Smile
} from 'lucide-react';

// Mock conversations data
const conversations = [
  {
    id: '1',
    name: 'Thomas Bernard',
    role: 'Chauffeur',
    avatar: null,
    lastMessage: 'Je serai là dans 5 minutes',
    time: '09:30',
    unread: 2,
    online: true
  },
  {
    id: '2',
    name: 'Marie Dupont',
    role: 'Chauffeur',
    avatar: null,
    lastMessage: 'Le trajet s\'est bien passé',
    time: 'Hier',
    unread: 0,
    online: false
  },
  {
    id: '3',
    name: 'Support Atypik',
    role: 'Support',
    avatar: null,
    lastMessage: 'Comment pouvons-nous vous aider ?',
    time: '23/02',
    unread: 0,
    online: true
  }
];

export function ParentMessages() {
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);

  return (
    <div className="h-[calc(100vh-10rem)]">
      <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-6">
        {/* Conversations List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle>Messages</CardTitle>
              <Button variant="ghost" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <motion.div
                  key={conversation.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedConversation.id === conversation.id
                      ? 'bg-primary/10'
                      : 'hover:bg-secondary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.avatar || undefined} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {conversation.role === 'Chauffeur' ? (
                            <Car className="h-4 w-4" />
                          ) : (
                            <MessageSquare className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-background" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium truncate">{conversation.name}</h4>
                        <span className="text-xs text-muted-foreground">{conversation.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {conversation.role}
                        </Badge>
                        {conversation.unread > 0 && (
                          <Badge variant="default" className="text-xs">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="md:col-span-2">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedConversation.avatar || undefined} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {selectedConversation.role === 'Chauffeur' ? (
                      <Car className="h-4 w-4" />
                    ) : (
                      <MessageSquare className="h-4 w-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{selectedConversation.name}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {selectedConversation.role}
                    </Badge>
                    {selectedConversation.online && (
                      <span className="text-xs text-success">En ligne</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex flex-col h-[calc(100vh-20rem)]">
            <div className="flex-1 overflow-y-auto p-4">
              {/* Chat messages will go here */}
              <div className="text-center text-sm text-muted-foreground py-8">
                Début de votre conversation avec {selectedConversation.name}
              </div>
            </div>
            <div className="border-t p-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Écrivez votre message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button className="bg-primary hover:bg-primary/90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}