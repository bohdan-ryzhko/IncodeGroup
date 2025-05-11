# Incode Group

Expenses management app, created with React Native CLI.

## Getting Started

### Project launch

> **Install dependencies**:

```sh
npm install
```

> **Project start IOS**:

```sh
npm run ios
```

> **Project start Android**:

```sh
npm run android
```

# Project Dependencies

## UI Components & Styling

- **react-native-paper** (`^5.14.0`) - UI library

## State Management

- **@reduxts/toolkit** (`^2.7.0`) - Official Redux toolset for efficient state management
- **react-redux** (`^9.2.0`) - Official React bindings for Redux

## Networking

- **@react-native-firebase/app** (`^22.1.0`) - JavaScript client library for Firebase

## Forms & Validation

- **formik** (`2.4.6`) - Form management library
- **yup** (`1.6.1`) - Schema validation library

## UI Enhancements

- **react-native-vector-icons** (`^10.2.0`) - SVG icons for React Native applications
- **@react-native-vector-icons/material-design-icons** (`^12.0.0`) - Material SVG icons
- **react-native-date-picker** (`7.0.0`) - Time picker component for React Native

## Utilities

- **dequal** (`2.0.3`) - Fast deep equality comparison
- **deepmerge** (`2.0.3`) - Merges the enumerable properties of two or more objects deeply

## Development & Build Tools

- **typescript** (`5.0.4`) - Typed JavaScript for large-scale applications

## Project Structure

📦 **src**  
┣ 📂 **components**  
┃ ┣ 📂 **ComponentName**  
┃ ┃ ┣ 📜 `index.tsx` # Main file for the component  
┃ ┃ ┗ 📜 `styles.ts` # Component styles  
┃ ┗ 📜 `index.ts` # Re-export file  
┣ 📂 **constants**  
┃ ┣ 📜 `constantDataName.ts` # Constants data  
┃ ┗ 📜 `index.ts` # Re-export file  
┣ 📂 **hooks**  
┃ ┣ 📜 `useHookName.ts` # Custom hook  
┃ ┗ 📜 `index.ts` # Re-export file  
┣ 📂 **interfaces**  
┃ ┣ 📜 `interfaceName.ts` # Custom interface name  
┃ ┗ 📜 `index.ts` # Re-export file  
┣ 📂 **navigations**  
┃ ┣ 📂 **NavigationName**  
┃ ┃ ┣ 📜 `index.tsx` # Main file for the navigation  
┃ ┃ ┗ 📜 `styles.ts` # Base styles  
┃ ┗ 📜 `index.ts` # Re-export file  
┣ 📂 **screens**  
┃ ┣ 📂 **ScreenName**  
┃ ┃ ┣ 📂 **parts** # Local directory for specific components on the screen  
┃ ┃ ┣ 📜 `index.tsx` # Main file for the page  
┃ ┃ ┗ 📜 `styles.ts` # Styles  
┣ 📂 **services**  
┃ ┃ 📜 `serviceName.ts` # Service (business logic)  
┃ ┗ 📜 `index.ts` # Re-export file  
┣ 📂 **store**  
┃ ┣ 📂 **reducerName**  
┃ ┃ ┣ 📜 `slice.ts` # Slice configuration  
┃ ┃ ┣ 📜 `thunks.ts` # Thunks/requests/async operations  
┃ ┃ ┗ 📜 `index.ts` # Re-export file  
┃ ┃ 📜 `helper.ts` # Redux middleware  
┃ ┃ 📜 `store.ts` # Store configuration  
┃ ┗ 📜 `index.ts` # Re-export file  
┣ 📂 **theme**  
┃ ┗ 📜 `index.ts` # Theme config/Re-export file  
┣ 📂 **utils**  
┃ ┃ 📜 `utilName.ts` # Utility functions  
┃ ┗ 📜 `index.ts` # Re-export file  
┣ 📜 `main.ts` # Entry Point App  
┣ 📜 `index.ts` # Re-export file  
┗ 📜 `App.tsx` # Root application component

## General Guidelines

- **Use `useReduxStore` for accessing Redux store data**

- **Use `useAppDispatch` for receive redux dispatcher**

- **Use `useMutation` hook for handling asynchronous requests**

- **Also you can use `createAsyncThunk` for handling asynchronous requests**

  - Optionally, you can use `ThunkWrapper` for additional abstraction or custom handling of asynchronous operations, but it's not mandatory.

- **Use Formik for handling forms**

  - In most cases, form handling should be done via the `useFormik` hook.
