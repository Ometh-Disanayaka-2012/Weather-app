import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const apiKey = '0e1460316db621a6d4920806db2f58e8'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  return (
    <ImageBackground
      source={require('./assets/Weather app image 4.jpg')} // Replace with your image path
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Weather App</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={city}
          onChangeText={setCity}
        />
        <Button title="Get Weather" onPress={fetchWeather} />
        {weather && weather.main && (
          <View style={styles.weatherContainer}>
            <Text style={styles.temp}>{weather.main.temp}°C</Text>
            <Text style={styles.description}>{weather.weather[0].description}</Text>
            <Text>Humidity: {weather.main.humidity}%</Text>
            <Text>Wind Speed: {weather.wind.speed} m/s</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    ...StyleSheet.absoluteFillObject, // Ensures the image fills the screen
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark transparent overlay for better readability
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
    backgroundColor: '#fff',
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 8,
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#555',
  },
});
