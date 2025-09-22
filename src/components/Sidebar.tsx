'use client';

import { useState } from 'react';
import { FilterState } from '@/types';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  filters: FilterState;
  onFilter: (filters: FilterState) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ filters, onFilter, onClearFilters, isOpen, onClose }: SidebarProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  const handleInputChange = (key: keyof FilterState, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    onFilter(localFilters);
  };

  const handleClearFilters = () => {
    const emptyFilters: FilterState = {
      postcode: '',
      registrationStatus: '',
      dateStart: '',
      dateEnd: '',
      vendorType: '',
      serviceOffering: '',
    };
    setLocalFilters(emptyFilters);
    onClearFilters();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Postcode Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Postcode (UK ZIP)
            </label>
            <input
              type="text"
              value={localFilters.postcode}
              onChange={(e) => handleInputChange('postcode', e.target.value)}
              placeholder="Enter postcode..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Registration Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registration Status
            </label>
            <select
              value={localFilters.registrationStatus}
              onChange={(e) => handleInputChange('registrationStatus', e.target.value as '' | 'Onboarded' | 'Rejected')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="Onboarded">Onboarded</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Date Registered Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Registered
            </label>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                <input
                  type="date"
                  value={localFilters.dateStart}
                  onChange={(e) => handleInputChange('dateStart', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">End Date</label>
                <input
                  type="date"
                  value={localFilters.dateEnd}
                  onChange={(e) => handleInputChange('dateEnd', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Vendor Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vendor Type
            </label>
            <select
              value={localFilters.vendorType}
              onChange={(e) => handleInputChange('vendorType', e.target.value as '' | 'Independent' | 'Company')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              <option value="Independent">Independent</option>
              <option value="Company">Company</option>
            </select>
          </div>

          {/* Service Offering Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Offering
            </label>
            <select
              value={localFilters.serviceOffering}
              onChange={(e) => handleInputChange('serviceOffering', e.target.value as '' | 'Housekeeping' | 'Window Cleaning' | 'Car Valet')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Services</option>
              <option value="Housekeeping">Housekeeping</option>
              <option value="Window Cleaning">Window Cleaning</option>
              <option value="Car Valet">Car Valet</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-6 border-t border-gray-200">
            <button
              onClick={handleApplyFilters}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Filter
            </button>
            <button
              onClick={handleClearFilters}
              className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}