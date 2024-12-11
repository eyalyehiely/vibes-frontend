import React from 'react';
import { Map } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="text-center py-12">
      <Map className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">אין מסלולים</h3>
      <p className="text-gray-500">לא נמצאו מסלולים שמורים</p>
    </div>
  );
}