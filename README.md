# Matiks Leaderboard Frontend

A cross-platform leaderboard application built with React Native (Expo), featuring real-time leaderboard display, user search, and rank lookup. Works seamlessly on iOS, Android, and Web.

## 🚀 Features

- **Cross-Platform**: Works on iOS, Android, and Web
- **Leaderboard Display**: Paginated leaderboard with infinite scroll
- **User Search**: Real-time search with debouncing and pagination
- **Rank Lookup**: Quick rank lookup for any user
- **Pull-to-Refresh**: Refresh leaderboard data
- **Modern UI**: Beautiful interface with NativeWind (Tailwind CSS)
- **Loading States**: Smooth loading indicators and empty states
- **Responsive Design**: Adapts to different screen sizes

## 📋 Prerequisites

- Node.js 18+ or Bun
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for iOS development) or Android Emulator (for Android development)
- Backend API running (see backend README)

## 🛠️ Tech Stack

- **Framework**: React Native (Expo)
- **Navigation**: React Navigation (Bottom Tabs)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **HTTP Client**: Axios
- **TypeScript**: Full type safety
- **State Management**: React Hooks (useState, useEffect)

## 📁 Project Structure

```
my-expo-app/
├── App.tsx                    # Main app entry point
├── screens/
│   ├── LeaderboardScreen.tsx  # Leaderboard display
│   └── SearchScreen.tsx       # User search screen
├── components/
│   ├── LeaderboardItem.tsx    # Leaderboard row component
│   ├── SearchResultItem.tsx   # Search result row component
│   └── LoadingSpinner.tsx    # Loading component
├── services/
│   └── api.ts                 # API client (Axios)
├── constants/
│   └── config.ts             # API configuration
├── types/
│   └── index.ts              # TypeScript types
├── assets/                   # Images and icons
├── package.json
└── README.md
```

## ⚙️ Configuration

### API Configuration

Update `constants/config.ts` to point to your backend API:

```typescript
export const API_BASE_URL = __DEV__
  ? 'http://localhost:8080/api/v1'  // Local development
  : 'https://your-backend-url.com/api/v1';  // Production
```

For production, set the environment variable:

```bash
EXPO_PUBLIC_API_BASE_URL=https://your-backend-url.com/api/v1
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
# or
bun install
```

### 2. Start the Development Server

```bash
npm start
# or
expo start
```

This will open the Expo Dev Tools. You can then:

- Press `i` to open iOS Simulator
- Press `a` to open Android Emulator
- Press `w` to open in web browser
- Scan QR code with Expo Go app on your phone

### 3. Run on Specific Platform

```bash
# iOS
npm run ios
# or
expo run:ios

# Android
npm run android
# or
expo run:android

# Web
npm run web
# or
expo start --web
```

## 📱 Features Overview

### Leaderboard Screen

- **Pagination**: Loads 50 users per page
- **Infinite Scroll**: Automatically loads more when scrolling down
- **Pull-to-Refresh**: Pull down to refresh the leaderboard
- **Total Count**: Displays total number of users
- **Rank Display**: Shows tie-aware rankings

### Search Screen

- **Real-time Search**: Debounced search (500ms delay)
- **Pagination**: Loads search results in pages
- **Infinite Scroll**: Automatically loads more results
- **Loading States**: Shows loading indicator when fetching more
- **Empty States**: Helpful messages when no results found

## 🎨 Styling

The app uses NativeWind (Tailwind CSS for React Native) for styling. Styles are defined using `className` props:

```tsx
<View className="flex-1 bg-matiks-bg">
  <Text className="font-montserrat text-2xl font-bold text-matiks-text">
    Leaderboard
  </Text>
</View>
```

### Theme Colors

The app uses a custom color scheme defined in `tailwind.config.js`:
- `matiks-bg`: Background color
- `matiks-text`: Primary text color
- `matiks-muted`: Muted text color
- `matiks-card`: Card background color

## 🔌 API Integration

The app communicates with the backend API through the `api.ts` service:

```typescript
import { leaderboardApi } from './services/api';

// Get leaderboard
const response = await leaderboardApi.getLeaderboard(page, limit);

// Search users
const response = await leaderboardApi.searchUsers(query, page, limit);

// Get user rank
const response = await leaderboardApi.getUserRank(username);
```

## 📦 Building for Production

### Web Build

```bash
npm run build
# or
npx expo export --platform web
```

This creates a `dist/` folder with the production build.

### Mobile Builds

```bash
# iOS
expo build:ios

# Android
expo build:android
```

Or use EAS Build:

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure
eas build:configure

# Build
eas build --platform ios
eas build --platform android
```

## 🚢 Deployment

### Vercel (Web)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Configure `vercel.json`:
   ```json
   {
     "buildCommand": "npx expo export --platform web",
     "outputDirectory": "dist"
   }
   ```

4. Set environment variable:
   ```
   EXPO_PUBLIC_API_BASE_URL=https://your-backend-url.com/api/v1
   ```

### Expo Go (Testing)

1. Start development server:
   ```bash
   expo start
   ```

2. Scan QR code with Expo Go app (iOS/Android)
