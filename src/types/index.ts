export interface ServiceProvider {
  id: string;
  email: string;
  phoneNumber: string;
  postcode: string;
  vendorType: 'Independent' | 'Company';
  serviceOffering: 'Housekeeping' | 'Window Cleaning' | 'Car Valet';
  signupDate: string;
  status: 'Onboarded' | 'Rejected';
}

export interface FilterState {
  postcode: string;
  registrationStatus: 'Onboarded' | 'Rejected' | '';
  dateStart: string;
  dateEnd: string;
  vendorType: 'Independent' | 'Company' | '';
  serviceOffering: 'Housekeeping' | 'Window Cleaning' | 'Car Valet' | '';
}

export interface SortConfig {
  key: keyof ServiceProvider | null;
  direction: 'asc' | 'desc';
}

export interface PaginationConfig {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}