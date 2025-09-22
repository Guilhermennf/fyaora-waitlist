# Fyaora Labs - Service Providers Waitlist

A modern dashboard application for managing service providers waitlist, developed as part of the Frontend Developer technical test.

## How to Run Locally

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation and Execution

1. **Clone and navigate to the project:**

```bash
cd fyaora-waitlist
```

2. **Install dependencies:**

```bash
npm install
```

3. **Run the development server:**

```bash
npm run dev
```

4. **Open the browser:**
   Access [http://localhost:3000](http://localhost:3000)

## Implemented Features

### Mandatory Requirements Met

Service Providers Table:

- 8 columns: Email, Phone, Postcode, Vendor Type, Service Offering, Signup Date, Status, Actions
- Functional pagination (10 items per page, 5+ pages)
- Sorting by all columns
- Multiple selection with checkboxes + "Select All"
- Actions with edit icon (triggers modal/toast)

Side Filters:

- Postcode (UK ZIP text input)
- Registration Status (Onboarded/Rejected)
- Date Registered (Start + End date)
- Vendor Type (Independent/Company)
- Service Offering (Housekeeping/Window Cleaning/Car Valet)
- Functional "Filter" and "Clear Filters" buttons

Real-time Search:

- Search bar in the top right
- Live filter as you type
- Multi-field search

Complete Responsiveness:

- Sidebar collapses on smaller devices
- Table with horizontal scroll on small screens
- Adaptive layout for mobile/tablet/desktop

### Implemented Bonus Features

UX/UI Improvements:

- Toast notifications for action feedback
- Hover states and smooth transitions on all interactive elements
- Visual states for selections and sorting
- Professional and consistent design system

Modern Design:

- Layout based on professional administrative dashboard
- Consistent color palette
- Hierarchical typography
- Spacing and rounded borders

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Components:** Headless UI
- **Utilities:** date-fns, clsx, tailwind-merge

## Project Structure

```
src/
 components/
    ServiceProvidersPage.tsx    # Main component
    DataTable.tsx               # Table with pagination/sorting
    Sidebar.tsx                 # Side filters
    SearchBar.tsx               # Real-time search
    Toast.tsx                   # Notifications
 types/index.ts                  # TypeScript types
 data/mockData.ts                # 48 demo records
 lib/utils.ts                    # Utilities
```

## Implementation Highlights

Technical Quality:

- 100% typed code with TypeScript
- Modular and reusable components
- Performance optimized with memoization
- Well-managed complex states

Professional UX/UI:

- Consistent design system
- Smooth transitions and animations
- Immediate visual feedback
- Accessibility considered

Responsiveness:

- Mobile-first approach
- Well-defined breakpoints
- Flexible and adaptive layout
- Touch-friendly on mobile devices

## Demo Data

The application includes 48 mocked service provider records to demonstrate all pagination, filtering, and search functionalities.

---

**Developed by:** Guilherme Nunes
