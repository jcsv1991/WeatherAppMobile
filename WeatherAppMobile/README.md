
# Weather Forecast App

A React Native application that provides current weather information, 24-hour, and 5-day forecasts for any city. Users can toggle between Celsius and Fahrenheit units and switch between hourly and daily forecasts.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setting Up the API Key](#setting-up-the-api-key)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)


## Features

- Search for cities with an auto-suggestion feature.
- View current weather conditions.
- Toggle between Celsius and Fahrenheit units.
- Switch between 24-hour and 5-day forecasts.
- Error handling for network issues and invalid inputs.
- Responsive UI compatible with both Android and iOS devices.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Install the latest LTS version from [nodejs.org](https://nodejs.org/).
- **Expo CLI**: Install globally using `npm install -g expo-cli`.
- **Git**: For cloning the repository.

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/weather-forecast-app.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd weather-forecast-app
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

   This will install all the necessary packages listed in `package.json`.

## Setting Up the API Key

This application uses the OpenWeatherMap API for fetching weather data. You need to obtain an API key and configure it in the project.

1. **Obtain an API Key**

   - Sign up at [OpenWeatherMap](https://openweathermap.org/api) to get a free API key.

2. **Configure the API Key**

   - Navigate to `src/components/SearchBar.js`.
   - Replace the placeholder `'YOUR_API_KEY'` with your actual API key.

     ```javascript
     const API_KEY = 'YOUR_API_KEY';
     ```

   - Similarly, if you have any other files that require the API key (e.g., `weatherApi.js`), replace the placeholder there as well.

   **Important:** Do not share your API key publicly or commit it to any public repositories.

## Running the Application

With all dependencies installed and the API key configured, you can now run the app.

1. **Start the Expo Development Server**

   ```bash
   expo start
   ```

   This will start the Expo CLI and open a browser window with options.

2. **Run on Your Device or Emulator**

   - **Using a Physical Device:**
     - Install the Expo Go app from the App Store (iOS) or Google Play Store (Android).
     - Scan the QR code displayed in the terminal or browser to run the app on your device.
   - **Using an Emulator:**
     - For iOS, use Xcode's Simulator.
     - For Android, use Android Studio's AVD Manager.

## Project Structure

The project's file structure is organized as follows:

```
weather-forecast-app
├── App.js
├── package.json
├── index.js
├── src
    ├── components
    │   ├── ErrorHandling.js
    │   ├── ForecastDisplay.js
    │   ├── HourlyForecast.js
    │   ├── Loader.js
    │   ├── SearchBar.js
    │   ├── Weather.js
    │   └── WeatherDisplay.js
    ├── api
    │   └── weatherApi.js
```

### Brief Description of Important Files

- **App.js**: The root component that initializes the `Weather` component.
- **index.js**: The entry point of the application.
- **src/components/**: Contains all the UI components used in the app.
  - **Weather.js**: Main component handling state and rendering other components.
  - **SearchBar.js**: Component for searching and selecting cities.
  - **WeatherDisplay.js**: Displays current weather information.
  - **HourlyForecast.js**: Displays the 24-hour forecast.
  - **ForecastDisplay.js**: Displays the 5-day forecast.
  - **ErrorHandling.js**: Handles and displays error messages.
  - **Loader.js**: Displays a loading indicator while data is being fetched.
- **src/api/weatherApi.js**: Contains functions for fetching weather data from the OpenWeatherMap API.

## Dependencies

The project uses the following main dependencies:

- **react** & **react-native**: For building the UI.
- **expo**: For building React Native apps with ease.
- **axios**: For making HTTP requests to the OpenWeatherMap API.
- **react-navigation**: For navigating between screens (if the project includes navigation).

You can find the full list of dependencies in the `package.json` file.

