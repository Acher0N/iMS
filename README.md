# iMS (Invoice Management System)

[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)

A comprehensive offline-first Invoice Management System built with React, Firebase, and Material-UI. Features ZATCA (Fatoora) compliance for KSA e-invoicing, complete inventory management, and robust offline capabilities.

## 🚀 Features

- **Offline-First Architecture**
  - Custom OfflineEngine for reliable offline operations
  - Background sync with conflict resolution
  - IndexedDB storage for offline data
  - Service Worker for asset caching

- **Invoice Management**
  - ZATCA (Fatoora) compliant e-invoicing
  - QR code generation
  - Multiple invoice templates
  - PDF export capabilities

- **Inventory & POS**
  - Real-time stock tracking
  - Point of Sale interface
  - Purchase order management
  - Supplier management

- **Data Management**
  - Firebase Realtime Database
  - Local data persistence
  - Automatic sync when online
  - Data export/import features

## 🛠️ Tech Stack

- **Frontend**: React 19 with Vite
- **UI Framework**: Material-UI (MUI)
- **State Management**: Redux Toolkit
- **Database**: 
  - Online: Firebase Realtime Database
  - Offline: IndexedDB (via OfflineEngine)
- **PWA Features**: Service Workers, Workbox
- **E-Invoice**: Custom FatooraKSA implementation
- **Form Handling**: Formik with Yup
- **Utils**: Day.js, Decimal.js, crypto-js

## 📦 Project Structure

```
src/
├── Apps/                      # Core application modules
├── Firebase/                  # Firebase configuration & services
├── OfflineEngine/            # Custom offline capabilities
├── Pages/                    # Route-based page components
├── Redux/                    # State management
└── Theme/                    # MUI theming system
```

For detailed architecture information:
- [OfflineEngine Architecture](src/OfflineEngine/Architecture.md)
- [OfflineEngine Flowchart](src/OfflineEngine/Flowchart.md)

## 🚀 Quick Start

1. Clone and install dependencies:
   ```bash
   git clone <repository-url>
   cd iMS
   npm install
   ```

2. Set up Firebase:
   - Create a Firebase project
   - Copy your Firebase config to `src/Firebase/Config/firebase.config.js`
   - Enable Realtime Database

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### Firebase Setup

1. Enable Authentication methods:
   - Email/Password
   - Google (optional)
   
2. Set up Realtime Database rules:
   ```json
   {
     "rules": {
       ".read": "auth != null",
       ".write": "auth != null"
     }
   }
   ```

## 💻 Development

### Key Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Lint code
npm run lint
```

### PWA Development

The app uses Vite PWA plugin. To test PWA features:
1. Build the app: `npm run build`
2. Serve the build: `npm run preview`
3. Open in Chrome and use DevTools' Application tab

### Offline Development

1. The OfflineEngine handles offline capabilities
2. Test offline features using Chrome DevTools' Network tab
3. Use Application tab to:
   - Clear IndexedDB data
   - Unregister service workers
   - Clear Cache Storage

## 📚 Documentation

- **Architecture**: See [architecture.md](architecture.md)
- **API Documentation**: [API docs](docs/api.md)
- **Offline Engine**: [OfflineEngine docs](src/OfflineEngine/Architecture.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Material-UI](https://mui.com/)
- [ZATCA](https://zatca.gov.sa/)

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# iMS
