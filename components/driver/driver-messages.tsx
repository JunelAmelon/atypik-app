'use client';

import { Card } from "@/components/ui/card";

export function DriverMessages() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      <Card className="p-6">
        <div className="space-y-4">
          <p className="text-muted-foreground">No messages yet.</p>
        </div>
      </Card>
    </div>
  );
}