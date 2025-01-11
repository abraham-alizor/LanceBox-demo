# **LanceBox**

A React Native project designed to deliver a seamless mobile experience.

## **Project Overview**

**LanceBox** is built using [React Native](https://reactnative.dev), a robust framework for developing cross-platform mobile applications. This project leverages state-of-the-art tools and libraries to enhance functionality, maintainability, and user experience.

### **Features**

- User-friendly navigation with `@react-navigation` packages.
- Form validation and management using `react-hook-form` and `yup`.
- Advanced state management with `zustand` and `@tanstack/react-query`.
- Localization powered by `i18next` and `react-i18next`.
- Responsive design with `@shopify/restyle` and `react-native-responsive-fontsize`.

---

## **Getting Started**

### **Prerequisites**

1. Ensure your environment is set up following the official [React Native Environment Setup](https://reactnative.dev/docs/environment-setup).
2. Install **Node.js** (version 18 or later) and **Yarn**.

### **Installation Steps**

1. Clone the repository:

   ```bash
   git clone https://github.com/abraham-alizor/LanceBox-demo.git
   cd LanceBox-demo
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the Metro server:

   ```bash
   yarn start
   ```

4. Run the app on your desired platform:

   - **Android**:

     ```bash
     yarn android
     ```

   - **iOS**:
     ```bash
     yarn ios
     ```

---

## **Usage**

### **Directory Structure**

- `src/components`: Reusable UI components.
- `src/screens`: App screens for various functionalities.
- `src/hooks`: Custom React hooks.
- `src/assets`: Static assets like images and fonts.
- `src/navigation`: Navigation configurations.

### **Scripts**

- `yarn android`: Runs the app on an Android emulator or device.
- `yarn ios`: Runs the app on an iOS simulator.
- `yarn start`: Starts the Metro Bundler.
- `yarn test`: Executes unit tests using Jest.

---

## **Core Dependencies**

### **Runtime**

- `react`: Core library for building the user interface.
- `react-native`: Framework for cross-platform mobile app development.

### **State Management & API**

- `zustand`: Simple and lightweight state management.
- `@tanstack/react-query`: Advanced data-fetching library.

### **UI/UX**

- `@react-navigation`: Modular navigation system for React Native.
- `@shopify/restyle`: Customizable styling library.
- `lottie-react-native`: Animations using Lottie.

### **Forms**

- `react-hook-form`: Simplified form handling.
- `yup`: Schema-based validation for forms.

### **Others**

- `i18next` & `react-i18next`: Internationalization support.
- `axios`: HTTP client for API requests.
- `moment`: Date and time formatting.

---

## **Development**

### **Code Quality**

- Linting:
  ```bash
  yarn lint
  ```
- Formatting:
  ```bash
  yarn prettier
  ```

### **Testing**

- Run unit tests:
  ```bash
  yarn test
  ```

---

## **Troubleshooting**

### Common Issues

1. **Metro Bundler not starting**

   - Ensure no other processes are using the same port.

2. **App fails to run on iOS**

   - Make sure Xcode and CocoaPods are correctly installed and configured.

3. **Dependencies not installing**
   - Delete `node_modules` and reinstall:
     ```bash
     rm -rf node_modules
     yarn install
     ```

---

## **Learn More**

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Hook Form Documentation](https://react-hook-form.com)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)
- [React Navigation](https://reactnavigation.org)
