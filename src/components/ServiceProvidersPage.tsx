'use client';

import { useState, useMemo } from 'react';
import { mockServiceProviders } from '@/data/mockData';
import { ServiceProvider, FilterState, SortConfig, PaginationConfig } from '@/types';
import { format } from 'date-fns';
import Sidebar from './Sidebar';
import DataTable from './DataTable';
import SearchBar from './SearchBar';
import Toast from './Toast';

export default function ServiceProvidersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    postcode: '',
    registrationStatus: '',
    dateStart: '',
    dateEnd: '',
    vendorType: '',
    serviceOffering: '',
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'asc',
  });
  const [pagination, setPagination] = useState<PaginationConfig>({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
  });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredData = useMemo(() => {
    let data = [...mockServiceProviders];

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase().trim();
      data = data.filter(
        (provider) =>
          provider.email.toLowerCase().includes(search) ||
          provider.phoneNumber.toLowerCase().includes(search) ||
          provider.postcode.toLowerCase().includes(search) ||
          provider.vendorType.toLowerCase().includes(search) ||
          provider.serviceOffering.toLowerCase().includes(search)
      );
    }

    // Apply filters
    if (filters.postcode) {
      data = data.filter((provider) =>
        provider.postcode.toLowerCase().includes(filters.postcode.toLowerCase())
      );
    }

    if (filters.registrationStatus) {
      data = data.filter((provider) => provider.status === filters.registrationStatus);
    }

    if (filters.vendorType) {
      data = data.filter((provider) => provider.vendorType === filters.vendorType);
    }

    if (filters.serviceOffering) {
      data = data.filter((provider) => provider.serviceOffering === filters.serviceOffering);
    }

    if (filters.dateStart) {
      data = data.filter((provider) => provider.signupDate >= filters.dateStart);
    }

    if (filters.dateEnd) {
      data = data.filter((provider) => provider.signupDate <= filters.dateEnd);
    }

    // Apply sorting
    if (sortConfig.key) {
      data.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return data;
  }, [searchTerm, filters, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    const data = filteredData.slice(startIndex, endIndex);

    // Update pagination info
    const totalPages = Math.ceil(filteredData.length / pagination.itemsPerPage);
    setPagination((prev) => ({
      ...prev,
      totalItems: filteredData.length,
      totalPages,
    }));

    return data;
  }, [filteredData, pagination.currentPage, pagination.itemsPerPage]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleFilter = (newFilters: FilterState) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    setToast({ message: 'Filters applied successfully!', type: 'success' });
    setSidebarOpen(false);
  };

  const handleClearFilters = () => {
    setFilters({
      postcode: '',
      registrationStatus: '',
      dateStart: '',
      dateEnd: '',
      vendorType: '',
      serviceOffering: '',
    });
    setSearchTerm('');
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    setToast({ message: 'Filters cleared successfully!', type: 'success' });
  };

  const handleSort = (key: keyof ServiceProvider) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedData.map((provider) => provider.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
    }
  };

  const handleEdit = (provider: ServiceProvider) => {
    setToast({ message: `Edit action triggered for ${provider.email}`, type: 'success' });
  };

  const handleCloseToast = () => {
    setToast(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Service Providers</h1>
          </div>
          <SearchBar onSearch={handleSearch} value={searchTerm} />
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          filters={filters}
          onFilter={handleFilter}
          onClearFilters={handleClearFilters}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow">
            <DataTable
              data={paginatedData}
              selectedIds={selectedIds}
              sortConfig={sortConfig}
              pagination={pagination}
              onSort={handleSort}
              onPageChange={handlePageChange}
              onSelectAll={handleSelectAll}
              onSelectRow={handleSelectRow}
              onEdit={handleEdit}
            />
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
}