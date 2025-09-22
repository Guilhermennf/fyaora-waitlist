'use client';

import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5 duration-300">
      <div
        className={cn(
          'flex items-center p-4 rounded-lg shadow-lg max-w-sm',
          type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        )}
      >
        <div className="flex-shrink-0">
          {type === 'success' ? (
            <CheckCircle className="h-5 w-5 text-green-400" />
          ) : (
            <XCircle className="h-5 w-5 text-red-400" />
          )}
        </div>
        <div className="ml-3 flex-1">
          <p
            className={cn(
              'text-sm font-medium',
              type === 'success' ? 'text-green-800' : 'text-red-800'
            )}
          >
            {message}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={onClose}
            className={cn(
              'inline-flex rounded-md p-1.5 hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2',
              type === 'success'
                ? 'text-green-500 hover:bg-green-600 focus:ring-green-600'
                : 'text-red-500 hover:bg-red-600 focus:ring-red-600'
            )}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}