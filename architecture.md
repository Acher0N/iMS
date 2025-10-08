# iMS (Invoice Management System) - Architecture Documentation

## Overview

Invoice Management System (iMS) is a comprehensive offline-first Progressive Web Application (PWA) built with modern web technologies. The system provides complete invoice and inventory management capabilities with KSA ZATCA Fatoora compliance, designed for high performance, security, and maintainability.

## Technology Stack

### Core Technologies

- **Frontend Framework**: React 19 with Vite
- **UI Library**: Material-UI (MUI) with custom theming
- **State Management**: Redux Toolkit with Redux Persist
- **Database**: Firebase Realtime Database (online) + Dexie.js (offline)
- **Offline Strategy**: Custom Offline Engine with Service Workers
- **Form Management**: Formik with Yup validation
- **Date Management**: Day.js and date-fns
- **Mathematics**: Decimal.js for precise calculations
- **Security**: crypto-js, speakeasy (2FA)
- **Export/Import**: xlsx library
- **QR Code**: qrcode library
- **ZATCA Compliance**: Custom FatooraKSA implementation

### Development Tools

- **Build Tool**: Vite
- **PWA**: vite-plugin-pwa with Workbox
- **Routing**: React Router DOM
- **Linting**: ESLint

## Architecture Principles

### 1. Functional Programming

- All code follows functional programming paradigms
- Immutable state management
- Pure functions for data transformations
- No direct DOM manipulation

### 2. Offline-First Design

- Custom Offline Engine handles synchronization
- Service Workers manage caching and background sync
- Dexie.js provides local IndexedDB storage
- Redux manages unified state across online/offline modes

### 3. Separation of Concerns

- UI components are purely presentational
- Business logic resides in Redux actions/reducers
- Data operations handled by dedicated services
- Firebase and OfflineEngine communicate bidirectionally with Redux

## Project Structure

```
src/
├── Firebase/                    # Comprehensive Firebase configuration
│   ├── Config/                 # Firebase initialization configs
│   ├── Schema/                 # Data schema definitions
│   ├── Services/               # Dedicated Firebase services
│   └── Utils/                  # Firebase utility functions
│
├── Redux/                      # State management
│   ├── Features/               # Feature-based state slices
│   │   ├── Auth/              # Authentication state
│   │   ├── App/               # App-wide state (theme, lang)
│   │   ├── Cart/              # Shopping cart state
│   │   ├── Nav/               # Navigation state
│   │   └── [Other Features]/  # Additional features as needed
│   ├── Middlewares/           # Custom Redux middlewares
│   ├── Store/                 # Main store configuration
│   └── Utils/                 # Redux utility functions
│
├── OfflineEngine/             # Offline capability engine
│   ├── ServiceWorker/         # Service worker management
│   ├── Sync/                  # Data synchronization
│   ├── Cache/                 # Caching strategies
│   ├── Config/                # Offline engine configuration
│   └── index.js               # Main initialization interface
│
├── hooks/                     # Custom React hooks
│
├── constants/                 # Application constants
│   ├── api.js                # API endpoints
│   ├── routes.js             # Route constants
│   ├── themes.js             # Theme constants
│   └── app.js                # General app constants
│
├── Theme/                     # MUI theme configuration
│   ├── palette/              # Color palettes
│   │   ├── light.js          # Light mode palette
│   │   ├── dark.js           # Dark mode palette
│   │   └── custom.js         # Custom palette
│   ├── Theme.config.js       # Main theme configuration
│   └── Theme.jsx             # ThemeProvider wrapper component
│
├── Pages/                     # Application pages
│   ├── Login/                # Authentication pages
│   │   ├── Signup.jsx
│   │   ├── Signin.jsx
│   │   ├── RecoverAccount.jsx
│   │   └── VerifyAccount.jsx
│   ├── Settings/             # Settings page
│   ├── POS/                  # Point of Sale
│   ├── Inventory/            # Inventory management
│   ├── Sales/                # Sales management
│   ├── Buyers/               # Customer management
│   ├── Purchase/             # Purchase management
│   ├── Suppliers/            # Supplier management
│   ├── TaxReports/           # Tax reporting
│   └── Dev/                  # Developer tools (restricted)
│
├── Apps/                      # Independent application modules
│   ├── CartManager/          # Shopping cart management
│   ├── UserManager/          # User management
│   ├── InvoiceManager/       # Invoice operations
│   ├── BuyerManager/         # Customer operations
│   ├── SupplierManager/      # Supplier operations
│   ├── PrintManager/         # Printing operations
│   └── [Other Apps]/         # Additional apps as needed
│
└── FatooraKSA/               # ZATCA Fatoora compliance
    ├── Phase1/               # Phase 1 implementation
    │   ├── TLVGeneration.js  # TLV string generation
    │   └── QRGeneration.js   # QR code generation
    └── Phase2/               # Phase 2 implementation
        ├── TLVGeneration.js  # Advanced TLV generation
        ├── QRGeneration.js   # Advanced QR generation
        ├── HashGeneration.js # Fatoora hashing
        ├── XMLGeneration.js  # XML generation
        ├── Signing.js        # Digital signing
        └── [Additional Files] # Other ZATCA requirements
```

## Data Flow Architecture

### 1. UI Layer

- React components (Pages, Apps)
- Material-UI components
- Form handling with Formik
- Theme management

### 2. State Management Layer

- Redux Store as single source of truth
- Redux Toolkit for efficient state updates
- Redux Persist for state persistence
- Feature-based reducers

### 3. Service Layer

- Firebase Services for cloud operations
- OfflineEngine for local operations
- Custom middlewares for data flow
- Bidirectional synchronization

### 4. Data Layer

- Firebase Realtime Database (online)
- Dexie.js IndexedDB (offline)
- Service Workers for caching
- Data schemas for consistency

## Offline Engine Architecture

The Offline Engine is a configurable system that can be enabled/disabled via API calls:

### Initialization

```javascript
// Enable offline capabilities
await OfflineEngine.initialize({
  enableSync: true,
  syncInterval: 30000,
  cacheStrategy: "network-first",
});

// Disable for online-only mode
OfflineEngine.disable();
```

### Key Features

- **Service Worker Management**: Automatic registration and updates
- **Data Synchronization**: Bidirectional sync between local and cloud
- **Conflict Resolution**: Intelligent merge strategies
- **Cache Management**: Strategic caching for offline access
- **Background Sync**: Queue operations for when online

## Security Architecture

### 1. Authentication

- Firebase Authentication
- Multi-factor authentication with speakeasy
- JWT token management
- Secure session handling

### 2. Data Security

- Encryption with crypto-js
- Secure data transmission
- Input validation with Yup
- XSS protection

### 3. Access Control

- Role-based permissions
- Feature-level restrictions
- Developer-only sections
- Audit logging

## Performance Optimizations

### 1. Code Splitting

- Route-based splitting
- Component lazy loading
- Dynamic imports

### 2. Caching Strategy

- Service Worker caching
- Redux state persistence
- IndexedDB for large datasets
- Selective data loading

### 3. Bundle Optimization

- Vite build optimization
- Tree shaking
- Asset optimization
- Progressive loading

## ZATCA Fatoora Compliance

### Phase 1 Features

- TLV (Tag-Length-Value) string generation
- QR code generation for invoices
- Basic compliance requirements

### Phase 2 Features

- Advanced TLV generation
- Digital signatures
- XML invoice generation
- Hash generation
- Advanced QR codes
- Real-time validation

## Development Guidelines

### 1. Code Standards

- Functional programming patterns
- Consistent naming conventions
- Comprehensive documentation
- Error boundary implementation

### 2. Testing Strategy

- Unit tests for utilities
- Integration tests for services
- E2E tests for user flows
- Performance testing

### 3. Deployment

- PWA installation
- Service Worker updates
- Version management
- Rollback strategies

## Scalability Considerations

### 1. Modular Architecture

- Independent app modules
- Pluggable offline engine
- Configurable themes
- Extensible feature system

### 2. Performance Monitoring

- Real-time performance metrics
- Error tracking
- Usage analytics
- Optimization recommendations

### 3. Future Enhancements

- Multi-tenant support
- Advanced reporting
- API integrations
- Mobile app versions

## Getting Started

### Prerequisites

- Node.js 18+
- Modern web browser
- Firebase project setup
- ZATCA credentials (for KSA)

### Installation

```bash
npm install
npm run dev
```

### Configuration

1. Configure Firebase credentials
2. Set up offline engine
3. Configure ZATCA settings
4. Initialize theme system

This architecture ensures a robust, scalable, and maintainable invoice management system that works seamlessly both online and offline while maintaining compliance with Saudi Arabian ZATCA requirements.
