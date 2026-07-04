# JumaBook

JumaBook is a mobile booking application built with React Native and Expo. It allows users to browse, book, and manage experiences and tours. The app features a highly responsive, modern UI with smooth animations and a scalable design system.

## Setup Instructions

1. **Prerequisites**
   - Node.js (v18 or newer recommended)
   - npm or yarn package manager
   - [Expo Go](https://expo.dev/go) app installed on your physical device, or an iOS Simulator/Android Emulator set up on your machine.

2. **Installation**
   Clone the repository and install the required dependencies:
   ```bash
   git clone git@github.com:mahede182/jumaBook.git
   cd jumaBook
   npm install
   ```

## How to run the project

1. **Start the Expo development server:**
   ```bash
   npm start
   ```

2. **Open the app:**
   - Press **`i`** in the terminal to open the app in an iOS Simulator (macOS only).
   - Press **`a`** to open in an Android Emulator.
   - Scan the QR code shown in the terminal with the Expo Go app on your physical device (use the Camera app on iOS or the Expo app on Android).
   - Press **`w`** to open the project in your web browser.

## Folder Structure

```
src/
├── app/                  # Expo Router file-based routing
│   ├── (tabs)/           # Bottom tab navigation routes
│   └── booking/          # Booking-specific routes
├── assets/               # Static assets (images, fonts, etc.)
├── components/           # Global reusable UI components
├── constants/            # Theming, colors, and mock data
├── features/             # Feature-driven modules (Domain Driven Design)
│   ├── account/          # Account & profile feature
│   ├── booking/          # Booking feature (components, screens, types)
│   ├── chat/             # Chat feature
│   └── explore/          # Explore feature
├── hooks/                # Global custom React hooks
└── utils/                # Helper functions (e.g., responsive scaling)
```

## Any assumptions made

- **Mock Data**: All booking listings, itineraries, reviews, and host profiles are currently populated using hardcoded static data located in `src/constants/data.ts`. It is assumed that this will be replaced with real API endpoints in the future.
- **Responsiveness**: The UI is designed based on a base screen width (393px, typical for iPhone 14/15) and scales up/down using custom utility functions (`scale` and `fontScale` in `src/utils/responsive.ts`).
- **Styling**: We assume a custom theme setup instead of a third-party UI library to closely match the provided Figma designs. Standardized spacing, colors, and fonts are exported from `src/constants/theme.ts`.

## Any known limitations

- **Backend Integration**: The application does not currently communicate with a live backend. Actions like booking a tour, rescheduling, or canceling are simulated locally and do not persist across app reloads.
- **Placeholder Screens**: Certain tabs and flows might display an `<UnderConstruction />` component until those features are fully implemented.
