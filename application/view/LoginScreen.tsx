import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint for authentication
      const response = await fetch('https://ey5cgjp181.execute-api.ap-south-1.amazonaws.com/develop/btinvoice/userActions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "operation": "read",
          "tableName": "btInvoice",
          "UserName": username
        })
      });
      const data = await response.json();
      if (response.ok) {
        const jsonObject = JSON.parse(data.body)[0];
        if (data.statusCode === 200) {
          Alert.alert('Login Successful', `Welcome, ${username}!`);
          if (jsonObject.Password === password) {
            switch (jsonObject.EntityType) {
              case 'admin':
                navigation.navigate('AdminHome');
                break;
              case 'user':
                navigation.navigate('Userpage');
                break;
              default:
                console.error('Invalid user type');
            }
          }
        } else {
          console.error('Error during processing data', data.body);
        }
      } else {
        Alert.alert('Login Failed', 'Invalid username or password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo-example.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Image
            source={showPassword ? require('./local-assets/eye-off.png') : require('./local-assets/eye.png')}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    paddingTop: 0,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: 'gray',
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    padding: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  loginButton: {
    backgroundColor: "#1A78F1",
    borderRadius: 12,
    padding: 16,
    width: '100%',
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
