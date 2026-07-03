# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

# Juma Book Universal Rules

These principles are the single source of truth. Every feature, every screen, and every line of code must follow these rules. They are non-negotiable.

## Engineering Principles

| Principle                          | What It Means Here                                                                                                                                                                              |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **KISS**                           | Simple solutions first. No abstractions until needed twice.                                                                                                                                     |
| **SOLID**                          | Single responsibility per file. Open for extension. Depend on abstractions (hooks, types).                                                                                                      |
| **DRY**                            | Extract to `shared/` when used by 2+ features. Never copy-paste across features.                                                                                                                |
| **Separation of Concerns**         | Screens = containers. Components = pure UI. Hooks = logic. Services = API.                                                                                                                      |
| **Composition over Inheritance**   | Compose components via props and children. No class inheritance.                                                                                                                                |
| **Fail Fast**                      | Validate early, return early. Handle errors at the boundary (screens), not deep inside.                                                                                                         |
| **Type Safety**                    | No `any`. Type every prop, param, response, and state shape.                                                                                                                                    |
| **File Size & Structure**          | Max 200 lines per file. Break code down modularly. Use humanized, feature-specific file names.                                                                                                  |
| **Never break the current system** | Prioritize stability and backward compatibility. Take extreme care to prevent app crashes under any scenario, and ensure all UI elements support and look correct in both light and dark modes. |

## Tech Stack

```
React Native 0.78 + TypeScript + React 19
State:       Redux Toolkit + RTK Query + redux-persist
UI:          Custom component library (components/ui/)
Testing:     Jest + react-test-renderer
```

## Project Structure

```
src/
├── app/                        # App-level setup
│   ├── store/                  # Redux store + slices/
│   └── navigation/             # Navigators + types.ts
├── assets/                     # Static assets (images, fonts, lottie)
├── components/                 # Legacy global components
├── features/                   # Feature modules (21 domains)
│   └── <feature>/
│       ├── components/         # Feature-specific UI
│       ├── screens/            # Full screens (containers)
│       ├── hooks/              # Feature hooks
│       ├── services/           # Feature API services
│       ├── constants/          # Feature constants
│       └── @types/             # Additional type defs
├── shared/                     # Cross-feature shared code
│   ├── components/ui/          # Reusable UI (Button, Header, etc.)
│   ├── constants/              # colors, themeColors, dimensions
│   ├── hooks/                  # useTheme, useRedux, useTranslation
│   ├── services/api/           # RTK Query APIs (authApi, examApi, etc.)
│   ├── types/                  # Shared TypeScript types
│   └── utils/                  # Helper functions
└── types/                      # Global TypeScript definitions
```

## Naming Conventions

| Convention | Usage                       | Example                                 |
| ---------- | --------------------------- | --------------------------------------- |
| PascalCase | Components, Screens, Types  | `LoginScreen.tsx`, `ExamCard.tsx`       |
| camelCase  | Functions, variables, hooks | `useTheme()`, `handlePress`             |
| kebab-case | File names (non-components) | `app-background.tsx`, `input-field.tsx` |
| UPPER_CASE | Constants, env vars         | `PRODUCTION_API_URL`, `SPACING.LG`      |

## Quick Reference: What Goes Where

| I need to...                  | Put it in...                                             |
| ----------------------------- | -------------------------------------------------------- |
| Add a new screen              | `features/<feature>/screens/`                            |
| Add a reusable button variant | `shared/components/ui/`                                  |
| Create an API endpoint        | `shared/services/api/` or `features/<feature>/services/` |
| Add a Redux slice             | `app/store/slices/` (global) or feature folder           |
| Add a new navigation route    | `app/navigation/types.ts` + navigator file               |
| Add a translation             | `shared/constants/translations.ts`                       |
| Add a color                   | `shared/constants/themeColors.ts` (both LIGHT + DARK)    |
| Add a spacing/font token      | `shared/constants/dimensions.ts`                         |
| Create a custom hook          | `shared/hooks/` (shared) or `features/<feature>/hooks/`  |
| Define a type                 | `shared/types/` (shared) or `features/<feature>/types/`  |

## Web Best Practices

When building web applications or components, always follow the rules defined in `rules/web-best-practices.md`.

## Best Practices & Guides

- **Architecture Rules**: `rules/architecture.md`
- **New Feature Guide**: `rules/new-feature-guide.md`
- **State Management (Redux/RTK)**: `rules/shikkha-sohay-state.md`
- **UI & Theme**: `rules/shikkha-sohay-ui.md`
- **Firebase Auth & FCM**: `rules/shikkha-sohay-firebase.md`
- **React Native Best Practices**: `rules/react-native-best-practices.md`
- **React/Next.js Best Practices**: `rules/react-best-practices.md`
- **TypeScript Advanced Types**: `rules/typescript-advanced-types.md`
